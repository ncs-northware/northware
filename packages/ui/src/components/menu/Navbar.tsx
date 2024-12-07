import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
  navigationMenuButtonStyle,
} from "@northware/ui/components/menu/NavigationMenuPremitive";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@northware/ui/components/menu/DropdownMenu";
import { cn } from "@northware/ui/utils";
import { UserIcon } from "lucide-react";
import Image from "next/image";
import * as React from "react";
import { ThemeSwitch } from "@northware/ui/components/next-themes/ThemeSwitch";
import { auth, signOut } from "@northware/auth/auth";
import { db } from "@northware/database/connection";
import { mainNavTable } from "@northware/database/schema";
import { eq } from "drizzle-orm";

export function SiteHeader() {
  // Rendert den Zusammengesetzen SiteHeader mit MetaNav, MainNav, MobileNav usw. innerhalb von <header>
  return (
    <header>
      <MetaNav />
      <MainNav />
    </header>
  );
}

export async function MainNav() {
  // TODO: Add NavMenu Rendering based on permissionKey
  const result = await db
    .select({
      itemId: mainNavTable.itemId,
      title: mainNavTable.title,
      href: mainNavTable.href,
      childOf: mainNavTable.childOf,
    })
    .from(mainNavTable)
    .where(eq(mainNavTable.app, "cockpit"))
    .orderBy(mainNavTable.order);

  const topLevelItems = result.filter((item) => item.childOf == null);
  const childItems = (parent: string) => {
    const children = result.filter((item) => item.childOf == parent);
    return children;
  };

  // Die Hauptnavigation incl. Branding auf Desktops
  return (
    <div className="border-b border-border/50 bg-background/95 py-2 dark:border-border/70">
      <div className="container flex gap-4">
        <Image
          src="/img/logo-dark.png"
          alt="Logo"
          width={625}
          height={125}
          className="h-10 w-auto"
        />
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/"
                className={navigationMenuTriggerStyle()}
              >
                Home
              </NavigationMenuLink>
            </NavigationMenuItem>
            {topLevelItems.map((item) => {
              const ItemChildren = childItems(item.itemId);
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

const apps: {
  title: string;
  href?: string;
  envVariable?: string;
  textColor: string;
}[] = [
  // Attribute der Navigationspunkte der AppSwitches in MetaNav
  {
    envVariable: "NEXT_PUBLIC_CP_FRONT",
    title: "Northware Cockpit",
    textColor: "text-cockpit",
  },
  {
    envVariable: "NEXT_PUBLIC_FI_FRONT",
    title: "Northware Finance",
    textColor: "text-finance",
  },
  {
    envVariable: "NEXT_PUBLIC_TRD_FRONT",
    title: "Northware Trader",
    textColor: "text-trader",
  },
];

export async function MetaNav() {
  // Die Meta Navigation mit App-Switches, UserMenu und ThemeSwitcher auf Desktop-Geräten
  let session = await auth();
  return (
    <>
      <NavigationMenu className="container flex justify-between py-2">
        <NavigationMenuList>
          {apps.map((app) => {
            const link = () => {
              if (app.envVariable) {
                return process.env[app.envVariable];
              } else if (app.href) {
                return app.href;
              }
              return "#"; // Rückgabe von null, wenn kein Link verfügbar ist
            };
            if (link() !== "current") {
              return (
                <NavigationMenuItem key={app.title}>
                  <NavigationMenuLink
                    href={link()}
                    className={cn(
                      navigationMenuTriggerStyle(),
                      app.textColor,
                      "hover:" + app.textColor,
                    )}
                  >
                    {app.title}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              );
            }
          })}
        </NavigationMenuList>
        <nav className="flex">
          <ThemeSwitch className={navigationMenuButtonStyle()} />
          <DropdownMenu>
            <DropdownMenuTrigger className={navigationMenuButtonStyle()}>
              <UserIcon />
              <span className="sr-only">Nutzermenü</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>
                {session?.user?.name ? (
                  <p className="text-sm font-medium leading-none">
                    {session?.user?.name}
                  </p>
                ) : (
                  ""
                )}
                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                  {session?.user?.email}
                </p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <SignOut />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </NavigationMenu>
    </>
  );
}

function SignOut() {
  // Helper-Komponent für @northware/auth signOut
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button type="submit">Sign out</button>
    </form>
  );
}
