import { Counter } from "@/app/_components/motion/Counter";
import { StaggerGroup } from "@/app/_components/motion/StaggerGroup";
import { stats } from "@/app/_lib/siteConfig";

/** Four counts, each derived from projects.js (see `stats` in siteConfig). */
export function Proof() {
  return (
    <section aria-label="In numbers" className="shell pb-6 md:pb-8">
      <StaggerGroup className="grid grid-cols-2 border-y border-border lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className={[
              "flex flex-col gap-2 px-1 py-6 sm:px-6 md:py-8",
              index % 2 === 1 ? "border-l border-border" : "",
              index >= 2 ? "border-t border-border lg:border-t-0" : "",
              index === 2 ? "lg:border-l" : "",
            ].join(" ")}
          >
            <Counter value={stat.value} className="display text-5xl tabular-nums md:text-6xl" />
            <p className="max-w-[16rem] text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </StaggerGroup>
    </section>
  );
}
