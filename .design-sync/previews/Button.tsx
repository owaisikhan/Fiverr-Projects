import * as React from "react";

import { Button } from "owais-portfolio-2";

/* This design system is dark-only — globals.css paints the page on
   --color-ink and every colour was picked against it. The preview card's own
   body is white, so each story renders on the real ground instead. */
const Frame = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-background text-foreground font-sans flex flex-wrap items-center gap-4 p-8">
    {children}
  </div>
);

const ArrowIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
    <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** The four variants, in the order the site uses them. */
export function Variants() {
  return (
    <Frame>
      <Button>Start a project</Button>
      <Button variant="outline">See the work</Button>
      <Button variant="ghost">Read the case study</Button>
      <Button variant="link">owaisikhan on GitHub</Button>
    </Frame>
  );
}

/** Every size, including the square icon size. */
export function Sizes() {
  return (
    <Frame>
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon" aria-label="Next project">
        <ArrowIcon />
      </Button>
    </Frame>
  );
}

/** Buttons pair with an icon; svgs are sized by the component itself. */
export function WithIcon() {
  return (
    <Frame>
      <Button size="lg">
        Start a project
        <ArrowIcon />
      </Button>
      <Button variant="outline" size="lg">
        See the work
        <ArrowIcon />
      </Button>
    </Frame>
  );
}

/** Disabled drops to 50% opacity and stops pointer events. */
export function Disabled() {
  return (
    <Frame>
      <Button disabled>Start a project</Button>
      <Button variant="outline" disabled>
        See the work
      </Button>
      <Button variant="ghost" disabled>
        Read the case study
      </Button>
    </Frame>
  );
}

/** `asChild` hands the styling to a real anchor — how every CTA on the site is built. */
export function AsLink() {
  return (
    <Frame>
      <Button asChild size="lg">
        <a href="#contact">Start a project</a>
      </Button>
      <Button asChild variant="outline" size="lg">
        <a href="#work">See the work</a>
      </Button>
    </Frame>
  );
}
