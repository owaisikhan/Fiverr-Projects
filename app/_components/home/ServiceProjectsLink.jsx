"use client";

import { ArrowDown } from "lucide-react";

import { setIndexFilter } from "@/app/_lib/indexFilter";

/** Jumps to the work index with this service's category already selected. */
export function ServiceProjectsLink({ category, count }) {
  return (
    <a
      href="#index"
      onClick={() => setIndexFilter(category)}
      className="inline-flex h-11 items-center gap-2 self-start text-sm font-medium whitespace-nowrap text-bone transition-colors hover:text-tungsten"
    >
      See {count} projects
      <ArrowDown className="size-4" />
    </a>
  );
}
