import { Reveal } from "@/app/_components/motion/Reveal";
import { StaggerGroup } from "@/app/_components/motion/StaggerGroup";
import { SectionHeading } from "@/app/_components/shared/SectionHeading";
import { siteConfig } from "@/app/_lib/siteConfig";

/** About, how a project runs, and the tools: one section, read left to right. */
export function About() {
  return (
    <section id="about" className="shell scroll-mt-24 py-16 md:py-24">
      <SectionHeading scene="03" label="About" title="I care about the boring parts." />

      <div className="mt-10 grid gap-12 md:mt-14 lg:grid-cols-2 lg:gap-20">
        <div className="flex flex-col gap-6">
          {siteConfig.about.map((paragraph, index) => (
            <Reveal
              key={paragraph.slice(0, 32)}
              as="p"
              delay={index * 0.08}
              className="text-lg leading-relaxed text-muted-foreground md:text-xl"
            >
              {paragraph}
            </Reveal>
          ))}
        </div>

        <div className="flex flex-col gap-5">
          <h3 className="timecode text-muted-foreground">How a project runs</h3>
          <StaggerGroup as="ol" className="border-t border-border">
            {siteConfig.process.map((step, index) => (
              <li key={step.title} className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-3 border-b border-border py-5">
                <span className="timecode pt-1 text-tungsten">{String(index + 1).padStart(2, "0")}</span>
                <div className="flex flex-col gap-1.5">
                  <p className="font-semibold tracking-tight">{step.title}</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">{step.body}</p>
                </div>
              </li>
            ))}
          </StaggerGroup>
        </div>
      </div>

      <div id="stack" className="mt-14 flex scroll-mt-28 flex-col gap-5 md:mt-20">
        <h3 className="timecode text-muted-foreground">Tools I reach for</h3>
        <StaggerGroup className="grid grid-cols-2 border-t border-border lg:grid-cols-4">
          {siteConfig.stack.map((group, index) => (
            <div
              key={group.group}
              className={[
                "flex flex-col gap-3 py-6 pr-4",
                index % 2 === 1 ? "border-l border-border pl-4 lg:pl-6" : "",
                index === 2 ? "lg:border-l lg:pl-6" : "",
              ].join(" ")}
            >
              <p className="timecode text-tungsten">{group.group}</p>
              <ul className="flex flex-col gap-1.5 text-sm text-bone/90">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
