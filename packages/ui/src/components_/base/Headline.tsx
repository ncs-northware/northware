import { ReactNode, HTMLAttributes } from "react";
import { cn } from "@northware/ui/utils";

interface HeadlineProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
  level: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "title";
}

const basicClasses = "scroll-m-20 tracking-tight";

export function Headline({
  children,
  level,
  className,
  ...props
}: HeadlineProps) {
  switch (level) {
    case "h1":
      return (
        <h1
          className={cn("mb-3 text-4xl font-bold", basicClasses, className)}
          {...props}
        >
          {children}
        </h1>
      );
    case "h2":
      return (
        <h2
          className={cn(
            "text-3xl font-semibold first:mt-0",
            basicClasses,
            className,
          )}
          {...props}
        >
          {children}
        </h2>
      );
    case "h3":
      return (
        <h3
          className={cn("text-2xl font-semibold", basicClasses, className)}
          {...props}
        >
          {children}
        </h3>
      );
    case "h4":
      return (
        <h4
          className={cn("text-xl font-semibold", basicClasses, className)}
          {...props}
        >
          {children}
        </h4>
      );
    case "h5":
      return (
        <h5
          className={cn("text-lg font-medium", basicClasses, className)}
          {...props}
        >
          {children}
        </h5>
      );
    case "h6":
      return (
        <h5
          className={cn("text-base font-medium", basicClasses, className)}
          {...props}
        >
          {children}
        </h5>
      );
    default:
      return (
        <p className="text-4xl font-bold text-warning">
          Achtung das Headline-Level {level} wird noch nicht unterstützt.
        </p>
      );
  }
}
