# kodexa-builder learnings

This file is how this repo teaches the kodexa-builder skill. Every session
that loads the skill reads it first and appends to it as the user corrects,
reverses or chooses things. Entries promoted into the skill are marked with
the version they landed in. See the skill's `references/self-improvement.md`
for the rules.

- **Project:** Jhon portfolio, Fiverr deliveries (v3 "Cutting Room")
- **Type:** marketing-site (personal portfolio)
- **Who reads it daily:** prospective clients, mostly small-business owners, on a phone or laptop
- **Palette exceptions:** none
- **Skill version when started:** 1.4.0

## Summary

| ID | Date | Kind | Lesson (short) | Scope | Status |
|---|---|---|---|---|---|
| L-001 | 2026-10-01 | rule | Redesign starts with concepts, design language and a skeleton, agreed before any visual design or code | all | logged |
| L-002 | 2026-10-01 | gap | Portfolio projects carry a cover image on the home page and a walkthrough video on the case study | type: marketing-site | logged |
| L-003 | 2026-10-01 | choice | Meridian Digital Consulting comes off the portfolio | project | project |
| L-004 | 2026-10-01 | choice | Owner picked the dark film-led "Cutting Room" over the recommended light ledger concept | type: marketing-site | logged |
| L-005 | 2026-10-01 | rule | Once a direction is picked on the skeleton, build it; no separate visual-design round | all | logged |
| L-006 | 2026-10-01 | rule | For screenshots and walkthroughs of apps behind login, ask the owner for demo logins or .env.local up front | all | logged |
| L-007 | 2026-10-01 | rule | This portfolio never mentions Kodexa: no end cards, wordmarks or names | project | project |
| L-008 | 2026-10-01 | choice | Portfolio hero video is a multi-project montage in the reel caption style, fitted to the hero's aspect | type: marketing-site | logged |
| L-009 | 2026-10-02 | reversal | Portfolio now shows Fiverr deliveries only; all earlier projects removed, placeholders until the first upload | project | project |
| L-010 | 2026-10-02 | gap | Owner wants to publish work from the site itself: an upload page that commits a folder to the repo | type: marketing-site | logged |
| L-011 | 2026-10-02 | reversal | Owner dropped the browser upload page for "send a repo link, Claude adds it with details and screenshots" | type: marketing-site | logged |

## Entries

### L-001 · 2026-10-01 · strong · rule
- **Said / saw:** "Before you render the design, before you develop it, first show me the possible concepts. Tell me what design language you're going to use and what design system you're going to use. First create a skeleton and show it to me. We'll agree on the skeleton first, then we'll go ahead and create the actual design." and "First, we'll finalize one page."
- **Context:** portfolio-2 redesign request (new projects, hero video, project media)
- **Lesson:** For a redesign or new site, the first deliverable is 2 to 3 named concepts (palette, type pairing, one-line rationale each), the design system plan, and a greyscale skeleton of one page. No visual design or code until the user agrees the skeleton; then finish one page before starting the next.
- **Scope:** all projects
- **Target in skill:** references/types/marketing-site.md, section 8 "Redesigns and variants"
- **Status:** logged

### L-002 · 2026-10-01 · medium · gap
- **Said / saw:** "for each project shipped also add an image on the home page and in the detail page add a walk through video of the site/product and suggest improvements too"
- **Context:** portfolio-2, project data model
- **Lesson:** Portfolio project entries need a cover image (home grid) and a walkthrough video with chapters (case study), plus a "what I would improve next" list. Plan the data fields (`cover`, `walkthrough`, `improvements`) at skeleton stage so the layout reserves space for them.
- **Scope:** type: marketing-site (portfolios)
- **Target in skill:** references/types/marketing-site.md, section 7 "Content, pages and SEO"
- **Status:** logged

