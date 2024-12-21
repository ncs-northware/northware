import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@northware/ui/components/menu_/NavigationMenuPremitive";

import { menuData } from "@northware/ui/components/menu_/menuData";
import { Brand } from "@northware/ui/components/base/Brand";

export async function MainNav() {
  // TODO: Add NavMenu Rendering based on permissionKey
  const menuItems = await menuData();
  // Die Hauptnavigation incl. Branding auf Desktops
  return (
    <div className="hidden border-b border-border/50 bg-background/95 py-2 dark:border-border/70 md:flex">
      <div className="container flex gap-4">
        <Brand />
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/"
                className={navigationMenuTriggerStyle()}
              >
                Home
              </NavigationMenuLink>
            </NavigationMenuItem>
            {menuItems.topLevelItems.map((item) => {
              const ItemChildren = menuItems.childItems(item.itemId);
              if (ItemChildren.length == 0) {
                return (
                  <NavigationMenuItem key={item.itemId}>
                    <NavigationMenuLink
                      href={item.href}
                      className={navigationMenuTriggerStyle()}
                    >
                      {item.title}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                );
              } else {
                return (
                  <NavigationMenuItem key={item.itemId}>
                    <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid grid-cols-2 p-4 md:w-[400px] lg:w-[500px]">
                        <NavigationMenuLink
                          className="flex h-full w-full select-none flex-col justify-center rounded-md bg-primary/60 p-3 text-lg font-medium text-primary-foreground no-underline outline-none hover:bg-primary/80 hover:shadow-md"
                          href={item.href}
                        >
                          {item.title}
                        </NavigationMenuLink>
                        <ul className="gap-3 p-4">
                          {ItemChildren.map((child) => {
                            return (
                              <li key={child.itemId}>
                                <NavigationMenuLink
                                  className="block select-none space-y-1 rounded-md p-3 text-sm font-medium leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                  href={child.href}
                                >
                                  {child.title}
                                </NavigationMenuLink>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                );
              }
            })}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
}
