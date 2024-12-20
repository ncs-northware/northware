import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@northware/ui/components/menu/DropdownMenu";
import { ThemeSwitch } from "@northware/ui/components/next-themes/ThemeSwitch";
import { cn } from "@northware/ui/utils";
import { auth, signOut } from "@northware/auth/auth";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@northware/ui/components/menu/NavigationMenuPremitive";
import { UserIcon } from "lucide-react";
import { navigationMenuButtonStyle } from "./NavigationMenuPremitive";

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
      <NavigationMenu className="container hidden justify-between py-2 md:flex">
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
