import type { ServiceType } from "@northware/service-config";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@northware/ui/components/layouts/sidebar";
import SidebarTriggerMobile from "@northware/ui/components/layouts/sidebar-trigger-mobile";
import { SiteHeader } from "@northware/ui/components/menu/site-header";
import { cn } from "@northware/ui/lib/utils";
import type * as React from "react";

interface UserSidebarProps extends React.ComponentProps<typeof Sidebar> {
  data: SidebarDataType;
}

export type SidebarDataType = {
  title: string;
  items: {
    title: string;
    url: string;
  }[];
}[];

export function SidebarNav({
  className: userSidebarClassName,
  data,
  ...props
}: UserSidebarProps) {
  return (
    <Sidebar
      className={cn("sticky h-[80vh] p-6", userSidebarClassName)}
      variant={props.variant || "floating"}
    >
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={undefined}>
                      <a href={item.url}>{item.title}</a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}

export function SidebarLayout({
  children,
  data,
  service,
}: { children: React.ReactNode; data: SidebarDataType; service: ServiceType }) {
  return (
    <>
      <SiteHeader service={service} />
      <SidebarProvider className="gap-10">
        <SidebarNav data={data} />
        <div className="flex-1">
          <SidebarTriggerMobile />
          <main className="container mx-3 flex flex-1 flex-col">
            {children}
          </main>
        </div>
      </SidebarProvider>
    </>
  );
}
