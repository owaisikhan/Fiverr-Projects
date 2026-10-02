import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check, Lock } from "lucide-react";

import { Reveal } from "@/app/_components/motion/Reveal";
import { ProjectCover } from "@/app/_components/shared/ProjectCover";
import { StaggerGroup } from "@/app/_components/motion/StaggerGroup";
import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button";
import { Separator } from "@/app/_components/ui/separator";
import { getProject, projects } from "@/app/_data/projects";
import { siteConfig } from "@/app/_lib/siteConfig";

/** Every case study is prerendered; the site has no runtime data source. */
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

// Next 16: params is a Promise in page.js and must be awaited.
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) return { title: "Not found" };

  return {
    title: project.name,
    description: project.summary,
    openGraph: { title: project.name, description: project.summary },
  };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  const index = projects.findIndex((entry) => entry.slug === slug);
  const next = projects[(index + 1) % projects.length];

  const body = [
    { label: "The problem", text: project.problem },
    { label: "The approach", text: project.approach },
    { label: "The outcome", text: project.outcome },
  ];

  return (
    <article className="pt-32 pb-8 md:pt-40">
      {/* Header ------------------------------------------------------------ */}
      <header className="relative isolate overflow-hidden pb-16 md:pb-20">
        <div className="shell flex flex-col gap-8">
          <Reveal>
            <Link
              href="/#work"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="size-4" />
              All work
            </Link>
          </Reveal>

          <Reveal className="flex flex-wrap items-center gap-2">
            <Badge variant="mono">{project.kind}</Badge>
            <Badge variant="mono">{project.role}</Badge>
            <Badge variant="mono">{project.year}</Badge>
            {project.isPrivate ? (
              <Badge variant="mono">
                <Lock className="size-3" />
                Client, private
              </Badge>
            ) : null}
          </Reveal>

          <Reveal
            as="h1"
            className="display text-headline max-w-5xl"
          >
            {project.name}
          </Reveal>

          <Reveal
            as="p"
            className="max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl"
          >
            {project.summary}
          </Reveal>

          <Reveal className="flex flex-wrap items-center gap-3">
            {project.links.length > 0 ? (
              project.links.map((link) => (
                <Button key={link.href} asChild variant="outline">
                  <a href={link.href} target="_blank" rel="noreferrer">
                    {link.label}
                    <ArrowUpRight />
                  </a>
                </Button>
              ))
            ) : (
              /* Private client work carries no repo link on purpose: see the
                 note at the top of app/_data/projects.js. */
              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                <Lock className="size-4 shrink-0" />
                The source lives in a private client repository. Happy to walk
                through the code and the schema on a call.
              </p>
            )}
          </Reveal>
        </div>
      </header>

      <div className="shell pb-16 md:pb-20">
        <Reveal className="overflow-hidden rounded-lg border border-border">
          <ProjectCover project={project} sizes="(min-width: 1376px) 1296px, 100vw" priority motion />
        </Reveal>
      </div>

      <Separator />

      {/* Body -------------------------------------------------------------- */}
      <div className="shell grid gap-14 py-16 md:py-20 lg:grid-cols-[1.35fr_0.65fr] lg:gap-20">
        <div className="flex flex-col gap-12">
          {body.map((block) => (
            <Reveal key={block.label} className="flex flex-col gap-4">
              <h2 className="font-mono text-xs tracking-[0.18em] text-tungsten uppercase">
                {block.label}
              </h2>
              <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                {block.text}
              </p>
            </Reveal>
          ))}

          <Reveal className="flex flex-col gap-5">
            <h2 className="font-mono text-xs tracking-[0.18em] text-tungsten uppercase">
              Highlights
            </h2>
            <ul className="flex flex-col gap-3">
              {project.highlights.map((highlight) => (
                <li key={highlight} className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-1 grid size-5 shrink-0 place-items-center rounded-full border"
                    style={{
                      borderColor: `color-mix(in oklab, ${project.accent} 45%, transparent)`,
                    }}
                  >
                    <Check className="size-3" style={{ color: project.accent }} />
                  </span>
                  <span className="leading-relaxed text-muted-foreground">
                    {highlight}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          {project.improvements?.length ? (
            <Reveal className="flex flex-col gap-5 rounded-lg border border-dashed border-border p-6">
              <h2 className="font-mono text-xs tracking-[0.18em] text-tungsten uppercase">
                What I would improve next
              </h2>
              <ul className="flex flex-col gap-3">
                {project.improvements.map((item) => (
                  <li key={item} className="leading-relaxed text-muted-foreground">
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ) : null}
        </div>

        {/* Sidebar ---------------------------------------------------------- */}
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <Reveal className="panel flex flex-col gap-6 p-6">
            <div className="flex flex-col gap-1">
              <span className="font-mono text-xs tracking-[0.18em] text-muted-foreground uppercase">
                Built with
              </span>
              <span
                aria-hidden="true"
                className="mt-2 h-px w-full"
                style={{
                  background: `linear-gradient(90deg, ${project.accent}, transparent)`,
                }}
              />
            </div>

            <ul className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <li key={tech}>
                  <Badge>{tech}</Badge>
                </li>
              ))}
            </ul>

            <Separator />

            <dl className="flex flex-col gap-4 text-sm">
              <div className="flex items-center justify-between gap-4">
                <dt className="text-muted-foreground">Role</dt>
                <dd>{project.role}</dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-muted-foreground">Type</dt>
                <dd>{project.kind}</dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-muted-foreground">Platform</dt>
                <dd>{project.platform}</dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-muted-foreground">Year</dt>
                <dd>{project.year}</dd>
              </div>
            </dl>

            <Button asChild className="w-full">
              <a href={`mailto:${siteConfig.email}?subject=${project.name}`}>
                Discuss a project like this
                <ArrowUpRight />
              </a>
            </Button>
          </Reveal>
        </aside>
      </div>

      <Separator />

      {/* Next project ------------------------------------------------------ */}
      <StaggerGroup className="shell py-16 md:py-20">
        <Link
          href={`/work/${next.slug}`}
          className="panel group flex flex-col gap-4 p-8 transition-colors duration-300 hover:border-white/25 md:p-12"
        >
          <span className="font-mono text-xs tracking-[0.18em] text-muted-foreground uppercase">
            Next project
          </span>
          <span className="flex flex-wrap items-center justify-between gap-4">
            <span className="display text-headline">
              {next.name}
            </span>
            <span
              aria-hidden="true"
              className="grid size-12 shrink-0 place-items-center rounded-md border border-border transition-all duration-300 group-hover:border-transparent group-hover:bg-bone group-hover:text-ink"
            >
              <ArrowUpRight className="size-5" />
            </span>
          </span>
          <span className="max-w-2xl text-muted-foreground">{next.tagline}</span>
        </Link>
      </StaggerGroup>
    </article>
  );
}
