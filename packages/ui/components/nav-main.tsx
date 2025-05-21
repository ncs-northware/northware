import {
  Collapsible,
  CollapsibleContent,
} from "@northware/ui/components/collapsible";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@northware/ui/components/sidebar";
import { MainSidebarMenuButton } from "./nav-links";

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

export function NavMain({ menuItems }: { menuItems: MenuType }) {
  return (
    <SidebarGroup>
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
    </SidebarGroup>
  );
}
