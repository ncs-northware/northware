import { SiteHeader } from "@northware/ui/components/menu/SiteHeader";
import { cn } from "@northware/ui/utils";
import { ReactNode } from "react";

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
      <main className={cn("container pt-8", className)}>{children}</main>
    </>
  );
}
