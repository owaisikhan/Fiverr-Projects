import { ServiceProjectsLink } from "@/app/_components/home/ServiceProjectsLink";
import { StaggerGroup } from "@/app/_components/motion/StaggerGroup";
import { SectionHeading } from "@/app/_components/shared/SectionHeading";
import { projects } from "@/app/_data/projects";
import { siteConfig } from "@/app/_lib/siteConfig";

/** Four rows, each linked to the projects that prove it. */
export function Services() {
  return (
    <section id="services" className="shell scroll-mt-24 py-16 md:py-24">
      <SectionHeading
        scene="02"
        label="Services"
        title="What I build for businesses."
        lede="Four things I do again and again, rather than a list of everything I have ever touched."
      />

      <StaggerGroup as="ol" className="mt-10 border-t border-border md:mt-14">
        {siteConfig.services.map((service, index) => {
          const count = projects.filter((project) => project.category === service.category).length;
          return (
            <li
              key={service.title}
              className="grid gap-4 border-b border-border py-8 md:grid-cols-[3rem_minmax(0,1fr)_minmax(0,1.3fr)_auto] md:gap-8 md:py-10"
            >
              <span className="timecode text-tungsten">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="text-xl font-semibold tracking-tight md:text-2xl">{service.title}</h3>
              <div className="flex flex-col gap-4">
                <p className="leading-relaxed text-muted-foreground">{service.body}</p>
                <ul className="timecode flex flex-wrap gap-x-5 gap-y-2 text-muted-foreground">
                  {service.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
              <ServiceProjectsLink category={service.category} count={count} />
            </li>
          );
        })}
      </StaggerGroup>
    </section>
  );
}
