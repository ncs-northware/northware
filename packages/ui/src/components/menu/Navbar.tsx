import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
  navigationMenuButtonStyle,
  NavigationMenuIndicator,
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
import Link from "next/link";
import * as React from "react";
import { ThemeSwitch } from "@northware/ui/components/next-themes/ThemeSwitch";
import { auth, signOut } from "@northware/auth/auth";

export function SiteHeader() {
  // Rendert den Zusammengesetzen SiteHeader mit MetaNav, MainNav, MobileNav usw. innerhalb von <header>
  return (
    <header>
      <MetaNav />
      <MainNav />
    </header>
  );
}

export function MainNav() {
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
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <a
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        href="/"
                      >
                        <div className="mb-2 mt-4 text-lg font-medium">
                          shadcn/ui
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          Beautifully designed components built with Radix UI
                          and Tailwind CSS.
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <ListItem href="/docs" title="Introduction">
                    Re-usable components built using Radix UI and Tailwind CSS.
                  </ListItem>
                  <ListItem href="/docs/installation" title="Installation">
                    How to install dependencies and structure your app.
                  </ListItem>
                  <ListItem
                    href="/docs/primitives/typography"
                    title="Typography"
                  >
                    Styles for headings, paragraphs, lists...etc
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

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
