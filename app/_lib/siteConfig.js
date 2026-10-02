import { projects } from "@/app/_data/projects";

/**
 * Everything visitor-facing that is not a project lives here. Components read
 * from this file; none of this copy should be typed into a component.
 *
 * Copy rules: no em or en dashes anywhere,
 * no filler words, and say what a business gets before naming the stack.
 */
export const siteConfig = {
  name: "Owais Khan",
  shortName: "Owais",
  initials: "OK",
  role: "Full-Stack Product Engineer",
  location: "Pakistan, working remotely",
  email: "owasikhan22@gmail.com",
  github: "https://github.com/owaisikhan",
  /**
   * WhatsApp number in international format with no plus or spaces, e.g.
   * "923001234567". Leave null and the WhatsApp buttons are not rendered.
   * PLACEHOLDER: waiting on the owner.
   */
  whatsapp: null,
  availability: "Available for client work",

  /* Hero -------------------------------------------------------------------- */
  headline: ["Software", "businesses", "actually run on."],
  intro:
    "I build the software a business runs its day on: a petrol pump's books on one laptop with no internet, a pharmacy counter, a hospital ledger, a wholesaler's billing on one phone. Then the stores, AI features and brand sites around them.",

  /**
   * Hero film: a 16:10 silent 18 s loop under /public/media, cut from six
   * projects (Vendrix, Searline, the pump manager, Kinari, Casa Verde and the
   * espresso bar site). Set `src` to null and the hero monitor plays a reel of
   * the featured projects' covers instead.
   */
  heroVideo: {
    src: "/media/hero.mp4",
    webm: "/media/hero.webm",
    poster: "/media/hero-poster.jpg",
    caption: "Showreel 2026",
    detail: "Six products",
  },

  /* About ------------------------------------------------------------------- */
  about: [
    "Most of what I build is not a landing page. It is software that has to be right on a Tuesday afternoon while someone counts cash, reconciles stock or bills a shop on credit. So I care more about the boring parts than the pretty ones: data that cannot go wrong, what happens when the network drops, and a screen the person at the counter can use without training.",
    "I work mostly in Next.js with React and Postgres, and package products for Windows with Electron or for Android with Expo when a business needs to own its software rather than rent it. When a project calls for AI, I keep it grounded: read-only database roles, retrieval over real documents, and answers that say so when they do not know.",
  ],

  nav: [
    { href: "/#work", label: "Work" },
    { href: "/#services", label: "Services" },
    { href: "/#about", label: "About" },
    { href: "/#contact", label: "Contact" },
  ],

  /* Services ---------------------------------------------------------------- */
  /* `category` links a service to the projects that prove it (projects.js). */
  services: [
    {
      category: "business",
      title: "Business software on the web",
      body: "Point of sale, ledgers, stock, credit and reports, with the money rules enforced in the database so a wrong number cannot get in through a side door.",
      points: ["Ledgers and khata", "Staff and owner roles", "Daily cash close"],
    },
    {
      category: "offline",
      title: "Desktop and Android apps",
      body: "Software that installs like a normal program or app and keeps working with no internet: a bundled database, licence keys, backups and updates.",
      points: ["Windows with Electron", "Android with Expo", "Bluetooth receipt printing"],
    },
    {
      category: "commerce",
      title: "Stores and AI features",
      body: "Storefronts with a real admin side, and AI that answers from your own catalogue or documents behind hard limits on what it can read.",
      points: ["Store and admin panel", "Ask-the-store chat", "Answers from your documents"],
    },
    {
      category: "sites",
      title: "Brand sites and 3D",
      body: "Sites that show the product moving: scroll-driven 3D, video scrubbed frame by frame, and ordering that lands in WhatsApp.",
      points: ["three.js and WebGL", "Scroll-scrubbed video", "Order on WhatsApp"],
    },
  ],

  /* Process ----------------------------------------------------------------- */
  process: [
    {
      title: "Understand the numbers",
      body: "Before any code, I work out which figures have to reconcile and what the business already does by hand. Most product bugs are really a misunderstood rule.",
    },
    {
      title: "Model the data first",
      body: "Constraints go in the database, not the form. If a value cannot legally exist, the database is what says so, not one particular screen.",
    },
    {
      title: "Ship a usable slice",
      body: "A narrow path that works end to end beats a broad one that half works. You get something real to react to early, and changing direction stays cheap.",
    },
    {
      title: "Check against reality",
      body: "Totals checked against the cash in the drawer, indicators against TradingView, screens by rendering them on a phone. Output, not assumptions.",
    },
  ],

  /* Stack ------------------------------------------------------------------- */
  stack: [
    { group: "Web", items: ["Next.js 16", "React 19", "Tailwind CSS v4", "shadcn/ui", "Recharts"] },
    { group: "Data", items: ["PostgreSQL", "Supabase", "SQLite", "Redis", "pgvector"] },
    { group: "Apps", items: ["Electron", "Expo", "React Native", "electron-builder"] },
    { group: "AI and motion", items: ["Claude", "Gemini", "LangGraph", "GSAP", "three.js"] },
  ],

  /* FAQ --------------------------------------------------------------------- */
  faq: [
    {
      q: "Why can't I see the code for some of these projects?",
      a: "A few are private client repositories, among them the petrol pump systems and the SAAMJ store. Linking them would send you to a 404. I'm happy to walk through the code, the database and the trade-offs on a call.",
    },
    {
      q: "Do you work alone or with a team?",
      a: "Both. Most of the work here is built as a two-person team: we take a project from an empty repository to a shipped product together, splitting the build rather than passing tickets back and forth. Some, like Folio and this site, I built on my own.",
    },
    {
      q: "Can you build something that runs without the internet?",
      a: "Yes, and I have shipped three. The Offline Petrol Pump Manager installs like a normal Windows program with its own database inside. Sohana POS runs a wholesaler's billing on one Android phone. The Committee Manager does both.",
    },
    {
      q: "How do you handle AI features safely?",
      a: "The security boundary is never the prompt. Model-written SQL runs through a database role that can only read the catalogue tables, behind a guard that rejects anything but a single read-only query. Orders, addresses and profiles stay out of reach whatever the model writes.",
    },
    {
      q: "What does a project usually start with?",
      a: "A call about the numbers the business already tracks by hand, then a short written scope with a first slice we can ship and react to. I would rather correct direction in week one than in month three.",
    },
    {
      q: "What's your stack, and can you work in mine?",
      a: "My default is Next.js with React, Tailwind and Postgres or Supabase, packaged with Electron or Expo when it needs to run on the device. I have also shipped in Vite, Redux Toolkit, TanStack Query and Python with FastAPI, so an existing codebase is not a problem.",
    },
  ],
};

/**
 * Proof strip. Every figure is counted from projects.js, so adding a project
 * updates the numbers and they cannot drift from the work shown below them.
 */
const platformFamilies = new Set(
  projects.flatMap((project) =>
    ["Web", "Windows", "Android"].filter((family) => project.platform.includes(family)),
  ),
);

export const stats = [
  { value: String(projects.length), label: "Products shipped in 2026" },
  { value: String(platformFamilies.size), label: "Platforms: web, Windows and Android" },
  {
    value: String(projects.filter((project) => project.worksOffline).length),
    label: "Run with no internet at all",
  },
  {
    value: String(
      projects.filter((project) => project.links.some((link) => link.href.includes("github.com")))
        .length,
    ),
    label: "With source code you can read",
  },
];

/** WhatsApp link, or null when no number is configured. */
export function whatsappHref(message = "Hi Owais, I have a project in mind.") {
  if (!siteConfig.whatsapp) return null;
  return `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(message)}`;
}
