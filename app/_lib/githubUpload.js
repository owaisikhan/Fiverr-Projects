/**
 * Commits a delivered order to the repository straight from the browser,
 * through the GitHub REST API and a token the owner pastes in. The site stays
 * static: no API route and no server secret, and without a token the upload
 * page can do nothing.
 *
 * One upload is one commit on the target branch:
 *   deliveries/<slug>/...      the order's code
 *   public/work/<slug>.<ext>   the cover, when one is given
 *   app/_data/deliveries.json  the entry the site renders
 *
 * GitHub limits content-creating requests to about 80 a minute, so text files
 * travel inline inside tree requests (a few MB per request) and only binary
 * files are sent as separate blobs.
 */

const API = "https://api.github.com";

/** Folder and file names never committed, wherever they sit in the tree. */
const SKIPPED_DIRS = new Set([
  "node_modules",
  ".git",
  ".next",
  ".vercel",
  ".turbo",
  ".cache",
  ".parcel-cache",
  "coverage",
  "__pycache__",
  ".venv",
  "venv",
  ".idea",
]);
const SKIPPED_FILES = new Set([".DS_Store", "Thumbs.db", "desktop.ini"]);

export const MAX_FILE_BYTES = 50 * 1024 * 1024;
export const MAX_TOTAL_BYTES = 150 * 1024 * 1024;
const TREE_CHUNK_BYTES = 4 * 1024 * 1024;

/** Why a path is left out, or null when it is kept. */
export function skipReason(path, size) {
  const parts = path.split("/");
  const name = parts[parts.length - 1];
  if (parts.slice(0, -1).some((part) => SKIPPED_DIRS.has(part))) return "build or dependency folder";
  if (SKIPPED_FILES.has(name)) return "system file";
  if (/^\.env/.test(name) && name !== ".env.example") return "environment file, may hold secrets";
  if (/\.(pem|key|p12|pfx)$/i.test(name)) return "key file, may hold secrets";
  if (size > MAX_FILE_BYTES) return "larger than 50 MB";
  return null;
}

export function slugify(value) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

