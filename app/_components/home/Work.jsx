import Link from "next/link";
import { ArrowUpRight, Lock, Play, Upload } from "lucide-react";

import { WorkIndex } from "@/app/_components/home/WorkIndex";
import { Reveal } from "@/app/_components/motion/Reveal";
import { ProjectCover } from "@/app/_components/shared/ProjectCover";
import { SectionHeading } from "@/app/_components/shared/SectionHeading";
import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button";
import { deliveredProjects, featuredProjects } from "@/app/_data/projects";
import { cn } from "@/app/_lib/utils";

/**
 * Selected work, then the full index.
 *
 * Generated from `_data/projects.js`: `featured: true` puts a project in the
 * spreads, and every project gets an index row and a case-study route. Never
 * hard-code a project here.
 */
export function Work() {
  return (
    <section id="work" className="shell scroll-mt-24 py-16 md:py-24">
      <SectionHeading
        scene="01"
        label="Selected work"
        title={
          deliveredProjects.length > 0
            ? `${deliveredProjects.length} ${deliveredProjects.length === 1 ? "order" : "orders"} delivered on Fiverr.`
            : "Fiverr deliveries, added as they ship."
        }
        lede="Every project here is an order delivered on Fiverr, uploaded with its code and a short write-up the day it ships."
        aside={
          <Button asChild variant="outline">
            <Link href="/upload">
              <Upload />
              Upload a project
            </Link>
          </Button>
        }
      />

      <div className="mt-12 flex flex-col md:mt-16">
        {featuredProjects.map((project, index) => (
          <Spread key={project.slug} project={project} take={index + 1} flip={index % 2 === 1} />
        ))}
      </div>

      <div className="mt-16 md:mt-24">
        <WorkIndex />
      </div>
    </section>
  );
}

function Spread({ project, take, flip }) {
  return (
    <Reveal
      as="article"
      className="grid items-center gap-6 border-t border-border py-10 first:border-t-0 first:pt-0 md:gap-10 md:py-14 lg:grid-cols-12"
    >
      <Link
        href={`/work/${project.slug}`}
        aria-label={`${project.name} case study`}
        className={cn(
          "group block overflow-hidden rounded-lg border border-border lg:col-span-7",
          flip && "lg:order-2",
        )}
      >
        <div className="transition-transform duration-500 ease-out group-hover:scale-[1.02] motion-reduce:transform-none">
          <ProjectCover project={project} motion />
        </div>
      </Link>

      <div className={cn("flex min-w-0 flex-col items-start gap-4 lg:col-span-5", flip && "lg:order-1")}>
        <p className="timecode flex flex-wrap items-center gap-x-3 gap-y-1 text-muted-foreground">
          <span className="text-tungsten">Take {String(take).padStart(2, "0")}</span>
          <span>{project.platform}</span>
          <span>{project.year}</span>
          {project.placeholder ? <span>Placeholder</span> : null}
          {project.isPrivate ? (
            <span className="inline-flex items-center gap-1.5">
              <Lock className="size-3" />
              Client, private
            </span>
          ) : null}
        </p>

        <h3 className="display text-title">{project.name}</h3>

        <p className="max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">{project.tagline}</p>

        <ul className="flex flex-wrap gap-2">
          {project.stack.slice(0, 3).map((tech) => (
            <li key={tech}>
              <Badge>{tech}</Badge>
            </li>
          ))}
        </ul>

        <div className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-3">
          <Link
            href={`/work/${project.slug}`}
            className="group inline-flex items-center gap-2 border-b border-bone/40 pb-1 text-sm font-medium transition-colors hover:border-tungsten hover:text-tungsten"
          >
            Read the case study
            <ArrowUpRight className="size-4" />
          </Link>
          {project.walkthrough ? (
            <span className="timecode inline-flex items-center gap-2 text-muted-foreground">
              <Play className="size-3 fill-current text-tungsten" />
              Walkthrough {project.walkthrough.duration}
            </span>
          ) : null}
        </div>
      </div>
    </Reveal>
  );
}
