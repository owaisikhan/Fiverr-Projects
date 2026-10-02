import * as React from "react";

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Separator,
} from "owais-portfolio-2";

/* Dark-only design system — see Button.tsx. */
const Frame = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-background text-foreground font-sans p-8">{children}</div>
);

/** The service card, composed exactly as the Services section builds it. */
export function ServiceCard() {
  return (
    <Frame>
      <Card className="max-w-md gap-5">
        <CardHeader className="gap-4">
          <Badge variant="mono">01</Badge>
          <CardTitle className="text-xl md:text-2xl">
            Offline desktop software
          </CardTitle>
          <CardDescription className="text-base">
            Electron builds with a bundled database, licence keys and background
            self-update, for businesses that cannot rely on an internet
            connection.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="flex flex-wrap gap-2">
            {["Bundled Postgres", "Licensing & updates", "Encrypted backups"].map(
              (point) => (
                <li key={point}>
                  <Badge variant="outline">{point}</Badge>
                </li>
              ),
            )}
          </ul>
        </CardContent>
      </Card>
    </Frame>
  );
}

/** All six parts at once: header, content, separator and a footer that acts. */
export function WithFooter() {
  return (
    <Frame>
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>Offline Petrol Pump Manager</CardTitle>
          <CardDescription>
            Daily readings, stock and customer credit for a business that counts
            cash at the end of every shift.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-sm leading-relaxed text-muted-foreground">
          Installs like a normal Windows program, boots a bundled PostgreSQL
          binary and a Next.js server bound to loopback only — no server, no
          Docker, no cloud account.
        </CardContent>
        <Separator />
        <CardFooter className="justify-between">
          <Badge variant="mono">Private repo</Badge>
          <Button size="sm" variant="outline">
            Request a walkthrough
          </Button>
        </CardFooter>
      </Card>
    </Frame>
  );
}

/** Cards are equal-height in a grid — `h-full` is what keeps them aligned. */
export function InAGrid() {
  const services = [
    {
      title: "Full-stack web applications",
      body: "Next.js App Router products with Postgres or Supabase behind them — authentication, admin panels, dashboards and payments.",
    },
    {
      title: "Applied AI features",
      body: "Text-to-SQL over your own catalog and retrieval over your own documents, built behind hard security boundaries.",
    },
  ];

  return (
    <Frame>
      <div className="grid gap-6 md:grid-cols-2">
        {services.map((service) => (
          <Card key={service.title} className="h-full">
            <CardHeader>
              <CardTitle>{service.title}</CardTitle>
              <CardDescription>{service.body}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </Frame>
  );
}
