"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Check, FolderUp, ImageUp, KeyRound, Loader2, X } from "lucide-react";

import { Button } from "@/app/_components/ui/button";
import { categories } from "@/app/_data/projects";
import {
  MAX_TOTAL_BYTES,
  checkAccess,
  skipReason,
  slugify,
  uploadDelivery,
} from "@/app/_lib/githubUpload";
import { siteConfig } from "@/app/_lib/siteConfig";
import { cn } from "@/app/_lib/utils";

const TOKEN_KEY = "fiverr-upload-token";
const target = siteConfig.upload;
const tokenUrl = `https://github.com/settings/personal-access-tokens/new?name=${encodeURIComponent(
  "Portfolio uploads",
)}&description=${encodeURIComponent(`Commits deliveries to ${target.owner}/${target.repo}`)}`;

const emptyFields = {
  name: "",
  slug: "",
  tagline: "",
  summary: "",
  category: categories[0].key,
  kind: "",
  platform: "Web",
  year: String(new Date().getFullYear()),
  stack: "",
  problem: "",
  approach: "",
  outcome: "",
  highlights: "",
  improvements: "",
  liveUrl: "",
  fiverrUrl: "",
  accent: "#e6a23c",
  featured: true,
  isPrivate: false,
  worksOffline: false,
};

/* Storage can throw in private windows; the form works without it. */
function readToken() {
  try {
    return sessionStorage.getItem(TOKEN_KEY) ?? localStorage.getItem(TOKEN_KEY) ?? "";
  } catch {
    return "";
  }
}

function storeToken(token, remember) {
  try {
    sessionStorage.setItem(TOKEN_KEY, token);
    if (remember) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);
  } catch {
    /* not stored; the owner pastes it again next time */
  }
}

