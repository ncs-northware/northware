import { cn } from "@northware/ui/utils";
import { ReactNode } from "react";
import { SiteHeader } from "@northware/ui/components_/menu/SiteHeader";

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <>
      <SiteHeader />
      <main className={cn("container", className)}>{children}</main>
    </>
  );
}
