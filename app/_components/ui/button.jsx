import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "@/app/_lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,background-color,border-color,box-shadow,opacity] duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 outline-none",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-bone-dim",
        outline:
          "border border-border bg-white/[0.02] text-foreground hover:bg-white/[0.06] hover:border-white/25",
        ghost: "text-muted-foreground hover:text-foreground hover:bg-white/[0.06]",
        link: "text-foreground underline-offset-4 hover:text-primary hover:underline",
      },
      size: {
        default: "h-11 px-6 has-[>svg]:px-5",
        sm: "h-9 px-4 text-[0.8125rem] has-[>svg]:px-3.5",
        lg: "h-13 px-8 text-base has-[>svg]:px-7",
        icon: "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({ className, variant, size, asChild = false, ...props }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
