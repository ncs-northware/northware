import { currentUser } from "@northware/auth/server";
import { type ServiceType, suiteApps } from "@northware/service-config";
import { AppSwitch, type MenuApps } from "@northware/ui/components/app-switch";
import { UserMenu } from "@northware/ui/components/auth";
import {
  AutoBreadcrumbs,
  type BreadcrumbType,
} from "@northware/ui/components/auto-breadcrumbs";
import {
  AppPermissionProvider,
  userHasPermission,
} from "@northware/ui/components/permission-provider";
import { MainSidebarMenuButton } from "@northware/ui/components/sidebar-menu-button";
import { ThemeSwitch } from "@northware/ui/components/theme-switch";
import { buttonVariants } from "@northware/ui/components/ui-registry/button";
import {
  Collapsible,
  CollapsibleContent,
} from "@northware/ui/components/ui-registry/collapsible";
import { Separator } from "@northware/ui/components/ui-registry/separator";
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
} from "@northware/ui/components/ui-registry/sidebar";
import { menuData } from "@northware/ui/lib/menu-data";

export async function SidebarLayout({
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
  const apps = await Promise.all(
    suiteApps.map(async (app) => {
      const envKey = `NEXT_PUBLIC_${app.slug.toUpperCase()}_URL`;
      const url = process.env[envKey as keyof typeof process.env];

      return {
        slug: app.slug,
        url,
        allowed: await userHasPermission([`${app.slug}::app.read`]),
      };
    })
  );
  return (
    <AppPermissionProvider apps={apps} service={service}>
      <SidebarProvider defaultOpen={defaultOpen}>
        <MainSidebar
          apps={apps}
          mainLabel={mainLabel}
          service={service}
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
                  <Separator className="mr-2 h-4" orientation="vertical" />
                )}
                {breadcrumbs && <AutoBreadcrumbs breadcrumbs={breadcrumbs} />}
              </div>
              <ThemeSwitch />
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-4">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </AppPermissionProvider>
  );
}

interface MainSidebarType extends React.ComponentProps<typeof Sidebar> {
  service: ServiceType;
  mainLabel?: string;
  subLabel?: string;
  subMenu?: SubMenuItem[];
  apps: MenuApps[];
}

async function MainSidebar({
  service,
  mainLabel,
  subLabel,
  subMenu,
  apps,
  ...props
}: MainSidebarType) {
  const user = await currentUser();
  const menuItems = await menuData(service, user?.id);
  return (
    <Sidebar {...props} collapsible="offcanvas" variant="inset">
      <SidebarHeader>
        <AppSwitch apps={apps} service={service} />
      </SidebarHeader>
      <SidebarContent>
        {subMenu && <SubNav subLabel={subLabel} subMenu={subMenu} />}
        <NavMain mainLabel={mainLabel} menuItems={menuItems} />
      </SidebarContent>
      <SidebarFooter>
        <UserMenu />
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
}: {
  menuItems: MenuType;
  mainLabel?: string;
}) {
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
                asChild
                className="group/collapsible"
                key={item.itemId}
              >
                <SidebarMenuItem>
                  <MainSidebarMenuButton
                    href={item.href}
                    title={item.title}
                    type="parent"
                  />
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {ItemChildren.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.itemId}>
                          <MainSidebarMenuButton
                            href={subItem.href}
                            title={subItem.title}
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
}: {
  subLabel?: string;
  subMenu: SubMenuItem[];
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{subLabel || "Seitennavigation"}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {subMenu.map((item) => (
            <SidebarMenuItem key={item.title}>
              <MainSidebarMenuButton
                exactMatch={item.exactMatch}
                href={item.href}
                title={item.title}
                type="topLevel"
              />
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
