import { Reveal } from "@/app/_components/motion/Reveal";
import { SectionHeading } from "@/app/_components/shared/SectionHeading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/_components/ui/accordion";
import { siteConfig } from "@/app/_lib/siteConfig";

export function Faq() {
  return (
    <section id="faq" className="shell scroll-mt-24 py-16 md:py-24">
      <div className="grid gap-6 lg:grid-cols-2 lg:gap-20">
        <SectionHeading
          scene="04"
          label="FAQ"
          title="Questions clients ask first."
          className="md:flex-col md:items-start"
        />

        <Reveal className="lg:border-t lg:border-border lg:pt-2">
          <Accordion type="single" collapsible className="w-full">
            {siteConfig.faq.map((item, index) => (
              <AccordionItem key={item.q} value={`item-${index}`}>
                <AccordionTrigger>{item.q}</AccordionTrigger>
                <AccordionContent className="max-w-2xl leading-relaxed">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
