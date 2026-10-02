"use client";

import { useEffect, useRef } from "react";

import { gsap, prefersReducedMotion } from "@/app/_lib/gsap";
import { cn } from "@/app/_lib/utils";

/**
 * A display heading whose lines rise out from behind a mask.
 *
 * `lines` is an array of strings, one per visual line, because splitting a
 * single string on width is unreliable across fonts and breakpoints. Each line
 * is wrapped in its own `overflow-hidden` element so the mask edge is the line
 * box itself and there is nothing to clip against a parent.
 *
 * The heading is real text: the animated spans are `aria-hidden` and the whole
 * phrase is exposed once via an `sr-only` copy, so a screen reader hears one
 * sentence rather than a list of fragments.
 */
export function KineticHeading({
  as: Tag = "h1",
  lines,
  className,
  lineClassName,
  delay = 0.1,
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const inner = el.querySelectorAll("[data-kinetic-line]");
    if (inner.length === 0) return;

    if (prefersReducedMotion()) {
      gsap.set(inner, { yPercent: 0, opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        inner,
        { yPercent: 108, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.15,
          delay,
          stagger: 0.09,
          ease: "expo.out",
        },
      );
    }, el);

    return () => ctx.revert();
  }, [delay]);

  return (
    <Tag ref={ref} className={cn("max-w-full text-balance", className)}>
      <span className="sr-only">{lines.join(" ")}</span>
      {lines.map((line, index) => (
        <span
          key={`${line}-${index}`}
          aria-hidden="true"
          className="block overflow-hidden pb-[0.08em]"
        >
          <span
            data-kinetic-line
            className={cn("block will-change-transform", lineClassName)}
          >
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}
