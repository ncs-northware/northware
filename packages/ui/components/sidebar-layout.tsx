import type { ServiceType } from "@northware/service-config";
import {
  AutoBreadcrumbs,
  type BreadcrumbType,
} from "@northware/ui/components/auto-breadcrumbs";
import { buttonVariants } from "@northware/ui/components/button";
import { MainSidebar } from "@northware/ui/components/main-sidebar";
import type { SubMenuItem } from "@northware/ui/components/nav-main";
import { Separator } from "@northware/ui/components/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@northware/ui/components/sidebar";
import { ThemeSwitch } from "@northware/ui/components/theme-switch";

// TODO: Add: Entrypoint parameter, mit dem die Sidebar auch an einem anderen Punkt laut menuData starten kann

export function SidebarLayout({
  children,
  service,
  breadcrumbs,
  defaultOpen = true,
  mainLabel,
  subLabel,
  subMenu,
}: {
  children: React.ReactNode;
  service: ServiceType;
  breadcrumbs?: BreadcrumbType[];
  defaultOpen?: boolean;
  mainLabel?: string;
  subLabel?: string;
  subMenu?: SubMenuItem[];
}) {
  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <MainSidebar
        service={service}
        mainLabel={mainLabel}
        subLabel={subLabel}
        subMenu={subMenu}
      />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex w-full justify-between px-4">
            <div className="flex items-center gap-2">
              <SidebarTrigger
                className={buttonVariants({ variant: "ghost", size: "icon" })}
              />
              {breadcrumbs && (
                <Separator orientation="vertical" className="mr-2 h-4" />
              )}
              {breadcrumbs && <AutoBreadcrumbs breadcrumbs={breadcrumbs} />}
            </div>
            <ThemeSwitch className="px-4" />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
