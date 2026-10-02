"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Single registration point for GSAP plugins. Importing `gsap` from here
 * rather than from the package guarantees ScrollTrigger is registered before
 * any component tries to use it: registering per-component is where the
 * "ScrollTrigger is not defined" class of bug comes from.
 */
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * True when the visitor has asked for reduced motion.
 *
 * Every animation in this project checks this and degrades to the *final*
 * state, never to a faster animation: a shorter tween is still motion.
 */
export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export { gsap, ScrollTrigger };
