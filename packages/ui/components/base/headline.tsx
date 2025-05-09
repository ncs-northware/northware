import { cn } from "@northware/ui/lib/utils";
import { cva } from "class-variance-authority";
import type { HTMLAttributes, ReactNode } from "react";

interface HeadlineProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
  level: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const headlineClasses = cva("scroll-m-20 tracking-tight", {
  variants: {
    level: {
      h1: "mb-3 font-bold text-4xl",
      h2: "font-semibold text-3xl first:mt-0",
      h3: "font-semibold text-2xl",
      h4: "font-semibold text-xl",
      h5: "font-medium text-lg",
      h6: "font-medium text-base",
      unknown: "font-bold text-4xl text-warning",
    },
  },
  defaultVariants: { level: "unknown" },
});

export function Headline({
  children,
  level,
  className,
  ...props
}: HeadlineProps) {
  switch (level) {
    case "h1":
      return (
        <h1 className={cn(headlineClasses({ level }), className)} {...props}>
          {children}
        </h1>
      );
    case "h2":
      return (
        <h2 className={cn(headlineClasses({ level }), className)} {...props}>
          {children}
        </h2>
      );
    case "h3":
      return (
        <h3 className={cn(headlineClasses({ level }), className)} {...props}>
          {children}
        </h3>
      );
    case "h4":
      return (
        <h4 className={cn(headlineClasses({ level }), className)} {...props}>
          {children}
        </h4>
      );
    case "h5":
      return (
        <h5 className={cn(headlineClasses({ level }), className)} {...props}>
          {children}
        </h5>
      );
    case "h6":
      return (
        <h6 className={cn(headlineClasses({ level }), className)} {...props}>
          {children}
        </h6>
      );
    default:
      return (
        <p
          className={cn(headlineClasses({ level: "unknown" }), className)}
          {...props}
        >
          Achtung das Headline-Level {level} wird noch nicht unterstützt.
        </p>
      );
  }
}
