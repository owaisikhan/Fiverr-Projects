"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";

import { Button } from "@/app/_components/ui/button";
import { siteConfig } from "@/app/_lib/siteConfig";
import { cn } from "@/app/_lib/utils";

/**
 * Top bar. It gains a ground and a hairline after the first scroll rather than
 * on a section boundary, so it behaves the same on the home page and on a
 * case-study page where there is no hero to key off.
 */
export function Navbar() {
  const [condensed, setCondensed] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Toggles a boolean once per threshold crossing; React skips the render
    // when the value is unchanged, so this is not a per-frame state update.
    function onScroll() {
      setCondensed(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // A fixed menu over a scrolling page is disorienting; lock the body while
  // it is open and restore whatever the page had before.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-80 border-b transition-colors duration-300",
          condensed || open ? "border-border bg-ink/95" : "border-transparent bg-transparent",
        )}
      >
        <nav aria-label="Primary" className="shell flex h-16 items-center justify-between gap-4 md:h-18">
          <Link href="/" className="flex items-center gap-3 py-2" onClick={() => setOpen(false)}>
            <span className="grid size-8 place-items-center rounded-sm bg-bone font-mono text-xs font-semibold text-ink">
              {siteConfig.initials}
            </span>
            <span className="text-sm font-medium tracking-tight">{siteConfig.name}</span>
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-md px-3.5 py-2 text-sm text-muted-foreground transition-colors hover:text-bone"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <Button asChild size="sm" className="hidden sm:inline-flex">
              <Link href="/#contact">
                Start a project
                <ArrowUpRight />
              </Link>
            </Button>

            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              className="grid size-11 place-items-center rounded-md border border-border text-bone transition-colors hover:bg-white/[0.06] md:hidden"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-70 bg-ink pt-16 md:hidden"
          >
            <div className="shell flex h-full flex-col justify-between pt-6 pb-10">
              <ul className="flex flex-col">
                {[...siteConfig.nav, { href: "/#faq", label: "FAQ" }].map((item, index) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.04 + index * 0.04, duration: 0.3 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="display flex items-baseline gap-4 border-b border-border py-4 text-5xl"
                    >
                      <span className="timecode text-tungsten">{String(index + 1).padStart(2, "0")}</span>
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <Button asChild size="lg" className="self-start">
                <Link href="/#contact" onClick={() => setOpen(false)}>
                  Start a project
                  <ArrowUpRight />
                </Link>
              </Button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
