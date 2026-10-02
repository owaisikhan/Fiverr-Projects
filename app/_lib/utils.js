import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** shadcn/ui class merger: keep this signature, every ui/ component uses it. */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
