# Owais Khan: Portfolio (v3, "Cutting Room")

A dark, film-led portfolio shown to prospective clients. It lists 2026 work
drawn from the repositories I own or build in, with a case-study page per
project.

Home page, top to bottom: hero with a camera-style monitor, a strip of four
counts, selected work (six feature spreads), the full filterable index,
services, about with process and tools, FAQ and contact. Each project also
gets `/work/[slug]`.

## Design: Cutting Room

The site is an edit suite for the work: true neutral black, bone white type,
and one tungsten amber used only for timecodes, scene numbers and the REC
light. Display type is **Anton** in capitals; text is **Geist**; labels and
timecodes are **Geist Mono**. Sections open like slate calls (`SC 01`), the
featured spreads are numbered as takes, and any project without a captured
screenshot shows a clapperboard **slate** whose fields are real (PROD is the
project, SCENE its category, TAKE its platform, ROLL its year).

## Stack

- **Next.js 16** (App Router, Turbopack, `app/` at the repository root, no `src/`)
- **React 19**
- **Tailwind CSS v4**: design tokens declared with `@theme` in
  `app/_styles/globals.css`, no `tailwind.config.js`
- **shadcn/ui**: Button, Card, Badge, Accordion, Separator, in
  `app/_components/ui/`, configured for plain JS via `components.json`
- **GSAP + ScrollTrigger**: reveals, staggers, the kinetic headline, the stat
  counters, the hero monitor drift
- **Motion**: magnetic button, scroll progress bar, mobile menu
- **Lenis**: smooth scroll, driven from GSAP's ticker
- **Anton** (self-hosted from `app/_assets/fonts`, OFL), **Geist Sans / Mono**
  through the `geist` package
- Plain JavaScript with `jsconfig.json` path aliases (`@/*`), flat
  `eslint.config.mjs`

No database, no environment variables, no API routes. Media: project covers in
`public/work`, the hero film and walkthroughs in `public/media`.

## Project structure

```
app/
  _assets/fonts/  Anton (woff2 + OFL licence)
  _components/
    layout/   Navbar, Footer
    home/     Hero, HeroMonitor, Proof, Work, WorkIndex, Services,
              ServiceProjectsLink, About, Faq, Contact
    motion/   Reveal, StaggerGroup, KineticHeading, MagneticButton,
              Counter, ScrollProgress, SmoothScroll
    shared/   SectionHeading, ProjectCover, Slate, WhatsAppIcon
    ui/       shadcn primitives (button, card, badge, accordion, separator)
  _data/      projects.js    (every project shown on the site, and categories)
  _lib/       siteConfig.js  (name, copy, nav, services, process, stack, FAQ, stats)
              indexFilter.js (the work index's category filter store)
              gsap.js        (plugin registration + reduced-motion helper)
              utils.js       (cn())
  _styles/    globals.css    (@theme tokens and global rules)
  work/[slug]/page.js        (case-study pages, statically generated)
public/work/                 (project covers, 1600x1000)
docs/PROGRESS.md             (why things are built the way they are)
```

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run lint
```

## Editing content

Everything visitor-facing lives in two files:

- **`app/_lib/siteConfig.js`**: name, availability, headline, intro, about,
  nav, services, process, stack, FAQ, the hero film and the WhatsApp number.
  The four counts in `stats` are computed from the project list.
- **`app/_data/projects.js`**: the project list. Each entry drives its index
  row, its spread (when `featured`), the hero reel and its case-study page.

### Project fields

| Field | Purpose |
| --- | --- |
| `slug` | URL segment for `/work/[slug]` |
| `name`, `tagline`, `summary` | Index row, spread and case-study header |
| `problem`, `approach`, `outcome` | The three case-study body sections |
| `highlights` | Bullet list on the case study |
| `improvements` | "What I would improve next" on the case study |
| `stack` | Chips; the first three show on a spread |
| `category` | One of `categories` (business, offline, commerce, sites); drives the index filter and the service counts |
| `platform` | Short label: Web, Windows, Android, Web + Windows |
| `featured` | `true` puts the project in the six spreads and the hero reel |
| `worksOffline` | `true` when it runs with no internet at all; counted in the proof strip |
| `cover` | `{ src, alt }` under `/work/`, or `null` to fall back to the walkthrough poster, then the slate |
| `walkthrough` | `{ src, webm, poster, duration, chapters }` or `null`; plays as a loop on the spread and case study (chaptered player comes with the case-study redesign) |
| `links` | `[{ label, href }]`; **leave empty for private client work** |
| `isPrivate` | Adds the lock and swaps the links for a "walk through it on a call" note |
| `accent` | The project's colour, used for its slate stripes and highlight ticks |
| `kind`, `role`, `year` | Metadata on the case study |

The header comment in `projects.js` records which repositories were considered
and why each is in or out. Keep it current when the list changes.

### Covers

Covers are 1600x1000 JPEG or WebP screenshots in `public/work/<slug>.jpg`,
captured from the live site or a local build with Playwright at a 1600x1000
viewport. Set `cover` on the project and the slate disappears everywhere.

### Videos

- **Hero film** (`public/media/hero.*`): an 18 s silent loop at 1280x800 cut
  from six projects, 3.4 s each with 0.4 s cross-fades and a cross-faded loop
  point so it has no visible seam. Each clip was recorded frame-exactly from a
  local build with the kodexa-reels `scrollrec.js` (1024x640 at 1.5625x) and
  captioned in the same banner style. `siteConfig.heroVideo` points at it; set
  `src` to null and the monitor falls back to a reel of featured covers.
- **Walkthroughs** (`public/media/<project>.*`): set `walkthrough` on a project
  and its spread and case study play it as a silent loop that only runs while
  on screen (`VideoLoop`). Under reduced motion only the poster shows.
- Keep each file under about 3 MB: H.264 CRF 27 plus VP9 CRF 41, no audio,
  `+faststart`.

## Motion notes

- **Reduced motion is respected throughout.** Every animation checks
  `prefers-reduced-motion` and degrades to the *final* state. Lenis does not
  start, the timecode stays at zero and the reel holds on its first card.
- **Reveal elements are pre-hidden in CSS** so GSAP can fade them in without a
  flash. A `<noscript>` block in `app/layout.js` puts them back.
- **Frame-rate updates write to the DOM directly**, not through React state:
  the counters and the hero timecode.
- **`html` uses `overflow-x: clip`, never `hidden`.** See `docs/PROGRESS.md`.

## Deployment

A standard Next.js app with no server-side data dependencies. Every route is
prerendered, so it deploys as-is to Vercel or any static host.
