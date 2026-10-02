import Link from "next/link";
import { ArrowUpRight, Github, Mail } from "lucide-react";

import { siteConfig } from "@/app/_lib/siteConfig";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border pt-12">
      <div className="shell flex flex-col gap-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-3">
            <p className="timecode text-muted-foreground">{siteConfig.location}</p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <a
                href={`mailto:${siteConfig.email}`}
                className="inline-flex min-h-11 items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-bone"
              >
                <Mail className="size-4" />
                {siteConfig.email}
              </a>
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-bone"
              >
                <Github className="size-4" />
                GitHub
                <ArrowUpRight className="size-3.5" />
              </a>
            </div>
          </div>

          <ul className="flex flex-wrap gap-x-6 gap-y-1">
            {[...siteConfig.nav, { href: "/#faq", label: "FAQ" }].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex min-h-11 items-center text-sm text-muted-foreground transition-colors hover:text-bone"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* The name, set as large as the width allows. Decorative: the
            accessible name of the site is already in the header and <title>. */}
        <p aria-hidden="true" className="display text-mega overflow-hidden pb-2 text-center whitespace-nowrap text-panel select-none">
          {siteConfig.name}
        </p>
      </div>

      <div className="shell flex flex-col items-center justify-between gap-2 border-t border-border py-6 text-xs text-muted-foreground sm:flex-row">
        <p>
          © {year} {siteConfig.name}. All rights reserved.
        </p>
        <p className="font-mono">Built with Next.js, Tailwind, GSAP and Motion</p>
      </div>
    </footer>
  );
}
