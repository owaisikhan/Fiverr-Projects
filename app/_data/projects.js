import deliveries from "@/app/_data/deliveries.json";

/**
 * Every project on the site is an order delivered on Fiverr.
 *
 * Real entries live in `deliveries.json`. The upload page (`/upload`) appends
 * one there and commits the order's code to `deliveries/<slug>/` in the same
 * commit, so the next deploy shows it. Edit that file by hand to correct or
 * remove an entry.
 *
 * Until the first delivery lands, three placeholder projects stand in so the
 * layout has something to show. They disappear on their own as soon as
 * `deliveries.json` holds one entry.
 *
 * Fields:
 *   category     one of the keys in `categories` below; drives the index filter
 *   platform     short, visitor-facing ("Windows", "Web", "Android")
 *   featured     true puts the project in the spreads and the hero reel
 *   worksOffline true when the product runs with no internet at all
 *   cover        { src, alt } under /public/work, or null for the slate fallback
 *   walkthrough  { src, poster, duration, chapters: [{ at, label }] } or null
 *   improvements what I would build next; shown on the case study
 *   placeholder  true only on the stand-ins below; never counted in the stats
 *
 * `isPrivate: true` means the client asked to keep the source private. Those
 * entries carry no source link on purpose.
 */

export const categories = [
  { key: "business", label: "Business software" },
  { key: "offline", label: "Desktop and Android" },
  { key: "commerce", label: "Stores and AI" },
  { key: "sites", label: "Sites and 3D" },
];

const placeholders = [1, 2, 3].map((number, index) => ({
  slug: `project-${number}`,
  name: `Project ${number}`,
  year: "2026",
  role: "Fiverr order",
  kind: "Placeholder",
  category: categories[[0, 2, 3][index]].key,
  platform: "Web",
  accent: ["#e6a23c", "#3b6cf6", "#f97316"][index],
  worksOffline: false,
  featured: true,
  isPrivate: false,
  placeholder: true,
  cover: null,
  walkthrough: null,
  tagline: "Placeholder. The first delivered Fiverr order takes this spot.",
  summary:
    "This slot is waiting for a delivered order. Each one is uploaded with its code, a short write-up and a cover, then appears here on its own.",
  problem: "",
  approach: "",
  outcome: "",
  highlights: [],
  improvements: [],
  stack: ["Next.js", "React", "Tailwind CSS"],
  links: [],
}));

/** Fills the fields an uploaded entry may leave out, so components never guard. */
function normalize(entry) {
  return {
    year: String(new Date().getFullYear()),
    role: "Fiverr order",
    kind: "Client project",
    category: "sites",
    platform: "Web",
    accent: "#e6a23c",
    worksOffline: false,
    featured: false,
    isPrivate: false,
    cover: null,
    walkthrough: null,
    tagline: "",
    summary: "",
    problem: "",
    approach: "",
    outcome: "",
    highlights: [],
    improvements: [],
    stack: [],
    links: [],
    ...entry,
  };
}

/** Delivered orders, newest first. */
export const deliveredProjects = deliveries.map(normalize).reverse();

export const projects = deliveredProjects.length > 0 ? deliveredProjects : placeholders;

export function getProject(slug) {
  return projects.find((project) => project.slug === slug);
}

/**
 * Spreads at the top of Work. Falls back to the three newest deliveries when
 * none is marked featured, so the section is never empty.
 */
export const featuredProjects = (() => {
  const marked = projects.filter((project) => project.featured);
  return (marked.length > 0 ? marked : projects.slice(0, 3)).slice(0, 6);
})();
