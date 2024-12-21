import { cn } from "@northware/ui/utils";
import { ReactNode } from "react";
<<<<<<< HEAD:packages/ui/src/components_/layouts/Container.tsx
import { SiteHeader } from "@northware/ui/components_/menu/SiteHeader";
=======
import { SiteHeader } from "@northware/ui/components/menu_/SiteHeader";
>>>>>>> main:packages/ui/src/components/layouts/Container.tsx

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <main className={cn("container", className)}>{children}</main>;
}
