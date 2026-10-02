"use client";

import { useEffect, useRef } from "react";
import { ArrowDown, ArrowUpRight, Github } from "lucide-react";

import { HeroMonitor } from "@/app/_components/home/HeroMonitor";
import { KineticHeading } from "@/app/_components/motion/KineticHeading";
import { MagneticButton } from "@/app/_components/motion/MagneticButton";
import { Button } from "@/app/_components/ui/button";
import { gsap, prefersReducedMotion } from "@/app/_lib/gsap";
import { siteConfig } from "@/app/_lib/siteConfig";

export function Hero() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // The headline moves first; everything else arrives after it.
      gsap.fromTo(
        "[data-hero-fade]",
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.9, delay: 0.5, stagger: 0.1, ease: "power3.out" },
      );

      // The monitor drifts up slightly slower than the page as it leaves.
      gsap.to("[data-hero-monitor]", {
        yPercent: -8,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: 0.6 },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative pt-24 pb-14 md:pt-28 md:pb-20">
      <div className="shell grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
        {/* `min-w-0`: a display-sized heading is wider than its grid column at
            small viewports without it. */}
        <div className="flex min-w-0 flex-col items-start gap-7">
          <p data-hero-fade className="timecode flex items-center gap-2.5 text-muted-foreground">
            <span aria-hidden="true" className="size-2 rounded-full bg-tungsten motion-safe:animate-rec" />
            <span className="text-bone">{siteConfig.availability}</span>
            <span aria-hidden="true" className="hidden sm:inline">·</span>
            <span className="hidden sm:inline">{siteConfig.location}</span>
          </p>

          <KineticHeading lines={siteConfig.headline} className="display text-display w-full" />

          <p data-hero-fade className="max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {siteConfig.intro}
          </p>

          <div data-hero-fade className="flex flex-wrap items-center gap-3">
            <MagneticButton asChild size="lg">
              <a href="#work">
                See the work
                <ArrowDown className="size-4" />
              </a>
            </MagneticButton>

            <Button asChild variant="outline" size="lg">
              <a href="#contact">
                Start a project
                <ArrowUpRight />
              </a>
            </Button>

            <Button asChild variant="ghost" size="lg">
              <a href={siteConfig.github} target="_blank" rel="noreferrer">
                <Github />
                GitHub
              </a>
            </Button>
          </div>
        </div>

        <div data-hero-fade className="w-full min-w-0">
          <div data-hero-monitor>
            <HeroMonitor />
          </div>
        </div>
      </div>
    </section>
  );
}
