import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Default cn Helper by shadcn to enable merging correctly

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
