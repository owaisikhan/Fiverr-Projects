"use client";

import { useEffect, useRef, useState } from "react";

import { ProjectCover } from "@/app/_components/shared/ProjectCover";
import { featuredProjects } from "@/app/_data/projects";
import { prefersReducedMotion } from "@/app/_lib/gsap";
import { siteConfig } from "@/app/_lib/siteConfig";
import { cn } from "@/app/_lib/utils";

const FPS = 25;
const HOLD_MS = 2800;

/**
 * The hero's monitor: a camera-style frame with a REC light and a running
 * timecode around the hero film.
 *
 * Until `siteConfig.heroVideo.src` is set it plays a reel of the featured
 * projects' covers (or slates) instead, cutting every few seconds.
 *
 * The timecode is written to the DOM through a ref on each animation frame,
 * never through state. The reel cut is state, but it changes every few
 * seconds, not every frame. Under reduced motion the timecode stays at zero,
 * the reel holds on its first card and the film does not autoplay.
 */
export function HeroMonitor() {
  const timecodeRef = useRef(null);
  const videoRef = useRef(null);
  const [cut, setCut] = useState(0);
  const video = siteConfig.heroVideo;
  const reel = featuredProjects;

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const started = performance.now();
    let frame = 0;
    const tick = (now) => {
      const totalFrames = Math.floor(((now - started) / 1000) * FPS);
      const ff = totalFrames % FPS;
      const seconds = Math.floor(totalFrames / FPS);
      const parts = [Math.floor(seconds / 3600), Math.floor(seconds / 60) % 60, seconds % 60, ff];
      if (timecodeRef.current) {
        timecodeRef.current.textContent = parts.map((n) => String(n).padStart(2, "0")).join(":");
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    let interval;
    if (!video.src) {
      interval = setInterval(() => setCut((value) => (value + 1) % reel.length), HOLD_MS);
    } else {
      videoRef.current?.play().catch(() => {});
    }

    return () => {
      cancelAnimationFrame(frame);
      clearInterval(interval);
    };
  }, [video.src, reel.length]);

  const current = reel[cut];

  return (
    <figure className="w-full overflow-hidden rounded-xl border border-border bg-panel p-1.5 shadow-[0_40px_80px_-40px_rgb(0_0_0/0.9)]">
      <div className="timecode flex items-center justify-between gap-3 px-3 py-2.5 text-muted-foreground">
        <span className="flex items-center gap-2 text-tungsten">
          <span aria-hidden="true" className="size-2 rounded-full bg-tungsten motion-safe:animate-rec" />
          Rec
        </span>
        <span className="hidden sm:inline">Cam A · 16:10</span>
        <span ref={timecodeRef} className="text-bone">
          00:00:00:00
        </span>
      </div>

      <div className="relative aspect-[16/10] overflow-hidden rounded-md bg-ink">
        {video.src ? (
          <video
            ref={videoRef}
            className="absolute inset-0 size-full object-cover"
            poster={video.poster ?? undefined}
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="Showreel of shipped products"
          >
            {video.webm ? <source src={video.webm} type="video/webm" /> : null}
            <source src={video.src} type="video/mp4" />
          </video>
        ) : (
          <div aria-hidden="true">
            {reel.map((project, index) => (
              <div
                key={project.slug}
                className={cn(
                  "absolute inset-0 transition-opacity duration-500",
                  index === cut ? "opacity-100" : "opacity-0",
                )}
              >
                <ProjectCover project={project} sizes="(min-width: 1024px) 45vw, 100vw" priority={index === 0} />
              </div>
            ))}
          </div>
        )}
      </div>

      <figcaption className="timecode flex items-center justify-between gap-3 px-3 pt-2.5 pb-1.5 text-muted-foreground">
        {video.src ? (
          <>
            <span className="text-bone">{video.caption}</span>
            <span className="shrink-0">{video.detail}</span>
          </>
        ) : (
          <>
            <span className="truncate">
              <span className="text-bone">
                {String(cut + 1).padStart(2, "0")}/{String(reel.length).padStart(2, "0")}
              </span>{" "}
              {current.name}
            </span>
            <span className="shrink-0">{current.platform}</span>
          </>
        )}
      </figcaption>
    </figure>
  );
}
