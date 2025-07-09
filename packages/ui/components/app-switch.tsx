"use client";

import type { ServiceType } from "@northware/service-config";
import { Brand } from "@northware/ui/components/brand";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@northware/ui/components/ui-registry/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@northware/ui/components/ui-registry/sidebar";
import { ChevronsUpDown } from "@northware/ui/icons/lucide";
import Link from "next/link";

export type MenuApps = {
  slug: ServiceType;
  url: string | undefined;
  allowed: boolean;
};

export function AppSwitch({
  service,
  apps,
}: {
  service: ServiceType;
  apps: MenuApps[];
}) {
  const { isMobile } = useSidebar();
  if (!service) {
    return null;
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              size="lg"
            >
              <Brand className="truncate text-base" service={service} />
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            {apps.map(
              (app) =>
                app.allowed && (
                  <DropdownMenuItem className="gap-2 p-2" key={app.slug}>
                    <Link href={app.url || ""} target="_blank">
                      <Brand
                        className="gap-2 font-medium text-base"
                        service={app.slug}
                      />
                    </Link>
                  </DropdownMenuItem>
                )
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
