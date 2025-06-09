import { currentUser } from "@northware/auth/server";
import { type ServiceType, suiteApps } from "@northware/service-config";
import { AppSwitch, type MenuApps } from "@northware/ui/components/app-switch";
import {
  AutoBreadcrumbs,
  type BreadcrumbType,
} from "@northware/ui/components/auto-breadcrumbs";
import { buttonVariants } from "@northware/ui/components/button";
import {
  Collapsible,
  CollapsibleContent,
} from "@northware/ui/components/collapsible";
import { Separator } from "@northware/ui/components/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@northware/ui/components/sidebar";
import { MainSidebarMenuButton } from "@northware/ui/components/sidebar-menu-button";
import { NavUser } from "@northware/ui/components/sidebar-nav-user";
import { ThemeSwitch } from "@northware/ui/components/theme-switch";
import { menuData } from "@northware/ui/lib/menu-data";

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

interface MainSidebarType extends React.ComponentProps<typeof Sidebar> {
  service: ServiceType;
  mainLabel?: string;
  subLabel?: string;
  subMenu?: SubMenuItem[];
}

async function MainSidebar({
  service,
  mainLabel,
  subLabel,
  subMenu,
  ...props
}: MainSidebarType) {
  const user = await currentUser();
  const menuItems = await menuData(service, user?.id);
  const apps: MenuApps[] = suiteApps.map((app) => {
    const envKey = `NEXT_PUBLIC_${app.slug.toUpperCase()}_URL`;
    const url = process.env[envKey as keyof typeof process.env];

    return {
      slug: app.slug,
      url: url,
    };
  });

  return (
    <Sidebar {...props} variant="inset" collapsible="offcanvas">
      <SidebarHeader>
        <AppSwitch service={service} apps={apps} />
      </SidebarHeader>
      <SidebarContent>
        {subMenu && <SubNav subLabel={subLabel} subMenu={subMenu} />}
        <NavMain menuItems={menuItems} mainLabel={mainLabel} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          fullName={user?.fullName}
          emailAddress={user?.emailAddresses[0].emailAddress}
          avatar={user?.imageUrl}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

type MenuItem = {
  itemId: string;
  title: string;
  href: string;
  childOf: string | null;
  permissionKey: string | null;
};

type MenuType = {
  topLevelItems: MenuItem[];
  childItems: (parent: string) => MenuItem[];
};

function NavMain({
  menuItems,
  mainLabel,
}: { menuItems: MenuType; mainLabel?: string }) {
  return (
    <SidebarGroup>
      {mainLabel && <SidebarGroupLabel>{mainLabel}</SidebarGroupLabel>}
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <MainSidebarMenuButton href="/" title="Home" type="topLevel" />
          </SidebarMenuItem>
          {menuItems.topLevelItems.map((item) => {
            const ItemChildren = menuItems.childItems(item.itemId);
            if (ItemChildren.length === 0) {
              // Top-Level-Element ohne Unterpunkte
              return (
                <SidebarMenuItem key={item.itemId}>
                  <MainSidebarMenuButton
                    href={item.href}
                    title={item.title}
                    type="topLevel"
                  />
                </SidebarMenuItem>
              );
            }

            return (
              // Top-Level-Element mit Unterpunkten
              <Collapsible
                key={item.itemId}
                asChild
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <MainSidebarMenuButton
                    title={item.title}
                    type="parent"
                    href={item.href}
                  />
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {ItemChildren.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.itemId}>
                          <MainSidebarMenuButton
                            title={subItem.title}
                            href={subItem.href}
                            type="child"
                          />
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

type SubMenuItem = {
  title: string;
  href: string;
  exactMatch?: boolean;
};

function SubNav({
  subLabel,
  subMenu,
}: { subLabel?: string; subMenu: SubMenuItem[] }) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{subLabel || "Seitennavigation"}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {subMenu.map((item) => (
            <SidebarMenuItem key={item.title}>
              <MainSidebarMenuButton
                href={item.href}
                title={item.title}
                type="topLevel"
                exactMatch={item.exactMatch}
              />
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
