import { cn } from "@northware/ui/utils";
import { ReactNode } from "react";

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <main className={cn("container", className)}>{children}</main>;
}
