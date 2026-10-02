"use client";

import { useEffect, useRef } from "react";

import { gsap, prefersReducedMotion } from "@/app/_lib/gsap";
import { cn } from "@/app/_lib/utils";

/**
 * Fades and lifts its children in once they enter the viewport.
 *
 * The element carries `data-reveal`, which globals.css pre-hides at
 * `opacity: 0`. That is deliberate: without the pre-hide the content paints at
 * full opacity for a frame before GSAP takes it, which reads as a flash.
 */
export function Reveal({
  as: Tag = "div",
  children,
  className,
  delay = 0,
  y = 28,
  start = "top 85%",
  ...props
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Reduced motion: jump straight to the final state, never a faster tween.
    if (prefersReducedMotion()) {
      gsap.set(el, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start, once: true },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [delay, y, start]);

  return (
    <Tag ref={ref} data-reveal className={cn(className)} {...props}>
      {children}
    </Tag>
  );
}
