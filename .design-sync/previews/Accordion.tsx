import * as React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "owais-portfolio-2";

/* Dark-only design system — see Button.tsx. */
const Frame = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-background text-foreground font-sans max-w-2xl p-8">
    {children}
  </div>
);

/* Real copy from the site's FAQ — the accordion exists for this content. */
const faq = [
  {
    q: "Can you build something that runs without the internet?",
    a: "Yes, and I've shipped it. The Offline Petrol Pump Manager installs like a normal Windows program, boots a bundled PostgreSQL binary and a Next.js server as child processes bound to loopback only, and runs with no server, no Docker and no cloud account.",
  },
  {
    q: "Do you work alone or with a team?",
    a: "Both. Several of the projects here are collaborations where I work as a repository collaborator alongside another engineer, and others I've taken from empty repo to shipped product on my own.",
  },
  {
    q: "How do you handle AI features safely?",
    a: "The security boundary is never the prompt. Model-generated SQL runs through a restricted Postgres role that can only SELECT from the catalog tables, behind a guard that rejects anything which isn't a single read-only statement.",
  },
];

/** The FAQ pattern: one open at a time, first item open so the panel is visible. */
export function Faq() {
  return (
    <Frame>
      <Accordion type="single" collapsible defaultValue="item-0" className="w-full">
        {faq.map((item, index) => (
          <AccordionItem key={item.q} value={`item-${index}`}>
            <AccordionTrigger>{item.q}</AccordionTrigger>
            <AccordionContent className="max-w-2xl leading-relaxed">
              {item.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Frame>
  );
}

/** Fully collapsed — every trigger shows its `+` at rest. */
export function AllClosed() {
  return (
    <Frame>
      <Accordion type="single" collapsible className="w-full">
        {faq.map((item, index) => (
          <AccordionItem key={item.q} value={`item-${index}`}>
            <AccordionTrigger>{item.q}</AccordionTrigger>
            <AccordionContent>{item.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Frame>
  );
}

/** `type="multiple"` keeps several panels open at once. */
export function Multiple() {
  return (
    <Frame>
      <Accordion
        type="multiple"
        defaultValue={["item-0", "item-1"]}
        className="w-full"
      >
        {faq.slice(0, 2).map((item, index) => (
          <AccordionItem key={item.q} value={`item-${index}`}>
            <AccordionTrigger>{item.q}</AccordionTrigger>
            <AccordionContent className="leading-relaxed">
              {item.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Frame>
  );
}
