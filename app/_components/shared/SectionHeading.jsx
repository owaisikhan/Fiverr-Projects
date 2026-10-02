import { Reveal } from "@/app/_components/motion/Reveal";
import { cn } from "@/app/_lib/utils";

/**
 * The block that opens every section, written like a slate call: a scene
 * number (the section's real position on the page) and its name, then the
 * title in the display face. Keeping it in one component is what keeps the
 * rhythm identical down the page.
 */
export function SectionHeading({ scene, label, title, lede, aside, className }) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-6 border-t border-border pt-6 md:flex-row md:items-end md:justify-between md:gap-12",
        className,
      )}
    >
      <div className="flex max-w-4xl flex-col gap-5">
        <p className="timecode flex items-center gap-3 text-muted-foreground">
          {scene ? <span className="text-tungsten">SC {scene}</span> : null}
          <span aria-hidden="true" className="h-px w-8 bg-border" />
          <span>{label}</span>
        </p>

        <h2 className="display text-headline">{title}</h2>

        {lede ? (
          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {lede}
          </p>
        ) : null}
      </div>

      {aside ? <div className="shrink-0">{aside}</div> : null}
    </Reveal>
  );
}