### L-003 · 2026-10-01 · medium · choice
- **Said / saw:** "remove this project" (artifact comment on the Meridian Digital Consulting row of the skeleton's work index)
- **Context:** portfolio v3 skeleton, project list
- **Lesson:** Meridian Digital Consulting is not shown on this portfolio. Remove its entry from `app/_data/projects.js` in the v3 build and record it as "out, owner's call" in that file's header ledger.
- **Scope:** project
- **Target in skill:** none (project content)
- **Status:** project

### L-004 · 2026-10-01 · strong · choice
- **Said / saw:** "go with this design and build" (artifact comment on "B · Cutting Room"; A "Day Book" was marked Recommended)
- **Context:** portfolio v3 concepts: A light ledger, B dark film-led edit suite, C reskin of v2
- **Lesson:** For this owner's own portfolio, a media-first dark direction beat the light editorial one even when the work is mostly business software. When the brief includes a hero video and per-project walkthroughs, offer a media-first concept and do not assume light wins because the clients are small businesses.
- **Scope:** type: marketing-site (portfolios)
- **Target in skill:** references/types/marketing-site.md, section 3 "Design direction"
- **Status:** logged

### L-005 · 2026-10-01 · strong · rule
- **Said / saw:** "go with this design and build", in reply to a skeleton that listed "stage 2: home page visual design" before the build
- **Context:** portfolio v3 planning sheet
- **Lesson:** The concept and skeleton round is the approval gate. Once the owner picks a direction on it, build the page directly in that direction rather than producing a separate static design round; iterate on the built page with screenshots.
- **Scope:** all projects
- **Target in skill:** references/types/marketing-site.md, section 8 "Redesigns and variants" (refines L-001)
- **Status:** logged

### L-006 · 2026-10-01 · medium · rule
- **Said / saw:** "ask me if any project database is paused or you need .env.local to access the site, i will send it,, even the login details for this screen capture purpose"
- **Context:** capturing covers and walkthroughs for 16 projects, most behind Supabase sign-in
- **Lesson:** Before capturing screenshots or walkthroughs of apps behind a login, check database status (Supabase list_projects) and ask the owner in one message for the exact demo logins or env files needed, per project. Prefer a demo account with sample data; never commit credentials.
- **Scope:** all projects
- **Target in skill:** SKILL.md section 3 "Working style"
- **Status:** logged

### L-007 · 2026-10-01 · strong · rule
- **Said / saw:** "but donot mention kodexa anywhere,"
- **Context:** portfolio-2 hero film and walkthroughs; the source reels ended on the Kodexa end card
- **Lesson:** On the owner's personal portfolio, Kodexa does not appear at all: trim reel end cards, hide wordmarks when recording (text-node walker), rename projects that carry the name, and keep it out of source comments.
- **Scope:** project
- **Target in skill:** none (project rule, recorded in AGENTS.md)
- **Status:** project

### L-008 · 2026-10-01 · strong · choice
- **Said / saw:** "The hero video should contain multiple projects shown in one video ... gather multiple clips like these for a hero video" and "like the reference provided but to fit the aspect ratio of hero video section"
- **Context:** portfolio hero; references were the 9:16 Vendrix and 16:9 pump reels
- **Lesson:** A portfolio hero film is a montage of 3 to 4 s clips from several products, each with one reel-style caption, re-recorded at the hero's own aspect (not letterboxed phone footage), cross-faded, with a seamless loop point and no end card. kodexa-reels scrollrec.js with VIEW=1024x640 DSF=1.5625 gives 1600x1000 desktop frames; WebGL sites need swiftshader flags and DSF 1.
- **Scope:** type: marketing-site (portfolios)
- **Target in skill:** kodexa-reels references/recipes.md (new recipe: hero montage), kodexa-builder marketing-site.md section 5 "Video heroes"
- **Status:** logged

### L-009 · 2026-10-02 · strong · reversal
- **Said / saw:** "clean the repo from all the listed projects that i have done uptill now off the platform ... from now on in the future i will upload the projects that i actually deliver on the fiverr platform"
- **Context:** Fiverr-Projects copy of the v3 portfolio
- **Lesson:** This site shows Fiverr deliveries only. Earlier projects, covers, walkthroughs and the hero film were removed; Project 1, 2 and 3 placeholders stand in until `deliveries.json` has an entry. Copy that named old projects (intro, FAQ) was rewritten generically.
- **Scope:** project
- **Target in skill:** none (project content)
- **Status:** project

### L-010 · 2026-10-02 · medium · gap
- **Said / saw:** "an upload button that will push and upload the folder/code to the fiverr-projects repo right from the website ... it should take the project name description etc"
- **Context:** static portfolio, no API routes or env
- **Lesson:** A static portfolio can publish its own entries: a client page that takes a fine-grained GitHub token, reads a picked or dropped folder, and makes one Git Data API commit (code folder, cover, JSON entry). Send text files inline in tree requests and only binaries as blobs, because GitHub caps content-creating requests at about 80 a minute. Fence the committed code off from ESLint and Tailwind's source scan.
- **Scope:** type: marketing-site (portfolios)
- **Target in skill:** references/types/marketing-site.md, section 7 "Content, pages and SEO"
- **Status:** logged

### L-011 · 2026-10-02 · strong · reversal
- **Said / saw:** "i think the claude session method is better i will give a project repo link and u will upload the project with all the details and screenshots , add this to your memory for this project , remove the upload button from the site"
- **Context:** the /upload page (token-based GitHub commit from the browser) hit a fine-grained token permission error on first real use
- **Lesson:** For a portfolio the owner feeds over time, prefer "owner sends a repo link, a Claude session adds the entry, cover and code" over a self-serve upload form. The session writes better copy and takes real screenshots, and the owner never handles tokens. Record the routine in the repo's AGENTS.md so every session follows it. Refines L-010.
- **Scope:** type: marketing-site (portfolios)
- **Target in skill:** references/types/marketing-site.md, section 7 "Content, pages and SEO"
- **Status:** logged
