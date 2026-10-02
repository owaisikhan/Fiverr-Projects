<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project: Owais Khan, Portfolio (v3 "Cutting Room")

Built with the kodexa-builder skill (v1.4.0). Load it for any new feature or
design work, and log preferences, corrections and reversals to
`.claude/kodexa-learnings.md` as they happen.

Palette exceptions: dark, pink, cyan, purple (dark: the owner chose the "Cutting Room" direction on 2026-10-01; the others are per-project accents shown only on each project's slate stripes and highlight ticks)

A dark, film-led portfolio built on shadcn/ui, Motion, GSAP and Lenis, showing
orders delivered on Fiverr to prospective clients. Static: no database, no
environment variables, no API routes. Images are the project covers in
`public/work`. The owner cleared all earlier work on 2026-10-02; only Fiverr
deliveries are shown from now on, with three placeholders until the first.

**Read `README.md` first**: it covers the design, the stack, the folder layout
and the two content files that drive every page. **`docs/PROGRESS.md`**
records why specific decisions were made; read it before "simplifying" any
motion code, because several things that look redundant are load-bearing.

## Working with the owner

- **Concepts and a skeleton come before any visual design or code**, and one
  page is finished before the next starts. The home page is done in v3; the
  case-study page redesign (walkthrough player with chapters) is next.
- **Never mention Kodexa anywhere on the site**: copy, alt text, covers,
  videos, metadata or source comments. Hide its wordmark when recording a
  project that carries it (owner's rule, 2026-10-01).
- Covers and walkthroughs are captured from live sites or local builds. For
  apps behind a login, ask the owner for a demo account or `.env.local`; never
  commit either.

## Repository conventions

These match the rest of the owner's repositories. Follow them rather than
framework defaults:

- **No `src/` directory.** `app/` sits at the repository root.
- **Underscore-prefixed private folders** inside `app/`: `_components`, `_lib`,
  `_data`, `_styles`, `_assets`. Next.js excludes these from routing.
- **Components grouped by feature**, not by type: `_components/home/`,
  `_components/layout/`, `_components/motion/`, `_components/shared/`, plus
  `_components/ui/` for shadcn primitives.
- **Plain JavaScript**, not TypeScript. `jsconfig.json` provides the `@/*`
  alias; import as `@/app/_components/...`.
- **Tailwind v4 via `@tailwindcss/postcss`** with `@theme` tokens in
  `app/_styles/globals.css`. There is no `tailwind.config.js` and one should not
  be added.
- Flat `eslint.config.mjs`, `next.config.mjs`, `postcss.config.mjs`.
- `CLAUDE.md` is a one-line `@AGENTS.md` include.
- **No em or en dashes anywhere**, code comments and docs included, and no
  filler words. Run the kodexa-builder `slop_scan.py` before committing UI.

## shadcn/ui

`components.json` points the CLI at this layout: `tsx: false`, components at
`@/app/_components`, ui at `@/app/_components/ui`, utils at `@/app/_lib/utils`.
`npx shadcn@latest add <component>` lands files in the right place. Every ui/
component keeps its shadcn source shape and its `cn()` import: do not
hand-restyle them; pass classes at the call site instead.

The colour tokens in `globals.css` keep shadcn's variable names
(`--color-primary`, `--color-muted-foreground`, ...) so a freshly added
component is styled correctly with no rewiring. House tokens: `ink`,
`ink-raised`, `panel`, `ink-line`, `bone`, `bone-dim`, `tungsten`.

## Content lives in data files, not components

Projects are Fiverr deliveries in `app/_data/deliveries.json`, normally
written by the upload page (`/upload`), which commits the order's code to
`deliveries/<slug>/` and the entry in one commit through the GitHub API with a
token the owner pastes in. `app/_data/projects.js` reads that file, fills
defaults and falls back to three placeholders while it is empty. Each entry
generates its index row, its spread when `featured`, its place in the hero
reel and its case-study page via `generateStaticParams`. Never hard-code a
project into a component, and never create a route by hand under `app/work/`.

`deliveries/` is client code, not this site: ESLint ignores it and
`globals.css` excludes it from Tailwind's source scan (`@source not`). Keep
both when touching those files.

Site-level copy (name, headline, intro, about, nav, services, process, stack,
FAQ, hero film, WhatsApp number) lives in `app/_lib/siteConfig.js`. The proof
strip's `stats` are computed from the project list; do not type numbers in.

## Things most likely to bite you

- **Never set `overflow-x: hidden` on `html` or `body`.** On those elements it
  computes `overflow-y` to `auto`, which makes them a scroll container and stops
  ScrollTrigger finding the real scroller. Every scroll reveal on the page then
  stays stuck at `opacity: 0`. Use `overflow-x: clip`, which is already set.
- **`[data-reveal]`, `[data-hero-fade]` and `[data-stagger] > *` are pre-hidden
  at `opacity: 0` in CSS.** GSAP fades them in from an effect that runs after
  first paint, so without the pre-hide there is a visible flash. If you remove
  the GSAP that reveals them they stay invisible forever. The `<noscript>`
  block in `app/layout.js` is the no-JS safety net and must be kept in sync
  with the selector list.
- **Lenis is driven from GSAP's ticker** (`SmoothScroll.jsx`) and calls
  `ScrollTrigger.update` on scroll. Keep `anchors` and `stopInertiaOnNavigate`
  on, or in-page links land wherever the glide was heading. It never starts
  under reduced motion.
- **`MagneticButton` puts its transform on a wrapper, not on the Button.**
  With `asChild`, Radix's Slot clones the first child, so a motion element
  inside the Button would end up wrapping the real `<a>` and leave only the
  text clickable.
- **Never call `setState` on a scroll or pointer frame.** The counters and the
  hero timecode write `textContent` through refs. The hero reel's cut is
  state, but it changes every 2.8 seconds, not every frame.
- **The hero headline is sized by the tighter of width and height**
  (`--text-display`). Check 1440x768 after any change to the hero: the
  "See the work" button must stay above the fold.
- **`.display` is Anton in capitals.** Anton is condensed: anything set in it
  runs much wider in letters than it looks, so check long project names at
  390px.
- **Reduced motion degrades to the *final* state, never to a faster tween.**
  Every animation checks `prefersReducedMotion()` from `app/_lib/gsap.js`.

## Verifying a change

There is no test suite. Verify visually:

```bash
npm run build && npm run start   # then drive it with Playwright
```

Chromium is preinstalled at `/opt/pw-browsers/chromium-*/chrome-linux/chrome`.
Check at **1440x900 and 1440x768** (the short viewport is where the hero CTA
falls below the fold first), at **390x844**, and with **reduced motion forced
on**: nothing may be left at `opacity: 0`, nothing may scroll sideways, and
the console must be clean.

When scripting the check, scroll with `behavior: "instant"`. The page sets
`scroll-behavior: smooth`, and a queue of smooth scrolls never lands where the
loop thinks it does, which makes working reveals look broken.
