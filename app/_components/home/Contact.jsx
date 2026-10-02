import { ArrowUpRight, Github, Mail } from "lucide-react";

import { Reveal } from "@/app/_components/motion/Reveal";
import { WhatsAppIcon } from "@/app/_components/shared/WhatsAppIcon";
import { Button } from "@/app/_components/ui/button";
import { siteConfig, whatsappHref } from "@/app/_lib/siteConfig";

/** The one inverted block on the page: bone ground, ink type. */
export function Contact() {
  const whatsapp = whatsappHref();

  return (
    <section id="contact" className="shell scroll-mt-24 py-16 md:py-24">
      <Reveal className="flex flex-col gap-8 rounded-xl bg-bone px-6 py-12 text-ink md:px-14 md:py-20">
        <p className="timecode flex items-center gap-3 text-ink/70">
          <span className="text-ink">SC 05</span>
          <span aria-hidden="true" className="h-px w-8 bg-ink/25" />
          <span>Contact</span>
        </p>

        <h2 className="display text-headline max-w-5xl">Have a business that needs its own software?</h2>

        <p className="max-w-2xl text-base leading-relaxed text-ink/75 md:text-lg">
          Tell me what the business has to get right and I will tell you straight whether I am the
          right person to build it. No pitch deck, no discovery retainer: a call about the problem.
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <Button asChild size="lg" className="bg-ink text-bone hover:bg-ink/85">
            <a href={`mailto:${siteConfig.email}`}>
              <Mail className="size-4" />
              Email me
            </a>
          </Button>

          {whatsapp ? (
            <Button asChild size="lg" variant="outline" className="border-ink/25 bg-transparent text-ink hover:bg-ink/5 hover:border-ink/50">
              <a href={whatsapp} target="_blank" rel="noreferrer">
                <WhatsAppIcon className="size-4" />
                WhatsApp
              </a>
            </Button>
          ) : null}

          <Button asChild size="lg" variant="ghost" className="text-ink/75 hover:bg-ink/5 hover:text-ink">
            <a href={siteConfig.github} target="_blank" rel="noreferrer">
              <Github />
              See the code
              <ArrowUpRight />
            </a>
          </Button>
        </div>

        <p className="timecode text-ink/70 normal-case select-all">{siteConfig.email}</p>
      </Reveal>
    </section>
  );
}
