import { auth, signOut } from "@northware/auth/auth";
import { Brand } from "@northware/ui/components/base/Brand";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@northware/ui/components/menu/DropdownMenu";
import { apps, menuData } from "@northware/ui/components/menu/menuData";
import {
  NavigationMenu,
  navigationMenuButtonStyle,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@northware/ui/components/menu/NavigationMenuPremitive";
import { MainNavLink } from "@northware/ui/components/menu/NavLinks";
import { ThemeSwitch } from "@northware/ui/components/next-themes/ThemeSwitch";
import { cn } from "@northware/ui/utils";
import { UserIcon } from "lucide-react";
import Link from "next/link";

export async function MainNav() {
  // TODO: Add NavMenu Rendering based on permissionKey
  const menuItems = await menuData();
  // Die Hauptnavigation incl. Branding auf Desktops
  return (
    <div className="container hidden md:block">
      <MetaNav />
      <div className="flex bg-background/95 py-2">
        <div className="flex gap-4">
          <Link href="/">
            <Brand />
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
                if (ItemChildren.length == 0) {
                  return (
                    <NavigationMenuItem key={item.itemId}>
                      <MainNavLink
                        title={item.title}
                        href={item.href}
                        className={navigationMenuTriggerStyle()}
                      />
                    </NavigationMenuItem>
                  );
                } else {
                  return (
                    <NavigationMenuItem key={item.itemId}>
                      <NavigationMenuTrigger>
                        {item.title}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="grid grid-cols-2 p-4 md:w-[400px] lg:w-[500px]">
                          <MainNavLink
                            controlActiveState={false}
                            title={item.title}
                            href={item.href}
                            className="flex h-full w-full select-none flex-col justify-center rounded-md bg-primary/60 p-3 text-lg font-medium text-primary-foreground no-underline outline-none hover:bg-primary/80 hover:shadow-md"
                          />
                          <ul className="gap-3 p-4">
                            {ItemChildren.map((child) => {
                              return (
                                <li key={child.itemId}>
                                  <MainNavLink
                                    className="block select-none space-y-1 rounded-md p-3 text-sm font-medium leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
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
                }
              })}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </div>
  );
}

async function MetaNav() {
  // Die Meta Navigation mit App-Switches, UserMenu und ThemeSwitcher auf Desktop-Geräten
  let session = await auth();
  return (
    <>
      <NavigationMenu className="flex justify-between py-2">
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
      <button type="submit">Abmelden</button>
    </form>
  );
}
