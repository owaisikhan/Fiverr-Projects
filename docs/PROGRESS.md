# Progress & decisions

Why things are built the way they are. Read this before "simplifying" the
motion code, several things that look redundant are load-bearing.

## v3: the "Cutting Room" redesign (2026-10-01)

How it was decided: the owner asked for concepts, a design language and a
greyscale skeleton before any design or code. Three directions were shown
(A "Day Book", light and ledger-like, recommended; B "Cutting Room", dark and
film-led; C "Re-tune", today's layout reskinned). The owner picked **B** and
asked to build it straight away, skipping a separate visual-design round. The
skeleton (nine blocks, Meridian removed at the owner's request) was kept as
the structure.

What changed and why:

- **Palette.** Acid lime on near-black was the look most AI-built developer
  portfolios land on. v3 is true neutral black, bone white and one tungsten
  amber that only marks timecodes, scene numbers and the REC light. The
  gradient headline text (`fade-text`), the hero grid backdrop and the accent
  "bloom" glows are gone for the same reason.
- **Type.** Anton in capitals for display, self-hosted so the build never
  reaches a font CDN; Geist stays for text and labels.
- **Hero.** The terminal card became `HeroMonitor`, a camera-style frame with a
  running timecode. It plays `siteConfig.heroVideo` once the owner supplies the
  film; until then it cuts between the featured projects' covers or slates.
- **Work.** Sixteen projects do not fit as cards, so the six featured ones get
  spreads and every project gets a numbered index row with a category filter.
  The filter is a small external store (`_lib/indexFilter.js`) so the Services
  rows can preselect it.
- **Slates.** Projects without a screenshot show a clapperboard whose fields
  are real data, so a missing cover still reads as deliberate.
- **Removed:** the custom cursor ring and the tilt spotlight cards (both read as
  template and cost frames on phones), the tech marquees, and separate
  Process and Stack sections (merged into About).
- **Lenis** smooth scroll added, driven from GSAP's ticker.
- **Copy** rewritten without em or en dashes or filler words, leading with what
  a business gets.
- **Proof strip** numbers are computed from `projects.js`.

Covers captured so far (Playwright, 1600x1000): Kinari Tea House, the espresso
bar site and AI Try-on Store from local builds, Roaster from its live site.

### Hero film and walkthroughs (same day)

The owner sent two reference reels (a 9:16 Vendrix store reel and a 16:9 pump
manager reel) and asked for a hero video that shows several projects in one.
The hero is an 18 s montage: Vendrix, Searline (burger site), the pump
manager, Kinari, Casa Verde and the espresso bar site, each a 3.4 s
frame-exact scroll recording from a local build with one caption, joined by
0.4 s cross-fades, with the last 0.4 s cross-faded into the first so the loop
has no seam. Folio, SAAMJ and Pharmacy POS are not in it yet: SAAMJ's two
Supabase projects are paused, Pharmacy POS needs a login, and Folio's live
site only shows its empty state. The owner is sending logins.

The full Vendrix reel became that project's walkthrough (Vendrix was added as
a client project), and the pump reel became the Offline Petrol Pump
Manager's walkthrough with its end card trimmed. **The owner asked that
Kodexa is not mentioned anywhere on the site**: the end cards were cut, the
"Kodexa House" project is listed as "Espresso Bar and Roastery" with a cover
cropped below its nav, and its clip was recorded with the wordmark hidden.

Gotchas: three.js sites need Chromium's `--use-angle=swiftshader
--enable-unsafe-swiftshader` and render slowly in software, so the Kinari clip
was recorded at 1x and upscaled. Playwright's Chromium here does not trust the
egress proxy's certificate for live HTTPS sites, so clips are recorded from
local builds. A 16:9 walkthrough in a 16:10 frame crops its sides, so
`VideoLoop` anchors to the left, where app sidebars sit. The rest
show slates until the owner provides demo logins or `.env.local` files for the
apps behind sign-in. The Sohana POS demo URL failed through this sandbox's
proxy; it may work from a normal network. In Supabase on 2026-10-01 the two
SAAMJ projects were paused (INACTIVE); Pharmacy-POS and Mubeen Petroleum were
active.

Verified: build and lint clean, 20 routes prerendered; at 1440x900, 1440x768
and 390x844, with and without reduced motion: the hero CTA is above the fold,
no element is left below opacity 0.05 after a scroll-through, no sideways
scroll, no console output.

Next: the case-study page (walkthrough player with chapters, screenshot
gallery), the hero film once the reference arrives, the remaining covers.

## Fiverr deliveries (2026-10-02)

The owner moved the site to Fiverr work only: every earlier project, its
covers, its walkthroughs and the hero film (cut from those projects) were
removed. Three placeholders hold the layout until the first upload and drop
out on their own once `deliveries.json` has an entry.

Why the upload page works the way it does:

- **Browser to GitHub, no server.** The site stays static, so `/upload` talks
  to the GitHub REST API directly with a fine-grained token the owner pastes
  in. A visitor without a token can do nothing, and no secret sits in the
  build or in Vercel.
- **One commit per delivery** through the Git Data API (ref, tree, commit,
  ref update with `force: false`), so code, cover and entry land or fail
  together, and a concurrent push makes it fail rather than overwrite.
- **Text inline in trees, binaries as blobs.** GitHub caps content-creating
  requests at about 80 a minute, so one blob per file would stall a normal
  project. Text files ride inside tree requests in 4 MB chunks; only binary
  files cost one request each. Rate-limit responses are retried after
  `Retry-After`.
- **`deliveries/` is fenced off** from ESLint and from Tailwind's source scan,
  or a client's class names would bloat this site's stylesheet.
- **The proof strip hides at zero.** A row of zeros proves nothing to a
  client; it reappears with the first delivery.

A delivery marked private on upload gets `isPrivate: true` and no source
link: the case study offers a walkthrough call instead.

## Design direction (v2, superseded by v3 above)

Modelled on the dark developer-showcase template genre the site was briefed
against: near-black ground, one signature accent, hairline borders, oversized
display type, a floating pill nav, a tech marquee, numbered service cards, a
timeline, an FAQ accordion, and the name set as large as the viewport allows
across the footer.

The reference site itself could not be loaded, this environment's egress proxy
blocks `webflow.io`, so the layout was built from the conventions of that
genre rather than copied section for section. If the visual direction needs to
track the reference more literally, that is the thing to re-check first.

Two deliberate departures:

- **No portrait.** The brief said not to use a photo at this stage, so the slot
  a template fills with a headshot holds `TerminalCard`, a terminal transcript
  that types itself out. It carries the same information a bio photo block
  would (who, stack, shipped work, availability) and suits a developer
  portfolio better than a placeholder avatar.
- **No testimonials section.** The genre expects one, but there are no real
  client quotes to put in it and inventing them would be fabricating a record.
  The slot is spent on `Process` instead, which is honest and does similar work
  in the page rhythm.

## Motion architecture

GSAP and Motion are split by what they are each good at, not used
interchangeably:

- **GSAP + ScrollTrigger** owns anything driven by scroll position or by a
  timeline: reveals, staggers, the kinetic headline mask, the terminal type-on,
  the process spine draw, the stat counters, the hero parallax.
- **Motion** owns anything driven by the pointer or by presence: magnetic
  buttons, tilt cards, the cursor ring, the scroll progress spring, the mobile
  menu's enter/exit.

`app/_lib/gsap.js` is the single plugin registration point. Import `gsap` from
there, never from the package, so ScrollTrigger is guaranteed registered.

## Bugs found while building v2, and what they cost

Some of the components below (`TerminalCard`, `TiltCard`, `fade-text`) were
removed in v3; the lessons still apply.

These are the non-obvious ones. Each was found by rendering the page, not by
reading the code.

### `overflow-x: hidden` on `body` broke every scroll reveal

Symptom: every `[data-reveal]` and `[data-stagger]` element stayed at
`opacity: 0` forever, while the hero's plain timeline animations worked fine.

Cause: on `html`/`body`, `overflow-x: hidden` computes `overflow-y` to `auto`.
That turns the element into a scroll container and ScrollTrigger can no longer
identify the real scroller, so no trigger ever fires. Nothing errors.

Fix: `overflow-x: clip` on both. It trims the same overflow without creating a
scroll container. **Do not change this back.**

### `tailwind-merge` silently dropped a display font size

The case-study `<h1>` rendered at body size. The class list was
`text-headline max-w-4xl font-semibold text-fade`, passed through `cn()`.
`tailwind-merge` classifies `text-fade` as a font-size utility, decides it
conflicts with `text-headline`, and keeps only the last one.

Fix: the custom utility was renamed out of the `text-*` namespace to
`fade-text`. Do not rename it back.

### `asChild` swallowed the magnetic button's wrapper

`MagneticButton` originally wrapped the Button's *children* in a `motion.span`
for a label parallax effect. With `asChild`, Radix's Slot clones its single
child, which was that span, so the rendered pill was a span and the real
`<a href>` ended up nested inside it. Only the text was clickable, and the
Button's `whitespace-nowrap` never reached the label, so "See the work" wrapped
onto two lines.

Fix: the transform moved to a wrapper *outside* the Button, leaving `asChild`
free to make the anchor the button. The label parallax was dropped; it was not
worth a broken hit area.

### A GSAP context scoped to a ref that was never attached

`TerminalCard` held a `ref` that was never placed on an element, because
`TiltCard` is a motion component and does not forward refs. The effect hit
`if (!el) return` and the card rendered permanently empty, no error, no
warning. The scope now lives on an inner element that is an ancestor of every
animated line.

### The verification harness lied before the page did

The first automated pass reported reveals as broken when they were not: the
script scrolled with `window.scrollTo(0, y)` in a loop while the page sets
`scroll-behavior: smooth`, so the queued smooth scrolls never landed where the
loop assumed. Scripted checks must use `behavior: "instant"`.

A stale `next start` also served HTML referencing a CSS chunk from a previous
build, which surfaced as a phantom 500. Rebuild and restart the server together
before trusting a visual check.

## Accessibility decisions

- `KineticHeading` splits a heading into per-line masked spans. The spans are
  `aria-hidden` and the whole phrase is exposed once in an `sr-only` copy, so a
  screen reader hears one sentence rather than a list of fragments.
- `TerminalCard` writes into empty spans, which are invisible to assistive tech
  until the timeline runs, so the finished transcript is exposed once up front
  and the animated lines are `aria-hidden`.
- `Marquee` renders its item list twice for a seamless loop; the second copy is
  `aria-hidden`.
- The footer's oversized name is decorative and `aria-hidden`, the accessible
  name of the site is already in the header and in `<title>`.
- `Cursor` renders nothing at all on coarse pointers or under reduced motion,
  via `useSyncExternalStore` so the server snapshot matches first client paint.
- There is a skip link, and `scroll-padding-top` keeps the floating nav from
  covering an anchored section heading.

## Verified

Built and driven with Playwright against the production build at 1440x900,
1440x768 and 390x844, plus a reduced-motion pass. Checks: no console errors, no
element left below `opacity: 0.05` after a full scroll-through, no horizontal
overflow, and the hero CTA is a single-line anchor with a full-size hit area.
`npm run lint` and `npm run build` are clean; all 11 routes prerender.

## Not done yet

- No Open Graph image. `opengraph-image.js` would need a design pass.
- `metadataBase` is a placeholder (`https://owaiskhan.dev`), set it to the
  real domain before launch or social cards will resolve against the wrong
  host.
- No sitemap or `robots.txt`.
- The reference site was never loadable from this environment, so the visual
  direction is genre-accurate rather than reference-exact.
