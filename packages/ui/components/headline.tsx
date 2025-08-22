import { cn } from "@northware/ui/lib/utils";
import { cva } from "class-variance-authority";
import { createElement, type HTMLAttributes, type ReactNode } from "react";

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
    },
  },
});

export function Headline({
  children,
  level,
  className,
  ...props
}: HeadlineProps) {
  return createElement(
    level,
    {
      className: cn(headlineClasses({ level }), className),
      ...props,
    },
    children
  );
}
