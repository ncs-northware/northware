import {
  Collapsible,
  CollapsibleContent,
} from "@northware/ui/components/collapsible";

import { MainSidebarMenuButton } from "@northware/ui/components/nav-links";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@northware/ui/components/sidebar";

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

export function NavMain({
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

export type SubMenuItem = {
  title: string;
  href: string;
};

export function SubNav({
  subLabel,
  subMenu,
}: { subLabel?: string; subMenu: SubMenuItem[] }) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{subLabel || "Seitennavigation"}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            {subMenu.map((item) => (
              <MainSidebarMenuButton
                key={item.title}
                href={item.href}
                title={item.title}
                type="topLevel"
              />
            ))}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
