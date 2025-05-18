import { SignOutButton } from "@northware/auth/client";
import { type User, currentUser } from "@northware/auth/server";
import { type ServiceType, suiteAppsMeta } from "@northware/service-config";
import { Brand } from "@northware/ui/components/brand";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@northware/ui/components/dropdown-menu";
import { MainNavLink } from "@northware/ui/components/nav-links";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuButtonStyle,
  navigationMenuTriggerStyle,
} from "@northware/ui/components/navigation-menu";
import { ThemeSwitch } from "@northware/ui/components/theme-switch";
import { menuData } from "@northware/ui/lib/menu-data";
import { cn } from "@northware/ui/lib/utils";
import { UserIcon } from "lucide-react";
import Link from "next/link";
export async function MainNav({ service }: { service: ServiceType }) {
  // TODO: Add NavMenu Rendering based on permissionKey
  const user = await currentUser();
  const menuItems = await menuData(service, user?.id);
  // Die Hauptnavigation incl. Branding auf Desktops
  return (
    <div className="container hidden pt-1 md:block">
      <MetaNav service={service} user={user} />
      <div className="flex bg-background/95 py-2">
        <div className="flex gap-4">
          <Link href="/">
            <Brand service={service} />
          </Link>
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <MainNavLink
                  title="Home"
                  href="/"
                  className={navigationMenuTriggerStyle()}
                />
              </NavigationMenuItem>
              {menuItems.topLevelItems.map((item) => {
                const ItemChildren = menuItems.childItems(item.itemId);
                if (ItemChildren.length === 0) {
                  // Top-Level-Element ohne Untermenü
                  return (
                    <NavigationMenuItem key={item.itemId}>
                      <MainNavLink
                        title={item.title}
                        href={item.href}
                        className={navigationMenuTriggerStyle()}
                      />
                    </NavigationMenuItem>
                  );
                }
                return (
                  // Top-Level-Element mit Untermenü
                  <NavigationMenuItem key={item.itemId}>
                    <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid grid-cols-2 p-4 md:w-[400px] lg:w-[500px]">
                        <MainNavLink
                          controlActiveState={false}
                          title={item.title}
                          href={item.href}
                          className="flex h-full w-full select-none flex-col justify-center rounded-md bg-primary/60 p-3 font-medium text-lg text-primary-foreground no-underline outline-none hover:bg-primary/80 hover:shadow-md"
                        />
                        <ul className="gap-3 p-4">
                          {ItemChildren.map((child) => {
                            return (
                              <li key={child.itemId}>
                                <MainNavLink
                                  className="block select-none space-y-1 rounded-md p-3 font-medium text-sm leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                  title={child.title}
                                  href={child.href}
                                />
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </div>
  );
}

async function MetaNav({
  service,
  user,
}: { service: ServiceType; user: User | null }) {
  // Die Meta Navigation mit App-Switches, UserMenu und ThemeSwitcher auf Desktop-Geräten
  return (
    <>
      <NavigationMenu className="flex justify-between py-2">
        <NavigationMenuList>
          {suiteAppsMeta.map((app) => {
            if (service !== app.slug) {
              return (
                <NavigationMenuItem key={app.slug}>
                  <MainNavLink
                    controlActiveState={false}
                    title={app.title}
                    href={
                      process.env[
                        `NEXT_PUBLIC_${app.slug.toUpperCase()}_URL`
                      ] || ""
                    }
                    className={cn(navigationMenuTriggerStyle(), app.color)}
                  />
                </NavigationMenuItem>
              );
            }
          })}
        </NavigationMenuList>
        <nav className="flex">
          <DropdownMenu>
            <DropdownMenuTrigger className={navigationMenuButtonStyle()}>
              <UserIcon />
              <span className="sr-only">Nutzermenü</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>
                {user?.firstName !== null || user?.lastName !== null ? (
                  <p className="font-medium text-sm leading-none">
                    {user?.firstName !== null ? user?.firstName : null}{" "}
                    {user?.lastName !== null ? user?.lastName : null}
                  </p>
                ) : null}
                <p className="line-clamp-2 text-muted-foreground text-sm leading-snug">
                  {`${user?.emailAddresses[0].emailAddress}`}
                </p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <SignOutButton>
                <DropdownMenuItem>Abmelden</DropdownMenuItem>
              </SignOutButton>
            </DropdownMenuContent>
          </DropdownMenu>
          <ThemeSwitch className={navigationMenuButtonStyle()} />
        </nav>
      </NavigationMenu>
    </>
  );
}
