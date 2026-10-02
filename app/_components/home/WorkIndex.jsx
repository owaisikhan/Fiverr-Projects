"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { ArrowUpRight, Lock } from "lucide-react";

import { ProjectCover } from "@/app/_components/shared/ProjectCover";
import { categories, projects } from "@/app/_data/projects";
import {
  getIndexFilter,
  getServerIndexFilter,
  setIndexFilter,
  subscribeIndexFilter,
} from "@/app/_lib/indexFilter";
import { cn } from "@/app/_lib/utils";

/**
 * Every project as one numbered row, filterable by category. Sixteen projects
 * do not fit as cards; an index does. Numbers are each project's position in
 * projects.js, so a row keeps its number whatever the filter.
 */
export function WorkIndex() {
  const filter = useSyncExternalStore(subscribeIndexFilter, getIndexFilter, getServerIndexFilter);

  const options = [
    { key: "all", label: "All", count: projects.length },
    ...categories.map((category) => ({
      ...category,
      count: projects.filter((project) => project.category === category.key).length,
    })),
  ];

  return (
    <div id="index" className="flex scroll-mt-28 flex-col gap-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <h3 className="display text-title">The full index</h3>

        <div
          role="group"
          aria-label="Filter projects by category"
          className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 md:flex-wrap md:overflow-visible"
        >
          {options.map((option) => (
            <button
              key={option.key}
              type="button"
              aria-pressed={filter === option.key}
              onClick={() => setIndexFilter(option.key)}
              className={cn(
                "flex h-10 shrink-0 items-center gap-2 rounded-md border px-3.5 text-sm transition-colors",
                filter === option.key
                  ? "border-bone bg-bone text-ink"
                  : "border-border text-muted-foreground hover:border-bone/40 hover:text-bone",
              )}
            >
              {option.label}
              <span className="font-mono text-xs opacity-70">{option.count}</span>
            </button>
          ))}
        </div>
      </div>

      <ol className="border-t border-border">
        {projects.map((project, index) => {
          if (filter !== "all" && project.category !== filter) return null;
          return (
            <li key={project.slug} className="border-b border-border">
              <Link
                href={`/work/${project.slug}`}
                className="group grid grid-cols-[2rem_minmax(0,1fr)_auto] items-center gap-4 py-4 transition-colors hover:bg-ink-raised md:grid-cols-[2.5rem_6.5rem_minmax(0,1.1fr)_minmax(0,1.4fr)_9rem_3rem_1.5rem] md:gap-6 md:px-2"
              >
                <span className="timecode text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>

                <span className="hidden overflow-hidden rounded-sm border border-border md:block">
                  <ProjectCover project={project} sizes="7rem" compact />
                </span>

                <span className="flex min-w-0 items-center gap-2">
                  <span className="truncate font-medium">{project.name}</span>
                  {project.isPrivate ? (
                    <Lock aria-label="Private client work" className="size-3.5 shrink-0 text-muted-foreground" />
                  ) : null}
                </span>

                <span className="hidden truncate text-sm text-muted-foreground md:block">{project.tagline}</span>
                <span className="timecode hidden text-muted-foreground md:block">{project.platform}</span>
                <span className="timecode text-right text-muted-foreground">{project.year}</span>
                <ArrowUpRight
                  aria-hidden="true"
                  className="hidden size-4 text-muted-foreground transition-colors group-hover:text-tungsten md:block"
                />
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
