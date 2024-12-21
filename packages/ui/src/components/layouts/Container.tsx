import { cn } from "@northware/ui/utils";
import { ReactNode } from "react";
import { SiteHeader } from "@northware/ui/components/menu_/SiteHeader";


export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <main className={cn("container", className)}>{children}</main>;
}
