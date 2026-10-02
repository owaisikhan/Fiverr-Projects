"use client";

import { useEffect, useRef } from "react";

import { gsap, prefersReducedMotion } from "@/app/_lib/gsap";

/**
 * Counts a number up when it scrolls into view.
 *
 * The tween writes `textContent` through a ref rather than calling setState.
 * A state update per animation frame would re-render the whole stats row sixty
 * times a second, and ESLint's `react-hooks/set-state-in-effect` rule rejects
 * the naive version anyway.
 *
 * `value` may carry a prefix or suffix ("7", "2026", "12+"); the digits are
 * parsed out and whatever surrounds them is preserved.
 */
export function Counter({ value, className }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const match = String(value).match(/-?[\d.]+/);
    if (!match) {
      el.textContent = value;
      return;
    }

    const target = Number(match[0]);
    const decimals = (match[0].split(".")[1] ?? "").length;
    const prefix = String(value).slice(0, match.index);
    const suffix = String(value).slice(match.index + match[0].length);

    if (prefersReducedMotion()) {
      el.textContent = value;
      return;
    }

    const counter = { n: 0 };
    const ctx = gsap.context(() => {
      gsap.to(counter, {
        n: target,
        duration: 1.6,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 92%", once: true },
        onUpdate() {
          el.textContent = `${prefix}${counter.n.toFixed(decimals)}${suffix}`;
        },
        onComplete() {
          el.textContent = value;
        },
      });
    }, el);

    return () => ctx.revert();
  }, [value]);

  // Server-rendered with the final value, so the number is correct before
  // hydration and for anyone without JavaScript.
  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
