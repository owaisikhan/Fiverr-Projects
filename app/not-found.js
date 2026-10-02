import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/app/_components/ui/button";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section className="shell flex min-h-[70vh] flex-col items-center justify-center gap-6 py-32 text-center">
      <p className="font-mono text-xs tracking-[0.18em] text-tungsten uppercase">
        404
      </p>
      <h1 className="display text-headline max-w-2xl">
        That page doesn&apos;t exist.
      </h1>
      <p className="max-w-md text-muted-foreground">
        The link may be out of date, or the project you were looking for lives
        in a private client repository.
      </p>
      <Button asChild size="lg">
        <Link href="/">
          <ArrowLeft className="size-4" />
          Back to the work
        </Link>
      </Button>
    </section>
  );
}
