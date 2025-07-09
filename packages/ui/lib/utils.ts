import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Default cn Helper by shadcn to enable merging correctly

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/* 
Custom export for the toast function from sonner. 
The toast function is used to create a toast notification on an event. 
This export of the toast function enables the toast usage without installing sonner in every app.
*/

export { toast } from "sonner";
