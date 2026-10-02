"use client";

import { motion, useScroll, useSpring } from "motion/react";

/** Hairline reading-progress bar pinned to the very top of the viewport. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-100 h-px origin-left bg-tungsten motion-reduce:hidden"
    />
  );
}
