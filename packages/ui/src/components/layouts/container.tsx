import type { ServiceType } from "@northware/service-config";
import { SiteHeader } from "@northware/ui/components/menu/site-header";
import { cn } from "@northware/ui/lib/utils";
import type { ReactNode } from "react";

export function Container({
  children,
  className,
  service,
}: {
  children: ReactNode;
  className?: string;
  service: ServiceType;
}) {
  return (
    <>
      <SiteHeader service={service} />
      <main className={cn("container pt-8", className)}>{children}</main>
    </>
  );
}