class GitHubError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function request(token, method, path, body) {
  for (let attempt = 0; ; attempt += 1) {
    const response = await fetch(`${API}${path}`, {
      method,
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${token}`,
        "X-GitHub-Api-Version": "2022-11-28",
        ...(body ? { "Content-Type": "application/json" } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (response.ok) return response.status === 204 ? null : response.json();

    const data = await response.json().catch(() => ({}));
    const limited =
      response.status === 429 ||
      (response.status === 403 && /rate limit/i.test(data.message ?? ""));

    if (limited && attempt < 3) {
      const seconds = Number(response.headers.get("retry-after")) || 60;
      await wait(seconds * 1000);
      continue;
    }

    throw new GitHubError(explain(response.status, data.message, path), response.status);
  }
}

function explain(status, message, path) {
  if (status === 401) return "GitHub rejected the token. Check it was copied in full and has not expired.";
  if (status === 403) return `The token cannot write to this repository (${message}). It needs Contents: read and write.`;
  if (status === 404 && path.includes("/git/ref")) return "The target branch was not found.";
  if (status === 404) return "Repository not found. A fine-grained token must list this repository.";
  if (status === 422 && path.includes("/git/refs")) {
    return "The branch moved while uploading (another commit landed). Upload again.";
  }
  return `GitHub error ${status}: ${message ?? "no message"}`;
}

/** Bytes to base64 without blowing the call stack on large files. */
function toBase64(bytes) {
  let binary = "";
  const step = 0x8000;
  for (let index = 0; index < bytes.length; index += step) {
    binary += String.fromCharCode.apply(null, bytes.subarray(index, index + step));
  }
  return btoa(binary);
}

function fromBase64Utf8(value) {
  const binary = atob(value.replace(/\n/g, ""));
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

/** UTF-8 text with no NUL bytes travels inline; anything else is a blob. */
function asText(bytes) {
  if (bytes.subarray(0, 8000).includes(0)) return null;
  try {
    return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  } catch {
    return null;
  }
}

/** Checks the token and returns the repository and the branch to commit to. */
export async function checkAccess({ token, owner, repo, branch }) {
  const info = await request(token, "GET", `/repos/${owner}/${repo}`);
  if (info.permissions && !info.permissions.push) {
    throw new GitHubError("This token can read the repository but not push to it.", 403);
  }
  return { branch: branch || info.default_branch, htmlUrl: info.html_url };
}

/**
 * @param {object} options
 * @param {string} options.token
 * @param {{ owner, repo, branch, folder, data, covers }} options.target
 * @param {object} options.entry     the project entry, without cover or links
 * @param {{ path: string, file: File }[]} options.files  paths relative to the delivery folder
 * @param {File | null} options.cover
 * @param {(step: string, done?: number, total?: number) => void} options.onProgress
 */
export async function uploadDelivery({ token, target, entry, files, cover, onProgress }) {
  const { owner, repo } = target;
  const base = `/repos/${owner}/${repo}`;

  onProgress("Checking access");
  const { branch, htmlUrl } = await checkAccess({ token, ...target });

  const ref = await request(token, "GET", `${base}/git/ref/heads/${encodeURIComponent(branch)}`);
  const parentSha = ref.object.sha;
  const parent = await request(token, "GET", `${base}/git/commits/${parentSha}`);

  onProgress("Reading the project list");
  let deliveries = [];
  try {
    const current = await request(
      token,
      "GET",
      `${base}/contents/${target.data}?ref=${encodeURIComponent(branch)}`,
    );
    deliveries = JSON.parse(fromBase64Utf8(current.content));
  } catch (error) {
    if (error.status !== 404) throw error;
  }
  if (deliveries.some((item) => item.slug === entry.slug)) {
    throw new GitHubError(`A project with the address "${entry.slug}" is already uploaded. Change the name or the address.`, 409);
  }

  const folder = `${target.folder}/${entry.slug}`;
  const textEntries = [];
  const binaryEntries = [];
  const all = [...files.map((item) => ({ path: `${folder}/${item.path}`, file: item.file }))];

  let coverEntry = null;
  if (cover) {
    const extension = (cover.name.split(".").pop() || "jpg").toLowerCase();
    const path = `${target.covers}/${entry.slug}.${extension}`;
    all.push({ path, file: cover });
    coverEntry = { src: `/${path.replace(/^public\//, "")}`, alt: `${entry.name}, home screen` };
  }

  // Read every file once and sort it into inline text or a binary blob.
  for (let index = 0; index < all.length; index += 1) {
    onProgress("Reading files", index, all.length);
    const bytes = new Uint8Array(await all[index].file.arrayBuffer());
    const text = asText(bytes);
    if (text !== null) textEntries.push({ path: all[index].path, content: text, size: bytes.length });
    else binaryEntries.push({ path: all[index].path, bytes });
  }

  // Binary files: one blob each, four at a time.
  const blobShas = [];
  let sent = 0;
  const queue = [...binaryEntries];
  async function worker() {
    while (queue.length) {
      const item = queue.shift();
      const blob = await request(token, "POST", `${base}/git/blobs`, {
        content: toBase64(item.bytes),
        encoding: "base64",
      });
      blobShas.push({ path: item.path, mode: "100644", type: "blob", sha: blob.sha });
      sent += 1;
      onProgress("Uploading binary files", sent, binaryEntries.length);
    }
  }
  await Promise.all(Array.from({ length: Math.min(4, queue.length) }, worker));

  // The entry the site renders, appended to deliveries.json.
  const links = [];
  if (entry.liveUrl) links.push({ label: "Live site", href: entry.liveUrl });
  if (!entry.isPrivate) {
    links.push({ label: "Source code", href: `${htmlUrl}/tree/${branch}/${folder}` });
  }
  if (entry.fiverrUrl) links.push({ label: "On Fiverr", href: entry.fiverrUrl });

  const record = { ...entry, cover: coverEntry, links, source: folder };
  delete record.liveUrl;
  delete record.fiverrUrl;
  const data = `${JSON.stringify([...deliveries, record], null, 2)}\n`;
  textEntries.push({ path: target.data, content: data, size: data.length });

  // Text files ride inline, chained across several trees when large.
  const chunks = [];
  let chunk = [];
  let chunkBytes = 0;
  for (const item of textEntries) {
    if (chunk.length && chunkBytes + item.size > TREE_CHUNK_BYTES) {
      chunks.push(chunk);
      chunk = [];
      chunkBytes = 0;
    }
    chunk.push({ path: item.path, mode: "100644", type: "blob", content: item.content });
    chunkBytes += item.size;
  }
  chunks.push([...chunk, ...blobShas]);

  let treeSha = parent.tree.sha;
  for (let index = 0; index < chunks.length; index += 1) {
    onProgress("Building the commit", index + 1, chunks.length);
    const tree = await request(token, "POST", `${base}/git/trees`, {
      base_tree: treeSha,
      tree: chunks[index],
    });
    treeSha = tree.sha;
  }

  onProgress("Committing");
  const commit = await request(token, "POST", `${base}/git/commits`, {
    message: `Deliver ${entry.name}\n\nUploaded from the portfolio's upload page.`,
    tree: treeSha,
    parents: [parentSha],
  });
  await request(token, "PATCH", `${base}/git/refs/heads/${encodeURIComponent(branch)}`, {
    sha: commit.sha,
    force: false,
  });

  return {
    commitUrl: commit.html_url ?? `${htmlUrl}/commit/${commit.sha}`,
    folderUrl: `${htmlUrl}/tree/${branch}/${folder}`,
    branch,
    fileCount: files.length,
  };
}
