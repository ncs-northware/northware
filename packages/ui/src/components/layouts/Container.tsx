import { ReactNode } from "react";
import { cn } from "../../utils";

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <main className={cn("container", className)}>{children}</main>;
}