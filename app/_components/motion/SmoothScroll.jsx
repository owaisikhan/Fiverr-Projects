"use client";

import { useEffect } from "react";
import Lenis from "lenis";

import { gsap, prefersReducedMotion, ScrollTrigger } from "@/app/_lib/gsap";

/**
 * Lenis smooth scrolling, driven from GSAP's ticker so ScrollTrigger and Lenis
 * read the same scroll position on the same frame.
 *
 * `anchors` and `stopInertiaOnNavigate` are both needed: without them a click
 * on an in-page link made while Lenis is still gliding lands wherever the
 * glide was heading, not on the section. Lenis reads `scroll-padding-top`
 * from <html>, so anchored headings clear the fixed navbar.
 *
 * Under reduced motion Lenis never starts and the page scrolls natively.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      autoRaf: false,
      anchors: true,
      stopInertiaOnNavigate: true,
    });

    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return null;
}
