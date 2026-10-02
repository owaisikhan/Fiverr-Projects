import Image from "next/image";

import { Slate } from "@/app/_components/shared/Slate";
import { VideoLoop } from "@/app/_components/shared/VideoLoop";
import { cn } from "@/app/_lib/utils";

/**
 * A project's cover, in order of preference:
 *   1. its walkthrough as a silent loop, when `motion` is set and one exists
 *   2. the captured screenshot (`project.cover`), or the walkthrough's poster
 *   3. its slate
 * Covers live in /public/work at 1600x1000 (16:10); walkthroughs in /public/media.
 */
export function ProjectCover({
  project,
  sizes = "(min-width: 1024px) 58vw, 100vw",
  priority,
  compact,
  motion = false,
  className,
}) {
  const walkthrough = project.walkthrough;
  const frame = cn("relative aspect-[16/10] w-full overflow-hidden bg-ink-raised", className);

  if (motion && walkthrough) {
    return (
      <div className={frame}>
        <VideoLoop
          src={walkthrough.src}
          webm={walkthrough.webm}
          poster={walkthrough.poster}
          label={`${project.name} walkthrough`}
        />
      </div>
    );
  }

  const still = project.cover ?? (walkthrough?.poster ? { src: walkthrough.poster, alt: `${project.name} screen` } : null);

  if (!still) {
    return <Slate project={project} compact={compact} className={className} />;
  }

  return (
    <div className={frame}>
      <Image src={still.src} alt={still.alt} fill sizes={sizes} priority={priority} className="object-cover object-top" />
    </div>
  );
}
