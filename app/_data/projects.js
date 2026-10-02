/**
 * Every project here is 2026 work, drawn from the repositories we own or
 * build in. Most of it shipped as a two-person team. Course-follow-along,
 * practice and clone repos are deliberately left out: this list is meant to
 * show products, not exercises.
 *
 * Repositories considered, and why each is in or out (last scan 2026-10-01):
 *
 *   in   Ammar-Sagheer/Offline-Petrol-Pump-Manager        (private)
 *   in   Ammar-Sagheer/Petrol-Pump-Management-Software    (private)
 *   in   Ammar-Sagheer/Offline-Committee-Manager-App
 *   in   owaisikhan/The-Ledger-Mobile   (Android port, folded into the Committee Manager entry)
 *   in   owaisikhan/PMC-Hospital
 *   in   owaisikhan/Pharmacy-POS
 *   in   owaisikhan/Wholesale-POS       (Sohana POS)
 *   in   Ammar-Sagheer/saam-s-store, saam-s-store-client1 (private)
 *   in   Ammar-Sagheer/Coffee-Shop-Website                (private)
 *   in   Ammar-Sagheer/ecommerce-reactive-chatbot
 *   in   Ammar-Sagheer/reactive-google-ai-agent
 *   in   Ammar-Sagheer/Stocks-RSI-Display, owaisikhan/windows-app-stocks-RSI
 *   in   owaisikhan/Rag-Research-Assistant (Folio)
 *   in   owaisikhan/ai-tryon-store
 *   in   owaisikhan/Tea-website-for-video (Kinari Tea House)
 *   in   owaisikhan/coffee-site-from-video (Espresso Bar and Roastery)
 *   in   owaisikhan/site-audit, owaisikhan/web-audit-toolkit
 *   out  owaisikhan/merdian-consulting                    : owner's call, 2026-10-01
 *   out  the two studio website repositories (incl. igloo)    : not shown here
 *   in   owaisikhan/storify-clone (Vendrix, client marketplace; live at vendrixx.vercel.app)
 *   ask  owaisikhan/Scroll-Animation
 *   out  Core-Stack, burger-king, 3d-Effect and the tailor site clone : clones of other sites
 *   out  shopify-online-store-with-next-js, agentic-crm,
 *        ai-website-cloner-template, services              : templates and forks
 *   out  pump-manager-display, coffee-shop-2, improve-saam-strore : duplicates
 *   out  Broadcaster, upwork-profile-setup, coffee-shop-3  : not products
 *   out  Hotel-Website, Hotel-Management-App, the-wild-oasis,
 *        Pizza_Made_BY_US, react-pizza                     : course work
 *   out  practice-react, test, Pump-manager-releases       : scratch / release host
 *
 * Fields added for v3:
 *   category     one of the keys in `categories` below; drives the index filter
 *   platform     short, visitor-facing ("Windows", "Web", "Android")
 *   featured     true puts the project in the six spreads at the top of Work
 *   worksOffline true when the product runs with no internet at all
 *   cover        { src, alt } under /public/work, or null for the slate fallback
 *   walkthrough  { src, poster, duration, chapters: [{ at, label }] } or null
 *   improvements what we would build next; shown on the case study
 *
 * `isPrivate: true` means the source lives in a private client repository.
 * Those entries carry no repo link on purpose: a client clicking through to
 * a 404 looks worse than no link at all.
 */

export const categories = [
  { key: "business", label: "Business software" },
  { key: "offline", label: "Desktop and Android" },
  { key: "commerce", label: "Stores and AI" },
  { key: "sites", label: "Sites and 3D" },
];

