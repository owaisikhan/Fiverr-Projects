import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "@/app/_lib/utils";

const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-sm border px-3 py-1 text-xs font-medium transition-colors [&>svg]:size-3 [&>svg]:pointer-events-none",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground",
        outline: "border-border bg-white/[0.03] text-muted-foreground",
        accent:
          "border-tungsten/30 bg-tungsten/10 text-tungsten",
        mono: "border-border bg-white/[0.03] font-mono text-[0.6875rem] tracking-wide text-muted-foreground uppercase",
      },
    },
    defaultVariants: {
      variant: "outline",
    },
  },
);

function Badge({ className, variant, asChild = false, ...props }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
