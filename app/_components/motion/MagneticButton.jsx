"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

import { Button } from "@/app/_components/ui/button";
import { prefersReducedMotion } from "@/app/_lib/gsap";
import { cn } from "@/app/_lib/utils";

/**
 * A button that leans toward the pointer and springs back on leave.
 *
 * The magnetism lives on a wrapper, not on the Button itself. Wrapping the
 * Button's children in a motion element instead looks equivalent but is not:
 * with `asChild`, Radix's Slot clones *that wrapper* and the real `<a>` ends
 * up nested inside the pill, so only the text is clickable and the button's
 * `whitespace-nowrap` never reaches the label. Keeping the transform outside
 * leaves `asChild` free to do its job: the anchor is the button.
 *
 * Pointer-only: skipped on coarse pointers and under reduced motion, and it
 * never moves far enough for the element to slide out from under the cursor.
 */
export function MagneticButton({ className, strength = 0.3, ...props }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 240, damping: 18, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 240, damping: 18, mass: 0.6 });

  function handleMove(event) {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const rect = el.getBoundingClientRect();
    x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.span
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      style={{ x: springX, y: springY }}
      className="inline-flex"
    >
      <Button className={cn(className)} {...props} />
    </motion.span>
  );
}
