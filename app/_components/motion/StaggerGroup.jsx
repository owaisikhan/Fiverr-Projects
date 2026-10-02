"use client";

import { useEffect, useRef } from "react";

import { gsap, prefersReducedMotion } from "@/app/_lib/gsap";
import { cn } from "@/app/_lib/utils";

/**
 * Staggers in every direct child of the group.
 *
 * Children are targeted by `:scope > *` rather than by a class so callers do
 * not have to remember to tag each item: a card grid can be wrapped as-is.
 */
export function StaggerGroup({
  as: Tag = "div",
  children,
  className,
  stagger = 0.09,
  y = 26,
  start = "top 82%",
  ...props
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const items = Array.from(el.children);
    if (items.length === 0) return;

    if (prefersReducedMotion()) {
      gsap.set(items, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        items,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start, once: true },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [stagger, y, start]);

  return (
    <Tag ref={ref} data-stagger className={cn(className)} {...props}>
      {children}
    </Tag>
  );
}
