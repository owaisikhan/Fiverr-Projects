"use client";

import { useEffect, useRef } from "react";

import { prefersReducedMotion } from "@/app/_lib/gsap";
import { cn } from "@/app/_lib/utils";

/**
 * A silent looping video that only plays while it is on screen.
 *
 * `preload="none"` plus the observer keeps the page light: nothing downloads
 * until the video scrolls into view, and it pauses again when it leaves.
 * Under reduced motion it never plays and the poster frame stands in.
 */
export function VideoLoop({ src, webm, poster, label, className }) {
  const ref = useRef(null);

  useEffect(() => {
    const video = ref.current;
    if (!video || prefersReducedMotion()) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.25 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className={cn("size-full object-cover object-left", className)}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      aria-label={label}
    >
      {webm ? <source src={webm} type="video/webm" /> : null}
      <source src={src} type="video/mp4" />
    </video>
  );
}