function clearToken() {
  try {
    sessionStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(TOKEN_KEY);
  } catch {
    /* nothing stored */
  }
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

const lines = (value) =>
  value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

/** Drops the folder the owner picked, so its contents sit at the delivery root. */
function stripRoot(paths) {
  const roots = new Set(paths.map((path) => path.split("/")[0]));
  const single = roots.size === 1 && paths.every((path) => path.includes("/"));
  return (path) => (single ? path.slice(path.indexOf("/") + 1) : path);
}

/** Walks a dropped folder (File System Entry API) into { path, file } pairs. */
async function readEntry(entry, prefix = "") {
  if (entry.isFile) {
    const file = await new Promise((resolve, reject) => entry.file(resolve, reject));
    return [{ path: `${prefix}${entry.name}`, file }];
  }
  if (SKIP_WHILE_WALKING.has(entry.name)) return [];
  const reader = entry.createReader();
  const children = [];
  // readEntries returns at most about 100 entries per call.
  for (;;) {
    const batch = await new Promise((resolve, reject) => reader.readEntries(resolve, reject));
    if (!batch.length) break;
    children.push(...batch);
  }
  const nested = await Promise.all(children.map((child) => readEntry(child, `${prefix}${entry.name}/`)));
  return nested.flat();
}

/* Not walked at all on drop: walking node_modules can take minutes. */
const SKIP_WHILE_WALKING = new Set(["node_modules", ".git", ".next"]);

export function UploadForm() {
  const [token, setToken] = useState("");
  const [remember, setRemember] = useState(false);
  const [access, setAccess] = useState({ state: "idle", message: "" });
  const [fields, setFields] = useState(emptyFields);
  const [slugEdited, setSlugEdited] = useState(false);
  const [files, setFiles] = useState([]);
  const [skipped, setSkipped] = useState([]);
  const [cover, setCover] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [status, setStatus] = useState({ phase: "idle" });
  const folderInput = useRef(null);

  useEffect(() => {
    // Read once after mount: storage does not exist during prerender.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setToken(readToken());
  }, []);

  const coverPreview = useMemo(() => (cover ? URL.createObjectURL(cover) : null), [cover]);
  useEffect(() => () => coverPreview && URL.revokeObjectURL(coverPreview), [coverPreview]);

  const totalBytes = files.reduce((sum, item) => sum + item.file.size, 0);
  const slug = slugEdited ? fields.slug : slugify(fields.name);
  const working = status.phase === "working";

  function update(key, value) {
    setFields((current) => ({ ...current, [key]: value }));
  }

  function takeFiles(pairs) {
    const strip = stripRoot(pairs.map((pair) => pair.path));
    const kept = [];
    const left = [];
    for (const pair of pairs) {
      const path = strip(pair.path);
      const reason = skipReason(path, pair.file.size);
      if (reason) left.push({ path, reason });
      else kept.push({ path, file: pair.file });
    }
    kept.sort((a, b) => a.path.localeCompare(b.path));
    setFiles(kept);
    setSkipped(left);
    setStatus({ phase: "idle" });
  }

  function onFolderPicked(event) {
    const picked = Array.from(event.target.files ?? []).map((file) => ({
      path: file.webkitRelativePath || file.name,
      file,
    }));
    if (picked.length) takeFiles(picked);
    event.target.value = "";
  }

  async function onDrop(event) {
    event.preventDefault();
    setDragging(false);
    const entries = Array.from(event.dataTransfer.items ?? [])
      .map((item) => item.webkitGetAsEntry?.())
      .filter(Boolean);
    if (entries.length) {
      const pairs = (await Promise.all(entries.map((entry) => readEntry(entry)))).flat();
      takeFiles(pairs);
    } else {
      takeFiles(Array.from(event.dataTransfer.files).map((file) => ({ path: file.name, file })));
    }
  }

  async function verifyToken() {
    if (!token.trim()) return;
    setAccess({ state: "checking", message: "" });
    try {
      const { branch } = await checkAccess({ token: token.trim(), ...target });
      storeToken(token.trim(), remember);
      setAccess({ state: "ok", message: `Can push to ${target.owner}/${target.repo} on ${branch}.` });
    } catch (error) {
      setAccess({ state: "error", message: error.message });
    }
  }

  function forgetToken() {
    clearToken();
    setToken("");
    setAccess({ state: "idle", message: "" });
  }

  const problems = [];
  if (!token.trim()) problems.push("Paste a GitHub token.");
  if (!fields.name.trim()) problems.push("Give the project a name.");
  if (!slug) problems.push("The address needs at least one letter or number.");
  if (!fields.tagline.trim()) problems.push("Write a one-line tagline.");
  if (!fields.summary.trim()) problems.push("Write a short summary.");
  if (!files.length) problems.push("Choose the project folder.");
  if (totalBytes > MAX_TOTAL_BYTES) {
    problems.push(`The folder is ${formatBytes(totalBytes)}; the limit is ${formatBytes(MAX_TOTAL_BYTES)}. Push large repositories with git.`);
  }

  async function onSubmit(event) {
    event.preventDefault();
    if (problems.length || working) return;

    storeToken(token.trim(), remember);
    setStatus({ phase: "working", step: "Starting" });

    const entry = {
      slug,
      name: fields.name.trim(),
      year: fields.year.trim() || String(new Date().getFullYear()),
      role: "Fiverr order",
      kind: fields.kind.trim() || categories.find((item) => item.key === fields.category)?.label,
      category: fields.category,
      platform: fields.platform.trim() || "Web",
      accent: fields.accent,
      featured: fields.featured,
      isPrivate: fields.isPrivate,
      worksOffline: fields.worksOffline,
      walkthrough: null,
      tagline: fields.tagline.trim(),
      summary: fields.summary.trim(),
      problem: fields.problem.trim(),
      approach: fields.approach.trim(),
      outcome: fields.outcome.trim(),
      highlights: lines(fields.highlights),
      improvements: lines(fields.improvements),
      stack: fields.stack
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      deliveredOn: new Date().toISOString().slice(0, 10),
      liveUrl: fields.liveUrl.trim(),
      fiverrUrl: fields.fiverrUrl.trim(),
    };

    try {
      const result = await uploadDelivery({
        token: token.trim(),
        target,
        entry,
        files,
        cover,
        onProgress: (step, done, total) => setStatus({ phase: "working", step, done, total }),
      });
      setStatus({ phase: "done", result, name: entry.name });
    } catch (error) {
      setStatus({ phase: "error", message: error.message });
    }
  }

  function startOver() {
    setFields(emptyFields);
    setSlugEdited(false);
    setFiles([]);
    setSkipped([]);
    setCover(null);
    setStatus({ phase: "idle" });
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  return (
    <div className="flex flex-col gap-12 md:gap-16">
      {/* Header ------------------------------------------------------------ */}
      <header className="flex flex-col gap-6">
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 self-start text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          All work
        </Link>
        <p className="timecode flex items-center gap-3 text-muted-foreground">
          <span className="text-tungsten">SC 00</span>
          <span aria-hidden="true" className="h-px w-8 bg-border" />
          <span>Upload</span>
        </p>
        <h1 className="display text-headline">Upload a delivered project.</h1>
        <p className="max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
          The code is committed to{" "}
          <a
            href={`https://github.com/${target.owner}/${target.repo}`}
            target="_blank"
            rel="noreferrer"
            className="text-bone underline underline-offset-4 hover:text-tungsten"
          >
            {target.owner}/{target.repo}
          </a>{" "}
          under <code className="font-mono text-sm text-bone">{target.folder}/</code>, with the write-up below. The
          project appears on the site after the next deploy, usually a minute or two.
        </p>
      </header>

      {status.phase === "done" ? (
        <Done status={status} onAgain={startOver} />
      ) : (
        <form onSubmit={onSubmit} className="flex flex-col gap-12 md:gap-16" noValidate>
          {/* 1. Access ------------------------------------------------------- */}
          <Step number="01" title="GitHub access">
            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Uploads use a fine-grained personal access token limited to this one repository, with{" "}
              <span className="text-bone">Contents: read and write</span>. It stays in this browser and is only ever
              sent to GitHub.{" "}
              <a href={tokenUrl} target="_blank" rel="noreferrer" className="text-bone underline underline-offset-4 hover:text-tungsten">
                Create a token
              </a>
              .
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
              <Field label="Token" className="flex-1">
                <input
                  type="password"
                  autoComplete="off"
                  spellCheck={false}
                  value={token}
                  onChange={(event) => {
                    setToken(event.target.value);
                    setAccess({ state: "idle", message: "" });
                  }}
                  placeholder="e.g. github_pat_11A..."
                  className={inputClass}
                />
              </Field>
              <Button type="button" variant="outline" onClick={verifyToken} disabled={!token.trim() || access.state === "checking"}>
                {access.state === "checking" ? <Loader2 className="animate-spin" /> : <KeyRound />}
                Check access
              </Button>
              {token ? (
                <Button type="button" variant="ghost" onClick={forgetToken}>
                  Forget
                </Button>
              ) : null}
            </div>
            <Checkbox checked={remember} onChange={setRemember}>
              Remember on this device (otherwise it is forgotten when the tab closes)
            </Checkbox>
            {access.message ? (
              <p
                role="status"
                className={cn("flex items-start gap-2 text-sm", access.state === "ok" ? "text-bone" : "text-destructive")}
              >
                {access.state === "ok" ? <Check className="mt-0.5 size-4 shrink-0 text-tungsten" /> : <X className="mt-0.5 size-4 shrink-0" />}
                {access.message}
              </p>
            ) : null}
          </Step>

          {/* 2. The project -------------------------------------------------- */}
          <Step number="02" title="The project">
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Project name" required>
                <input
                  value={fields.name}
                  onChange={(event) => update("name", event.target.value)}
                  placeholder="e.g. Bakery ordering site"
                  className={inputClass}
                />
              </Field>
              <Field label="Address" hint={`/work/${slug || "..."}`}>
                <input
                  value={slug}
                  onChange={(event) => {
                    setSlugEdited(true);
                    update("slug", slugify(event.target.value));
                  }}
                  placeholder="e.g. bakery-ordering-site"
                  className={cn(inputClass, "font-mono")}
                />
              </Field>
              <Field label="Tagline" required hint="One line, shown in the index and on the spread" className="md:col-span-2">
                <input
                  value={fields.tagline}
                  onChange={(event) => update("tagline", event.target.value)}
                  placeholder="e.g. A bakery's menu and orders, landing straight in WhatsApp."
                  className={inputClass}
                />
              </Field>
              <Field label="Summary" required hint="Two or three sentences at the top of the case study" className="md:col-span-2">
                <textarea
                  rows={3}
                  value={fields.summary}
                  onChange={(event) => update("summary", event.target.value)}
                  placeholder="e.g. A one-page site for a home bakery with a menu, prices and an order form."
                  className={textareaClass}
                />
              </Field>
              <Field label="Category">
                <select value={fields.category} onChange={(event) => update("category", event.target.value)} className={inputClass}>
                  {categories.map((category) => (
                    <option key={category.key} value={category.key}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Type">
                <input
                  value={fields.kind}
                  onChange={(event) => update("kind", event.target.value)}
                  placeholder="e.g. Landing page"
                  className={inputClass}
                />
              </Field>
              <Field label="Platform">
                <input
                  value={fields.platform}
                  onChange={(event) => update("platform", event.target.value)}
                  placeholder="e.g. Web, Windows, Android"
                  className={inputClass}
                />
              </Field>
              <Field label="Year">
                <input
                  inputMode="numeric"
                  value={fields.year}
                  onChange={(event) => update("year", event.target.value)}
                  placeholder="e.g. 2026"
                  className={inputClass}
                />
              </Field>
              <Field label="Stack" hint="Comma separated; the first three show on the spread" className="md:col-span-2">
                <input
                  value={fields.stack}
                  onChange={(event) => update("stack", event.target.value)}
                  placeholder="e.g. Next.js, Tailwind CSS, Supabase"
                  className={inputClass}
                />
              </Field>
              <Field label="Live link">
                <input
                  type="url"
                  value={fields.liveUrl}
                  onChange={(event) => update("liveUrl", event.target.value)}
                  placeholder="e.g. https://bakery.vercel.app"
                  className={inputClass}
                />
              </Field>
              <Field label="Fiverr link">
                <input
                  type="url"
                  value={fields.fiverrUrl}
                  onChange={(event) => update("fiverrUrl", event.target.value)}
                  placeholder="e.g. https://www.fiverr.com/..."
                  className={inputClass}
                />
              </Field>
              <Field label="Accent colour" hint="Slate stripes and highlight ticks">
                <input
                  type="color"
                  value={fields.accent}
                  onChange={(event) => update("accent", event.target.value)}
                  className="h-11 w-20 cursor-pointer rounded-md border border-input bg-ink-raised p-1"
                />
              </Field>
              <div className="flex flex-col justify-end gap-3">
                <Checkbox checked={fields.featured} onChange={(value) => update("featured", value)}>
                  Feature it in the spreads and the hero reel
                </Checkbox>
                <Checkbox checked={fields.isPrivate} onChange={(value) => update("isPrivate", value)}>
                  Client wants the source private (no source link on the site)
                </Checkbox>
                <Checkbox checked={fields.worksOffline} onChange={(value) => update("worksOffline", value)}>
                  Runs with no internet at all
                </Checkbox>
              </div>
            </div>

            <details className="group rounded-lg border border-border">
              <summary className="flex h-12 cursor-pointer list-none items-center justify-between px-4 text-sm font-medium">
                Case study write-up (optional)
                <span className="timecode text-muted-foreground group-open:hidden">Open</span>
                <span className="timecode hidden text-muted-foreground group-open:inline">Close</span>
              </summary>
              <div className="grid gap-5 border-t border-border p-4 md:grid-cols-3">
                {[
                  ["problem", "The problem", "e.g. Orders came in by phone and got lost."],
                  ["approach", "The approach", "e.g. A menu page with a cart that sends the order to WhatsApp."],
                  ["outcome", "The outcome", "e.g. Every order now arrives written down, with the total."],
                ].map(([key, label, placeholder]) => (
                  <Field key={key} label={label}>
                    <textarea
                      rows={4}
                      value={fields[key]}
                      onChange={(event) => update(key, event.target.value)}
                      placeholder={placeholder}
                      className={textareaClass}
                    />
                  </Field>
                ))}
                <Field label="Highlights" hint="One per line" className="md:col-span-3">
                  <textarea
                    rows={3}
                    value={fields.highlights}
                    onChange={(event) => update("highlights", event.target.value)}
                    placeholder="e.g. Loads in under a second on a phone"
                    className={textareaClass}
                  />
                </Field>
                <Field label="What I would improve next" hint="One per line" className="md:col-span-3">
                  <textarea
                    rows={3}
                    value={fields.improvements}
                    onChange={(event) => update("improvements", event.target.value)}
                    placeholder="e.g. Online payment at checkout"
                    className={textareaClass}
                  />
                </Field>
              </div>
            </details>
          </Step>

          {/* 3. Code and cover ----------------------------------------------- */}
          <Step number="03" title="Code and cover">
            <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
              <div className="flex flex-col gap-3">
                <span className="text-sm font-medium">
                  Project folder <span className="text-tungsten">*</span>
                </span>
                <button
                  type="button"
                  onClick={() => folderInput.current?.click()}
                  onDragOver={(event) => {
                    event.preventDefault();
                    setDragging(true);
                  }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={onDrop}
                  className={cn(
                    "flex min-h-44 flex-col items-center justify-center gap-3 rounded-lg border border-dashed px-6 py-8 text-center transition-colors",
                    dragging ? "border-tungsten bg-tungsten/5" : "border-input hover:border-bone/40 hover:bg-white/[0.02]",
                  )}
                >
                  <FolderUp className="size-6 text-muted-foreground" />
                  <span className="text-sm font-medium">
                    {files.length ? "Choose a different folder" : "Choose the project folder, or drop it here"}
                  </span>
                  <span className="max-w-sm text-xs leading-relaxed text-muted-foreground">
                    node_modules, .git, .next and .env files are left out automatically.
                  </span>
                </button>
                <input
                  ref={folderInput}
                  type="file"
                  webkitdirectory=""
                  directory=""
                  multiple
                  hidden
                  onChange={onFolderPicked}
                />
                {files.length ? <FileSummary files={files} skipped={skipped} totalBytes={totalBytes} /> : null}
              </div>

              <div className="flex flex-col gap-3">
                <span className="text-sm font-medium">Cover image (optional)</span>
                <label
                  className={cn(
                    "relative flex aspect-[16/10] cursor-pointer flex-col items-center justify-center gap-3 overflow-hidden rounded-lg border border-dashed border-input text-center transition-colors hover:border-bone/40 hover:bg-white/[0.02]",
                  )}
                >
                  {coverPreview ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={coverPreview} alt="Cover preview" className="absolute inset-0 size-full object-cover object-top" />
                  ) : (
                    <>
                      <ImageUp className="size-6 text-muted-foreground" />
                      <span className="px-6 text-xs leading-relaxed text-muted-foreground">
                        A 1600x1000 screenshot (JPG, PNG or WebP). Without one, the project shows its slate.
                      </span>
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="sr-only"
                    onChange={(event) => {
                      const file = event.target.files?.[0];
                      if (file) setCover(file);
                      event.target.value = "";
                    }}
                  />
                </label>
                {cover ? (
                  <div className="flex items-center justify-between gap-3 text-xs text-muted-foreground">
                    <span className="truncate">
                      {cover.name} · {formatBytes(cover.size)}
                    </span>
                    <button type="button" onClick={() => setCover(null)} className="h-11 shrink-0 px-2 text-bone hover:text-tungsten">
                      Remove
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </Step>

          {/* Submit ----------------------------------------------------------- */}
          <div className="flex flex-col gap-4 border-t border-border pt-8">
            {status.phase === "error" ? (
              <p role="alert" className="flex items-start gap-2 text-sm text-destructive">
                <X className="mt-0.5 size-4 shrink-0" />
                {status.message}
              </p>
            ) : null}

            {working ? <Progress status={status} /> : null}

            {!working && problems.length ? (
              <ul className="flex flex-col gap-1 text-sm text-muted-foreground">
                {problems.map((problem) => (
                  <li key={problem}>{problem}</li>
                ))}
              </ul>
            ) : null}

            <Button type="submit" size="lg" className="self-start" disabled={problems.length > 0 || working}>
              {working ? <Loader2 className="animate-spin" /> : <FolderUp />}
              {working ? "Uploading" : "Upload and commit"}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}

const inputClass =
  "h-11 w-full rounded-md border border-input bg-ink-raised px-3.5 text-sm font-medium text-bone transition-colors placeholder:font-normal placeholder:text-muted-foreground/75 hover:border-bone/30 focus-visible:border-tungsten focus-visible:outline-none";
const textareaClass = cn(inputClass, "h-auto resize-y py-3 leading-relaxed");

function Step({ number, title, children }) {
  return (
    <fieldset className="flex flex-col gap-6">
      <legend className="mb-6 flex w-full items-baseline gap-4 border-t border-border pt-6">
        <span className="timecode text-tungsten">{number}</span>
        <span className="display text-title">{title}</span>
      </legend>
      {children}
    </fieldset>
  );
}

function Field({ label, hint, required, className, children }) {
  return (
    <label className={cn("flex min-w-0 flex-col gap-2", className)}>
      <span className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 text-sm font-medium">
        <span>
          {label}
          {required ? <span className="text-tungsten"> *</span> : null}
        </span>
        {hint ? <span className="text-xs font-normal text-muted-foreground">{hint}</span> : null}
      </span>
      {children}
    </label>
  );
}

function Checkbox({ checked, onChange, children }) {
  return (
    <label className="flex min-h-11 cursor-pointer items-center gap-3 text-sm text-muted-foreground">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="size-4 shrink-0 cursor-pointer accent-tungsten"
      />
      <span>{children}</span>
    </label>
  );
}

function FileSummary({ files, skipped, totalBytes }) {
  return (
    <div className="panel flex flex-col gap-3 p-4">
      <p className="timecode flex flex-wrap gap-x-4 gap-y-1 text-muted-foreground">
        <span className="text-bone">{files.length} files</span>
        <span>{formatBytes(totalBytes)}</span>
        {skipped.length ? <span>{skipped.length} left out</span> : null}
      </p>
      <ul className="max-h-48 overflow-y-auto font-mono text-xs leading-6 text-muted-foreground" data-lenis-prevent>
        {files.slice(0, 200).map((item) => (
          <li key={item.path} className="truncate">
            {item.path}
          </li>
        ))}
        {files.length > 200 ? <li>and {files.length - 200} more</li> : null}
      </ul>
      {skipped.length ? (
        <details className="text-xs text-muted-foreground">
          <summary className="cursor-pointer py-2 text-bone">Left out</summary>
          <ul className="max-h-40 overflow-y-auto font-mono leading-6" data-lenis-prevent>
            {skipped.slice(0, 200).map((item) => (
              <li key={item.path} className="truncate">
                {item.path} <span className="text-muted-foreground/70">({item.reason})</span>
              </li>
            ))}
            {skipped.length > 200 ? <li>and {skipped.length - 200} more</li> : null}
          </ul>
        </details>
      ) : null}
    </div>
  );
}

function Progress({ status }) {
  const share = status.total ? Math.round(((status.done ?? 0) / status.total) * 100) : null;
  return (
    <div role="status" className="flex max-w-md flex-col gap-2">
      <p className="timecode flex justify-between gap-4 text-muted-foreground">
        <span className="text-bone">{status.step}</span>
        {status.total ? (
          <span>
            {status.done}/{status.total}
          </span>
        ) : null}
      </p>
      <div className="h-1 overflow-hidden rounded-full bg-panel">
        <div
          className="h-full bg-tungsten transition-[width] duration-300"
          style={{ width: share === null ? "100%" : `${share}%`, opacity: share === null ? 0.4 : 1 }}
        />
      </div>
    </div>
  );
}

function Done({ status, onAgain }) {
  const { result, name } = status;
  return (
    <div role="status" className="panel flex flex-col gap-6 p-6 md:p-10">
      <p className="timecode flex items-center gap-2 text-tungsten">
        <Check className="size-4" />
        Committed to {result.branch}
      </p>
      <h2 className="display text-title">{name} is uploaded.</h2>
      <p className="max-w-2xl leading-relaxed text-muted-foreground">
        {result.fileCount} files are in the repository. If the site deploys from {result.branch}, the project shows on
        the home page once that deploy finishes.
      </p>
      <div className="flex flex-wrap gap-3">
        <Button asChild variant="outline">
          <a href={result.commitUrl} target="_blank" rel="noreferrer">
            See the commit
            <ArrowUpRight />
          </a>
        </Button>
        <Button asChild variant="outline">
          <a href={result.folderUrl} target="_blank" rel="noreferrer">
            Open the code
            <ArrowUpRight />
          </a>
        </Button>
        <Button type="button" onClick={onAgain}>
          Upload another
        </Button>
      </div>
    </div>
  );
}
