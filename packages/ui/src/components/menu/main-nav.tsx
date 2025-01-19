// import { auth, signOut } from '@northware/auth/auth';
import { type ServiceType, suiteAppsMeta } from '@northware/service-config';
import { Brand } from '@northware/ui/components/base/brand';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@northware/ui/components/menu/dropdown-menu';
import {
  appTextColors,
  menuData,
} from '@northware/ui/components/menu/menu-data';
import { MainNavLink } from '@northware/ui/components/menu/nav-links';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuButtonStyle,
  navigationMenuTriggerStyle,
} from '@northware/ui/components/menu/navigation-menu-premitive';
import { ThemeSwitch } from '@northware/ui/components/next-themes/theme-switch';
import { cn } from '@northware/ui/lib/utils';
import { UserIcon } from 'lucide-react';
import Link from 'next/link';

export async function MainNav({ service }: { service: ServiceType }) {
  // TODO: Add NavMenu Rendering based on permissionKey
  const menuItems = await menuData(service);
  // Die Hauptnavigation incl. Branding auf Desktops
  return (
    <div className="container hidden md:block">
      <MetaNav service={service} />
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

async function MetaNav({ service }: { service: ServiceType }) {
  // Die Meta Navigation mit App-Switches, UserMenu und ThemeSwitcher auf Desktop-Geräten
  // const session = await auth();
  return (
    <>
      <NavigationMenu className="flex justify-between py-2">
        <NavigationMenuList>
          {suiteAppsMeta.map((app) => {
            if (service !== app.slug) {
              return (
                <NavigationMenuItem key={app.title}>
                  <MainNavLink
                    controlActiveState={false}
                    title={app.title}
                    href={app.href || '#'}
                    className={cn(
                      navigationMenuTriggerStyle(),
                      appTextColors.get(app.slug),
                      `hover:${appTextColors.get(app.slug)}`
                    )}
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
                {/* {session?.user?.name ? (
                  <p className="font-medium text-sm leading-none">
                    {session?.user?.name}
                  </p>
                ) : (
                  ''
                )} */}
                <p className="line-clamp-2 text-muted-foreground text-sm leading-snug">
                  {/* {session?.user?.email} */}
                </p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <SignOut />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <ThemeSwitch className={navigationMenuButtonStyle()} />
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
        'use server';
        // await signOut();
      }}
    >
      <button type="submit">Abmelden</button>
    </form>
  );
}