export const projects = [
  {
    slug: "offline-petrol-pump-manager",
    name: "Offline Petrol Pump Manager",
    year: "2026",
    role: "Two-person team",
    kind: "Desktop software",
    category: "offline",
    platform: "Windows",
    accent: "#f97316",
    worksOffline: true,
    featured: true,
    isPrivate: true,
    cover: null,
    walkthrough: {
      src: "/media/pump-manager.mp4",
      webm: "/media/pump-manager.webm",
      poster: "/media/pump-manager-poster.jpg",
      duration: "0:15",
      chapters: [
        { at: 0, label: "Dashboard" },
        { at: 4, label: "Daily readings" },
        { at: 7, label: "Monthly report" },
        { at: 10, label: "Treasury" },
        { at: 13, label: "Last 14 days" },
      ],
    },
    tagline: "A petrol pump's entire back office, running on one laptop with no internet.",
    summary:
      "Desktop build of a petrol-pump management system, packaged with Electron so it installs like a normal Windows program. No server, no Docker, no cloud account, and no internet connection needed to run it.",
    problem:
      "Fuel stations often sit on unreliable connections, and the people running them do not want a monthly subscription to read yesterday's takings. A cloud app was the wrong shape for the business.",
    approach:
      "Electron boots a bundled PostgreSQL binary and a Next.js server as child processes, both bound to loopback only, then opens the window once the server answers. The database ships inside the install, so first run is a double-click rather than a setup guide.",
    outcome:
      "The station runs the software fully offline. Encrypted local backups protect the data, a licence-key system controls installs, and a background self-updater checks a public releases repo whenever the machine does happen to be online.",
    highlights: [
      "Bundled Postgres, so there is no external database to install or administer",
      "Loopback-only binding, so nothing is exposed on the network",
      "Encrypted local backup and restore",
      "Licence-key issuing plus a remote block-list for revocation",
      "Background self-update against a public releases repository",
    ],
    improvements: [
      "Sign the Windows installer so first install does not trip a SmartScreen warning",
      "A one-page morning summary printed at shift change",
      "Optional sync to a second laptop for owners with two stations",
    ],
    stack: ["Next.js", "Electron", "PostgreSQL", "electron-builder", "Recharts"],
    links: [],
  },
  {
    slug: "vendrix",
    name: "Vendrix",
    year: "2026",
    role: "Two-person team",
    kind: "E-commerce",
    category: "commerce",
    platform: "Web",
    accent: "#3b6cf6",
    featured: true,
    isPrivate: false,
    cover: null,
    walkthrough: {
      src: "/media/vendrix.mp4",
      webm: "/media/vendrix.webm",
      poster: "/media/vendrix-poster.jpg",
      duration: "0:19",
      chapters: [
        { at: 0, label: "Home" },
        { at: 3, label: "Categories" },
        { at: 6, label: "Top selling" },
        { at: 9, label: "Deals" },
        { at: 12, label: "Collections" },
        { at: 14, label: "Coupon" },
        { at: 16, label: "Vendors" },
      ],
    },
    tagline: "A multi-vendor electronics marketplace, where every seller gets their own shop.",
    summary:
      "An electronics marketplace built for a client: phones, laptops, watches and accessories from many vendors in one store, with categories and brands, live deals, coupon codes, a cart, a wishlist and checkout, and a shop page for every seller.",
    problem:
      "A marketplace has two customers: the shopper who wants to compare and buy quickly, and the vendor who wants a shop of their own without running a site. Most store templates only serve the first.",
    approach:
      "One Next.js storefront with a page for every vendor, product, category, brand and collection, generated statically so it stays fast. Cart, wishlist and reviews are stored in Supabase, and the light and dark themes are remembered without a flash on reload.",
    outcome:
      "The client has a live marketplace: shoppers filter by featured, new or on sale in one tap, deals count down live, coupon codes copy in one tap, and each vendor's shop shows its rating, sales and products.",
    highlights: [
      "A shop page for every vendor, with rating, sales and price level",
      "Featured, new arrivals and on sale tabs on every product rail",
      "Deals with a live countdown",
      "Coupon codes copied in one tap",
      "Cart, wishlist and reviews stored in Supabase",
      "Light and dark themes, remembered without a flash",
    ],
    improvements: [
      "A vendor dashboard for sellers to manage their own stock and orders",
      "Order updates on WhatsApp",
      "Search that understands typos and model numbers",
    ],
    stack: ["Next.js 16", "TypeScript", "Supabase", "Tailwind CSS v4", "shadcn/ui"],
    links: [{ label: "Live site", href: "https://vendrixx.vercel.app/" }],
  },
  {
    slug: "pmc-hospital",
    name: "PMC Hospital",
    year: "2026",
    role: "Two-person team",
    kind: "Web application",
    category: "business",
    platform: "Web",
    accent: "#38bdf8",
    featured: true,
    isPrivate: false,
    cover: null,
    walkthrough: null,
    tagline: "Admissions, wards and the ledger for a children's hospital, behind one login.",
    summary:
      "Hospital management and ledger for Paeds Medical Complex, a paediatric hospital with a 24-hour emergency, NICU, PICU, measles ward, general ward, pharmacy and lab. The whole system sits behind login; there are no public pages.",
    problem:
      "A hospital bill is a stack of daily charges at different care levels, and the cash book has to agree with it to the rupee. When rates change, bills already raised must not change with them, and staff must not see salaries or profit.",
    approach:
      "Every rupee in or out is one row in an append-only ledger: update and delete are revoked from every client role, and a mistake is fixed by a reversal row the database checks against the original. Admission charges are stored per care level per date range with a snapshot of the rate, and totals come from views, never typed in.",
    outcome:
      "The database, roles, sign-in and patient records are live, with admissions billed day by day. Pharmacy and the lab are being built next, in that order, on the same ledger.",
    highlights: [
      "Append-only ledger with database-checked reversals and an audit log",
      "Per-day stacked charges, e.g. NICU plus ventilator on the same dates",
      "Rate snapshots, so editing a rate never rewrites a raised bill",
      "Admin and staff roles enforced by row level security, not hidden links",
      "First sign-up becomes the administrator; later accounts wait for approval",
    ],
    improvements: [
      "Discharge summary and bill printed together on A4",
      "Lab results entered against the order once the in-house lab opens",
      "Daily cash close that matches the drawer against the ledger",
    ],
    stack: ["Next.js 16", "TypeScript", "Supabase", "PostgreSQL", "shadcn/ui"],
    links: [{ label: "Repository", href: "https://github.com/owaisikhan/PMC-Hospital" }],
  },
  {
    slug: "sohana-pos",
    name: "Sohana POS",
    year: "2026",
    role: "Two-person team",
    kind: "Mobile app",
    category: "offline",
    platform: "Android",
    accent: "#22c55e",
    worksOffline: true,
    featured: true,
    isPrivate: false,
    cover: null,
    walkthrough: null,
    tagline: "Billing, khata and stock for a wholesaler, on one phone, with Urdu memos.",
    summary:
      "Billing, customer and supplier khata, stock and cash for Sohana Traders, a wholesaler in Sukkur selling to 50 to 60 shops on credit. It runs on one Android phone and prints memos on a 58mm Bluetooth printer, in English or Urdu.",
    problem:
      "The owner sells a handful of items to dozens of shops on udhaar and kept the balances in his head and a register. He needed a memo he could hand over or send on WhatsApp, and balances he could trust, without buying a computer.",
    approach:
      "An Expo app with SQLite on the phone. The money and stock rules are database triggers: stock cannot go negative, the ledger, cash book and bills are append-only, and a bill's previous balance must equal the khata. The printer has no Urdu font, so each memo is drawn as a 384-pixel image and printed as a bitmap.",
    outcome:
      "The client reviewed it as a web build of the same app, with sample data that resets on refresh, before the Android build with Bluetooth printing. Bills go out on WhatsApp as an image in one tap.",
    highlights: [
      "Memo in English or Urdu, chosen per bill, printed as a 58mm bitmap",
      "Khata balance is one sum read two ways, so customer and ledger cannot disagree",
      "No negative stock and no edited bills, enforced in SQLite triggers",
      "One-tap WhatsApp share of the memo image",
      "The same app runs as a browser demo for the client to try first",
    ],
    improvements: [
      "Low-stock reminder at the start of the day",
      "Monthly statement per shop, sent on WhatsApp in one go",
      "Encrypted backup to a USB drive or the phone's Google account",
    ],
    stack: ["Expo", "React Native", "SQLite", "expo-router"],
    links: [{ label: "Repository", href: "https://github.com/owaisikhan/Wholesale-POS" }],
  },
  {
    slug: "pharmacy-pos",
    name: "Pharmacy POS",
    year: "2026",
    role: "Two-person team",
    kind: "Web application",
    category: "business",
    platform: "Web",
    accent: "#14b8a6",
    featured: true,
    isPrivate: false,
    cover: null,
    walkthrough: null,
    tagline: "A pharmacy counter that always sells the earliest expiry first.",
    summary:
      "Sales counter, batch stock with expiry, customer credit, supplier accounts, cash shifts and reports for a retail pharmacy. Keyboard-first at the counter and printed on an 80mm receipt.",
    problem:
      "Medicines expire by batch, customers buy by the pack or by the strip, and some pay at the end of the month. A till that ignores any of those leaves expired stock on the shelf and a credit book nobody trusts.",
    approach:
      "Every purchase line carries a batch number and expiry, and sales always draw from the earliest expiry first. Expired stock cannot be sold. Returns go back to their batch and refund the item's share of what was actually paid. Staff and owner roles are enforced by row level security.",
    outcome:
      "A full pharmacy day runs in it: open the shift, sell, take returns and credit payments, record purchases, close the shift against counted cash. Only the owner sees costs, profit and stock adjustments.",
    highlights: [
      "Earliest-expiry-first selling, with 30, 60 and 90 day expiry lists",
      "Sell by the pack or loose, with line and bill discounts and split payment",
      "F2 search, F4 cash received, F9 complete: built for a busy counter",
      "Cash shifts that show what should be in the drawer and the difference",
      "Profit worked out on the exact batches sold",
    ],
    improvements: [
      "Barcode labels printed for loose stock",
      "Reorder suggestions from the last 30 days of sales",
      "An offline desktop build for pharmacies on poor connections",
    ],
    stack: ["Next.js", "Supabase", "PostgreSQL", "Tailwind CSS v4"],
    links: [{ label: "Repository", href: "https://github.com/owaisikhan/Pharmacy-POS" }],
  },
  {
    slug: "saamj-store",
    name: "SAAMJ Store",
    year: "2026",
    role: "Two-person team",
    kind: "E-commerce",
    category: "commerce",
    platform: "Web",
    accent: "#ec4899",
    featured: true,
    isPrivate: true,
    cover: null,
    walkthrough: null,
    tagline: "A storefront and admin panel built once, then deployed per client.",
    summary:
      "Full-stack e-commerce platform covering browsing, search, cart, checkout, customer accounts and a complete admin back office. It was built as a reusable template, so a second client deployment was a configuration job, not a rewrite.",
    problem:
      "Small retailers need a real store with real order management, but rebuilding the same catalog, cart, checkout and admin for every client is wasted work.",
    approach:
      "One codebase on Next.js and Supabase covering both the storefront and a dark-mode admin panel, with OAuth customer accounts, saved addresses, order history and bulk CSV catalog import.",
    outcome:
      "Shipped to a live client, then forked into a second client deployment that reuses the same core. Auth and session handling were hardened across the whole surface rather than page by page.",
    highlights: [
      "Google OAuth customer accounts with addresses and order history",
      "Admin panel with bulk CSV catalog import",
      "Checkout flow wired for card and manual payment",
      "Row level security across every customer-owned table",
      "Reused for a second client deployment without a rewrite",
    ],
    improvements: [
      "Order updates on WhatsApp instead of email",
      "Product comparison and a faster image gallery on phones",
      "The store chatbot built into every client deployment by default",
    ],
    stack: ["Next.js", "Supabase", "PostgreSQL", "Tailwind CSS v4", "Stripe-ready"],
    links: [],
  },
  {
    slug: "kinari-tea-house",
    name: "Kinari Tea House",
    year: "2026",
    role: "Two-person team",
    kind: "Brand site",
    category: "sites",
    platform: "Web 3D",
    accent: "#d4a017",
    featured: true,
    isPrivate: false,
    cover: { src: "/work/kinari-tea-house.jpg", alt: "Kinari Tea House home screen: a glass teapot on a dark wooden table under the headline Brewed in gold" },
    walkthrough: null,
    tagline: "Scroll, and a glass teapot fills with leaves, brews gold and pours.",
    summary:
      "A scroll-driven WebGL site for a loose leaf tea brand. As you scroll, a glass teapot fills with leaves from a foil pouch, the water swirls and turns gold, and the pot pours into a cup, ending on an order button.",
    problem:
      "Loose leaf tea sells on how it looks in the glass, and product photos on a white background make every blend look the same.",
    approach:
      "Every object is generated in code, with no model files. Glass and tea bend the light behind them through a refraction pass, the camera follows a spline through one viewpoint per section, and the falling leaves are a real physics simulation run once on load and played back by scroll, so scrolling up runs it in reverse.",
    outcome:
      "Seven scenes from pouch to cup, finishing on an Order on WhatsApp button. Scrolling glides with Lenis, and the whole thing ships as a static site.",
    highlights: [
      "Refraction through glass and tea, rendered in a pre-pass",
      "Leaves, petals and spices from a baked physics simulation",
      "Scroll scrubs the simulation, so it runs backwards too",
      "Camera on a spline with one viewpoint per section",
      "Order on WhatsApp at the end of the pour",
    ],
    improvements: [
      "A lighter still-image version for older phones",
      "A blend picker that changes the colour of the brew",
    ],
    stack: ["Next.js 16", "three.js", "Lenis", "Tailwind CSS v4"],
    links: [{ label: "Repository", href: "https://github.com/owaisikhan/Tea-website-for-video" }],
  },
  {
    slug: "petrol-pump-management-software",
    name: "Petrol Pump Management Software",
    year: "2026",
    role: "Two-person team",
    kind: "Web application",
    category: "business",
    platform: "Web",
    accent: "#eab308",
    featured: false,
    isPrivate: true,
    cover: { src: "/work/petrol-pump-management-software.jpg", alt: "Daily readings screen: six of six nozzles entered, 2,345.29 litres sold, and each diesel nozzle's fuel, sales and cash" },
    walkthrough: null,
    tagline: "The web original the offline desktop build was cut from.",
    summary:
      "The hosted version of the pump management system: daily meter readings, stock movements, customer credit, cash reconciliation and monthly profit. These are the numbers a station owner checks against the cash in the drawer.",
    problem:
      "Fuel retail runs on a handful of figures that have to reconcile exactly: what the meters say went out, what stock is left, who bought on credit, and what is actually in the till at close.",
    approach:
      "A Next.js App Router application over PostgreSQL, with the money rules enforced in the database rather than in the UI, so a bad number cannot get in through a second entry point later.",
    outcome:
      "Became the product the offline Electron edition was later packaged from, sharing the same application code with the hosting step swapped out.",
    highlights: [
      "Daily readings, stock counts and cash-vs-credit splits",
      "Customer credit ledger with payments against balances",
      "Monthly profit reporting owners can check by hand",
      "Constraints enforced in Postgres, not just the form",
    ],
    improvements: [
      "A phone-sized reading entry screen for the attendant",
      "Tank dip charts that convert dip readings to litres automatically",
    ],
    stack: ["Next.js", "PostgreSQL", "Tailwind CSS", "Recharts"],
    links: [],
  },
  {
    slug: "offline-committee-manager",
    name: "Offline Committee Manager",
    year: "2026",
    role: "Two-person team",
    kind: "Desktop and mobile",
    category: "offline",
    platform: "Windows + Android",
    accent: "#2dd4bf",
    worksOffline: true,
    featured: false,
    isPrivate: false,
    cover: null,
    walkthrough: null,
    tagline: "A rotating savings committee's books, offline on a laptop or a phone.",
    summary:
      "Offline app for running a monthly committee: ten members paying in, one taking the pot each month and repaying it over the following fifteen. It ships as a Windows program with its own bundled Postgres, and as an Android app with SQLite on the phone. Neither touches the internet.",
    problem:
      "The committee's danger is invisible from the bank balance. With a ten-month rotation repaid over fifteen, full-size payouts go out while the repayment stream behind them is still building. On the real figures, an account holding Rs 520,000 is emptied by month 20 and bottoms out below zero by month 24.",
    approach:
      "The month-by-month cash flow is simulated rather than estimated. A binary search over that simulation finds the largest payout that never breaches the cushion, and a separate function sizes the three ways out: hand over less, repay faster, or raise everyone's contribution. The app tells \"cannot afford this\" apart from \"cannot afford this yet\".",
    outcome:
      "The manager runs the whole committee offline and prints the month's sheets for the other nine. The Android port shares the desktop's rules, wording and icon. Every rule that matters lives in the database, so the ledger is append-only for everybody.",
    highlights: [
      "Payout ceiling found by binary search over a real cash-flow simulation",
      "Append-only ledger: no update, no delete, for any role",
      "Overdrafts refused outright; policy breaches only with a recorded reason",
      "Members' stakes and the bank balance are one sum read two ways",
      "Windows build with bundled Postgres; Android build with SQLite",
    ],
    improvements: [
      "Move the books between the laptop and the phone with a QR code",
      "Payment reminders members can receive on WhatsApp",
    ],
    stack: ["Next.js 16", "Electron", "PostgreSQL", "Expo", "SQLite"],
    links: [
      { label: "Desktop repository", href: "https://github.com/Ammar-Sagheer/Offline-Committee-Manager-App" },
      { label: "Android repository", href: "https://github.com/owaisikhan/The-Ledger-Mobile" },
    ],
  },
  {
    slug: "psx-rsi-dashboard",
    name: "PSX RSI Dashboard",
    year: "2026",
    role: "Two-person team, maintainer",
    kind: "Web and desktop",
    category: "offline",
    platform: "Web + Windows",
    accent: "#4ade80",
    featured: false,
    isPrivate: false,
    cover: null,
    walkthrough: null,
    tagline: "A swing-trading screener for the Pakistan Stock Exchange, on the web and the desktop.",
    summary:
      "Short-term trading dashboard for PSX equities: live prices and history from the exchange's public feed, RSI across several periods, and a screener that surfaces oversold names worth a one-to-two week hold.",
    problem:
      "Indicator values that disagree with what a trader sees on TradingView are worse than no indicator at all, and PSX price history contains splits and dividends that quietly wreck a naive RSI calculation.",
    approach:
      "The RSI pipeline was checked against TradingView row by row. A corporate-action adjuster normalises historical prices, but only on drops: treating large rises as splits erased real rallies from the history, a bug found by comparing output rather than reading code.",
    outcome:
      "Ships in two forms from one codebase: the hosted web app, and a Windows build where Electron spawns the Next.js standalone server on a fixed loopback port. A liquidity floor tracks volume as a tri-state so a data outage cannot silently empty the screener.",
    highlights: [
      "RSI(14) and RSI(2) verified against TradingView on real data",
      "Corporate-action adjustment that fires on drops only, by design",
      "Fixed buy-signal rule, independent of the selected chart view",
      "Volume floor tracked as number, confirmed-null or unknown",
      "Electron desktop port with no database and no cloud account",
    ],
    improvements: [
      "Alerts when a watched stock crosses its RSI threshold",
      "A backtest page showing how the signal did over the last year",
    ],
    stack: ["Next.js 16", "React 19", "Electron", "Recharts", "Tailwind CSS v4"],
    links: [
      { label: "Web app", href: "https://github.com/Ammar-Sagheer/Stocks-RSI-Display" },
      { label: "Desktop build", href: "https://github.com/owaisikhan/windows-app-stocks-RSI" },
    ],
  },
  {
    slug: "ecommerce-reactive-chatbot",
    name: "E-commerce Reactive Chatbot",
    year: "2026",
    role: "Two-person team",
    kind: "Applied AI",
    category: "commerce",
    platform: "Web",
    accent: "#60a5fa",
    featured: false,
    isPrivate: false,
    cover: null,
    walkthrough: null,
    tagline: "Ask the store a question; it writes the SQL and answers out loud.",
    summary:
      "A storefront assistant that answers questions about products, prices and store policy by generating SQL against the real catalog, grounding policy answers in retrieved store documents, and streaming text and voice back live.",
    problem:
      "Shoppers ask questions a search box cannot answer: comparisons, availability, what the returns policy actually says. Hard-coding those answers does not scale with a catalog.",
    approach:
      "A LangGraph pipeline on Next.js. The question is embedded and checked against a semantic cache, then routed either to model-written SQL over the Postgres catalog or to retrieval over policy documents. Failed queries retry once with the error in hand.",
    outcome:
      "Answers stream as they are written, comparisons render as inline charts, and paraphrased repeat questions skip the model entirely through the semantic cache.",
    highlights: [
      "Text-to-SQL over a live Postgres catalog, with a self-healing retry",
      "Retrieval over store policy documents for non-catalog questions",
      "Semantic cache keyed on embeddings, so paraphrases hit the cache",
      "Streaming answers, with optional spoken responses",
      "Inline charts when the answer is a comparison or a trend",
    ],
    improvements: [
      "Answer in Roman Urdu when the shopper asks in Roman Urdu",
      "Hand the conversation to WhatsApp when the shopper wants a person",
    ],
    stack: ["Next.js", "LangGraph", "Google Gemini", "PostgreSQL", "Redis"],
    links: [{ label: "Repository", href: "https://github.com/Ammar-Sagheer/ecommerce-reactive-chatbot" }],
  },
  {
    slug: "store-ai-agent",
    name: "Store AI Agent",
    year: "2026",
    role: "Two-person team",
    kind: "Applied AI",
    category: "commerce",
    platform: "API",
    accent: "#22d3ee",
    featured: false,
    isPrivate: false,
    cover: null,
    walkthrough: null,
    tagline: "A text-to-SQL backend that cannot read the tables it shouldn't.",
    summary:
      "Python service that turns a shopper's question into a read-only SQL query, runs it against the store's Supabase Postgres through a restricted role, and returns a written answer.",
    problem:
      "Letting a language model write SQL against a production database is a security problem before it is a feature. The real question is what happens when it writes something it shouldn't.",
    approach:
      "Defence in depth. The service connects as a Postgres role granted SELECT on three catalog tables and nothing else, so orders, addresses and profiles are out of reach whatever SQL the model writes. A separate guard rejects anything that is not a single read-only SELECT before it reaches the database.",
    outcome:
      "A proven minimal loop (question, cache check, SQL, execute, retry once, summarise, cache) that the larger Next.js chatbot was then built out from.",
    highlights: [
      "Restricted Postgres role as the real security boundary",
      "SQL guard rejecting non-SELECT statements before execution",
      "Cosine-similarity semantic cache with a 0.87 threshold",
      "Failed and fallback answers are never cached",
      "Shared-secret API key plus CORS origin allow-listing",
    ],
    improvements: ["Per-store rate limits so one busy shop cannot run up the model bill"],
    stack: ["Python", "FastAPI", "Google Gemini", "Supabase", "Docker"],
    links: [{ label: "Repository", href: "https://github.com/Ammar-Sagheer/reactive-google-ai-agent" }],
  },
  {
    slug: "folio",
    name: "Folio",
    year: "2026",
    role: "Solo build",
    kind: "Applied AI",
    category: "commerce",
    platform: "Web",
    accent: "#fb7185",
    featured: false,
    isPrivate: false,
    cover: null,
    walkthrough: null,
    tagline: "Upload a PDF and ask it questions. If the document doesn't say, neither does Folio.",
    summary:
      "A research assistant that answers only from passages retrieved out of your own document. Uploads are private to whoever made them, enforced in the database, and deleted after 24 hours.",
    problem:
      "A document assistant that sounds fluent while quietly inventing things is worse than none, because a confident wrong answer costs more than a missing one.",
    approach:
      "Retrieval is hybrid: vector search and full-text search run together and their ranks are fused, so exact terms like an error string or a surname are not lost. Follow-up questions are rewritten into standalone queries before retrieval, and the model is told that \"the sources do not say\" is a correct answer.",
    outcome:
      "Answers stream back grounded in the uploaded file. Page-level citations are built and can be switched on with one setting.",
    highlights: [
      "Hybrid vector and full-text search with reciprocal rank fusion",
      "Follow-ups rewritten before retrieval, so multi-turn questions stay accurate",
      "Page and section carried on every passage for citations",
      "Uploads private per user by row level security, deleted after 24 hours",
      "Ingestion refuses to mix embedding models in one index",
    ],
    improvements: ["Compare two documents side by side", "Export an answer with its quoted passages"],
    stack: ["Next.js", "Supabase", "pgvector", "Claude", "Gemini embeddings"],
    links: [{ label: "Repository", href: "https://github.com/owaisikhan/Rag-Research-Assistant" }],
  },
  {
    slug: "ai-try-on-store",
    name: "AI Try-on Store",
    year: "2026",
    role: "Two-person team",
    kind: "Applied AI",
    category: "commerce",
    platform: "Web",
    accent: "#f472b6",
    featured: false,
    isPrivate: false,
    cover: { src: "/work/ai-try-on-store.jpg", alt: "AI Try-on Store home: the fitting room banner above a grid of jackets and sweaters in New Arrivals" },
    walkthrough: null,
    tagline: "A clothing store with a fitting room: tap a piece and the model wears it.",
    summary:
      "A storefront where you pick one of eight models, or upload your own photo, then tap or drag any piece onto them. Gemini's image model returns a photo of the model wearing it, layered the way clothes actually layer.",
    problem:
      "Shoppers buying clothes online cannot see how a piece looks on a body like theirs, which is where most returns come from.",
    approach:
      "Pieces fly onto the model on tap, or drag there with dnd-kit. A jacket goes on top, new trousers replace the old ones, and Start over clears the look. The image key is read only on the server, and a mock mode runs the whole interface without one.",
    outcome:
      "A working fitting room on a plain catalogue of local JSON, ready to sit in front of a real store's products.",
    highlights: [
      "Eight preset models across body types and skin tones, or your own photo",
      "Layering rules: tops stack, bottoms replace",
      "Tap or drag a piece onto the model",
      "Image key kept on the server; mock mode for demos",
    ],
    improvements: ["Connect to a real catalogue and stock", "Save a look and share it on WhatsApp"],
    stack: ["Next.js 16", "Gemini 2.5 Flash Image", "dnd-kit", "Tailwind CSS v4"],
    links: [{ label: "Repository", href: "https://github.com/owaisikhan/ai-tryon-store" }],
  },
  {
    slug: "espresso-bar",
    name: "Espresso Bar and Roastery",
    year: "2026",
    role: "Two-person team",
    kind: "Brand site",
    category: "sites",
    platform: "Web",
    accent: "#c08457",
    featured: false,
    isPrivate: false,
    cover: { src: "/work/espresso-bar.jpg", alt: "A double ristretto pouring into a white cup, with the shot's dose, yield, time and brew temperature listed beside it" },
    walkthrough: null,
    tagline: "An espresso bar site where scrolling pours the latte, frame by frame.",
    summary:
      "Site for an espresso bar and roastery. The hero pins for six screens of scrolling while the owner's pour video plays frame by frame, from the first drop to the finished latte, then the menu, origins and ordering follow.",
    problem:
      "A cafe's best advert is the pour itself, and an autoplaying video either loads too slowly on a phone or is skipped before it starts.",
    approach:
      "The footage is cut into 200 WebP frames drawn on a canvas, and scroll position picks the frame, so the visitor controls the pour. Menu, prices and copy live in one content file, and a script turns any new video into frames.",
    outcome:
      "A fast, scroll-controlled hero with ordering and booking flows checked on phones from 320 to 414 pixels wide.",
    highlights: [
      "200-frame scroll-scrubbed pour on a canvas",
      "One command turns a new video into frames",
      "Menu, prices, add-ons and origins in one content file",
      "Order and booking flows checked at phone widths",
    ],
    improvements: ["A short loop instead of the scrub when reduced motion is on"],
    stack: ["Next.js", "GSAP", "Canvas", "Tailwind CSS v4"],
    links: [{ label: "Repository", href: "https://github.com/owaisikhan/coffee-site-from-video" }],
  },
  {
    slug: "roaster-coffee-shop",
    name: "Roaster Coffee Shop",
    year: "2026",
    role: "Two-person team",
    kind: "Marketing and ordering",
    category: "sites",
    platform: "Web",
    accent: "#b45309",
    featured: false,
    isPrivate: true,
    cover: { src: "/work/roaster-coffee-shop.jpg", alt: "Roaster home page: the headline Coffee Worth Slowing Down For with Order Now and Explore Menu buttons" },
    walkthrough: null,
    tagline: "A specialty roastery site that prints what it paid the farmer.",
    summary:
      "Single-page site for a specialty coffee roastery and bar: the story, the espresso and filter menu, a pickup-order panel, and a sourcing table naming every farm the beans came from alongside the price paid for them.",
    problem:
      "A coffee shop with nine named farm partners and a two-week freshness window has a story that a generic menu page throws away, and the customer on the pavement mostly wants to order a flat white for pickup without downloading anything.",
    approach:
      "One scrolling page with anchored sections, so nothing costs a navigation. The order panel sits inline: pick a drink, size, quantity and the name for the cup, with the total updating as you go. A search field filters the espresso bar, filter coffee and retail bags in place.",
    outcome:
      "The whole page is prerendered and ships on Vercel, so there is no server to keep warm. A table lists each farm, its origin, varietal and the per-pound price paid, the same figure printed on the bag.",
    highlights: [
      "Inline pickup ordering with a live total",
      "Type-ahead search across the espresso bar, filter coffee and retail bags",
      "Farm-by-farm sourcing table showing origin, varietal and price paid",
      "Anchored single-page layout, prerendered end to end",
    ],
    improvements: ["Send the pickup order to the bar on WhatsApp"],
    stack: ["Next.js", "React", "Tailwind CSS", "Vercel"],
    links: [{ label: "Live site", href: "https://coffee-shop-2-nu.vercel.app/" }],
  },
  {
    slug: "site-audit",
    name: "Site Audit",
    year: "2026",
    role: "Solo build",
    kind: "Tool",
    category: "sites",
    platform: "Command line",
    accent: "#facc15",
    featured: false,
    isPrivate: false,
    cover: null,
    walkthrough: null,
    tagline: "Point it at a website; it tells the owner what is wrong, with screenshots.",
    summary:
      "An audit tool that loads a site in a real browser the way a phone would, measures what actually happens, and writes findings for a business owner rather than a developer, with screenshots proving each one and a first-contact email drafted from the worst three.",
    problem:
      "\"I'm a web developer looking for work\" gets ignored. \"Your homepage loads 16MB and scrolls sideways on an iPhone, screenshots attached\" gets a reply.",
    approach:
      "Playwright drives Chromium at phone and laptop sizes, measuring weight, speed, sideways scroll and broken links. A fuller toolkit adds Core Web Vitals, technical SEO and passive security checks, and prices every fix so the report says what to do first.",
    outcome:
      "One command produces a sendable HTML report, the screenshots and an email for each site audited.",
    highlights: [
      "Findings written for owners, each backed by a screenshot",
      "Phone overflow screenshot taken only when the page scrolls sideways",
      "Draft first-contact email built from the three worst problems",
      "Speed, SEO and passive security checks in the full toolkit",
    ],
    improvements: ["Re-run monthly and email the owner what changed"],
    stack: ["Node.js", "Playwright", "Chromium"],
    links: [
      { label: "Repository", href: "https://github.com/owaisikhan/site-audit" },
      { label: "Toolkit", href: "https://github.com/owaisikhan/web-audit-toolkit" },
    ],
  },
];

export function getProject(slug) {
  return projects.find((project) => project.slug === slug);
}

export const featuredProjects = projects.filter((project) => project.featured);
