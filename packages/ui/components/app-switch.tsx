"use client";

import type { ServiceType } from "@northware/service-config";
import { Brand } from "@northware/ui/components/brand";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@northware/ui/components/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@northware/ui/components/sidebar";
import { ChevronsUpDown } from "@northware/ui/icons/lucide";
import Link from "next/link";

export type MenuApps = {
  slug: ServiceType;
  url: string | undefined;
};

export function AppSwitch({
  service,
  apps,
}: { service: ServiceType; apps: MenuApps[] }) {
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
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Brand service={service} className="truncate text-base" />
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            {apps.map((app) => {
              return (
                <DropdownMenuItem key={app.slug} className="gap-2 p-2">
                  <Link href={app.url || ""}>
                    <Brand
                      service={app.slug}
                      className="gap-2 font-medium text-base"
                    />
                  </Link>
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
