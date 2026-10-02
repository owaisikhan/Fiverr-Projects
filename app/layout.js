import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import localFont from "next/font/local";

import { Footer } from "@/app/_components/layout/Footer";
import { Navbar } from "@/app/_components/layout/Navbar";
import { ScrollProgress } from "@/app/_components/motion/ScrollProgress";
import { SmoothScroll } from "@/app/_components/motion/SmoothScroll";
import { siteConfig } from "@/app/_lib/siteConfig";

import "@/app/_styles/globals.css";

// Display face. Self-hosted from the OFL release (app/_assets/fonts), so the
// build never depends on reaching a font CDN.
const anton = localFont({
  src: "./_assets/fonts/Anton-Regular.woff2",
  variable: "--font-anton",
  weight: "400",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://owaiskhan.dev"),
  title: {
    default: `${siteConfig.name} · ${siteConfig.role}`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.intro,
  keywords: [
    "Next.js developer",
    "full-stack engineer",
    "Electron desktop apps",
    "Android apps",
    "point of sale software",
    "Supabase",
    "PostgreSQL",
    "AI features",
    siteConfig.name,
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.github }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    title: `${siteConfig.name} · ${siteConfig.role}`,
    description: siteConfig.intro,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} · ${siteConfig.role}`,
    description: siteConfig.intro,
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: "#111111",
  colorScheme: "dark",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} ${anton.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/*
          Reveal elements are pre-hidden at opacity: 0 in globals.css so GSAP
          can fade them in without a flash. Without JavaScript that GSAP never
          runs, so put them back. This block is the no-JS safety net and must
          stay in sync with the pre-hide rule in app/_styles/globals.css.
        */}
        <noscript>
          <style
            dangerouslySetInnerHTML={{
              __html:
                "[data-reveal],[data-hero-fade],[data-stagger]>*{opacity:1!important;transform:none!important}",
            }}
          />
        </noscript>
      </head>
      <body className="antialiased">
        <a
          href="#main"
          className="sr-only rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100"
        >
          Skip to content
        </a>

        <SmoothScroll />
        <ScrollProgress />
        <Navbar />

        <main id="main">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
