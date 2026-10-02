import { categories } from "@/app/_data/projects";
import { cn } from "@/app/_lib/utils";

/**
 * A clapperboard title card for a project, used wherever a cover image has not
 * been captured yet. The fields are real: PROD is the project, SCENE its
 * category, TAKE its platform, ROLL its year.
 *
 * Sizes come from container query units, so the same component reads as a
 * full cover in a spread and as a thumbnail in the index.
 */
export function Slate({ project, compact = false, className }) {
  const scene = categories.find((category) => category.key === project.category)?.label;

  // Thumbnail: the clapper stripes alone, which is all that reads at 7rem.
  if (compact) {
    return (
      <div className={cn("relative flex aspect-[16/10] w-full flex-col bg-ink-raised", className)}>
        <div
          aria-hidden="true"
          className="h-[34%] shrink-0"
          style={{
            backgroundImage: `repeating-linear-gradient(-55deg, ${project.accent} 0 0.45rem, var(--color-ink) 0.45rem 0.9rem)`,
          }}
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative flex aspect-[16/10] w-full flex-col overflow-hidden bg-ink-raised [container-type:inline-size]",
        className,
      )}
    >
      {/* The clapper sticks, striped in the project's own colour. */}
      <div
        aria-hidden="true"
        className="h-[13%] shrink-0 border-b border-ink"
        style={{
          backgroundImage: `repeating-linear-gradient(-55deg, ${project.accent} 0 6cqi, var(--color-ink) 6cqi 12cqi)`,
        }}
      />

      <div className="grid flex-1 grid-cols-3 grid-rows-[1fr_auto] text-bone">
        <div className="col-span-3 flex flex-col justify-center gap-[1.2cqi] border-b border-ink-line px-[5cqi] py-[3cqi]">
          <span className="timecode text-[max(0.5rem,1.6cqi)] text-muted-foreground">Prod</span>
          <span className="display text-[7.2cqi] leading-[0.95]">{project.name}</span>
        </div>
        {[
          ["Scene", scene],
          ["Take", project.platform],
          ["Roll", project.year],
        ].map(([field, value], index) => (
          <div
            key={field}
            className={cn(
              "flex min-w-0 flex-col gap-[0.8cqi] px-[5cqi] py-[2.6cqi]",
              index > 0 && "border-l border-ink-line",
            )}
          >
            <span className="timecode text-[max(0.5rem,1.4cqi)] text-muted-foreground">{field}</span>
            <span className="font-mono text-[max(0.55rem,2.1cqi)] leading-snug break-words">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
