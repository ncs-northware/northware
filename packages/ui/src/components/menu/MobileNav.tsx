import { Brand } from "@northware/ui/components/base/Brand";
import { Button } from "@northware/ui/components/base/Button";
import { apps, menuData } from "@northware/ui/components/menu/menuData";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@northware/ui/components/panels/Accordion";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@northware/ui/components/panels/Dialog";
import { MenuIcon, LogOutIcon } from "lucide-react";
import Link from "next/link";
import { navigationMenuButtonStyle } from "./NavigationMenuPremitive";
import { MobileNavLink } from "@northware/ui/components/menu/NavLinks";
import { auth, signOut } from "@northware/auth/auth";
import { ThemeSwitch } from "@northware/ui/components/next-themes/ThemeSwitch";

export async function MobileNav() {
  const menuItems = await menuData();

  return (
    <div className="container flex justify-between py-4 md:hidden">
      <div className="ml-3 flex items-center gap-3">
        <Link href="/">
          <Brand />
        </Link>
      </div>
      <div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className={navigationMenuButtonStyle()} variant="blank">
              <MenuIcon className="h-6 w-6" />
            </Button>
          </DialogTrigger>
          <DialogContent className="inset-x-0 top-0 flex flex-col border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top">
            <DialogTitle className="font-semibold">
              <Link href="/">
                <Brand />
              </Link>
            </DialogTitle>
            <div className="flex flex-1 flex-col justify-between">
              <ul className="grid gap-1">
                <MobileNavLink href="/" title="Home" />
                {menuItems.topLevelItems.map((item) => {
                  const ItemChildren = menuItems.childItems(item.itemId);
                  if (ItemChildren.length == 0) {
                    return (
                      <MobileNavLink
                        key={item.itemId}
                        href={item.href}
                        title={item.title}
                      />
                    );
                  } else {
                    return (
                      <li key={item.itemId}>
                        <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value="id" className="border-0 px-2">
                            <AccordionTrigger>{item.title}</AccordionTrigger>
                            <AccordionContent>
                              <ul>
                                <MobileNavLink
                                  title={item.title}
                                  href={item.href}
                                  isChild
                                  linkClasses="bg-primary/60 text-primary-foreground hover:bg-primary/80"
                                  controlActiveState={false}
                                />

                                {ItemChildren.map((child) => {
                                  return (
                                    <MobileNavLink
                                      title={child.title}
                                      href={child.href}
                                      linkClasses="hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                      key={child.itemId}
                                    />
                                  );
                                })}
                              </ul>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </li>
                    );
                  }
                })}
              </ul>
              <MobileNavMeta />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

async function MobileNavMeta() {
  let session = await auth();
  return (
    <ul className="grid gap-1 border-t border-border/50 py-4 dark:border-border/70">
      {apps.map((app) => {
        const link: any = () => {
          if (app.envVariable) {
            return process.env[app.envVariable];
          } else if (app.href) {
            return app.href;
          }
          return "#"; // Rückgabe von null, wenn kein Link verfügbar ist
        };
        if (link() !== "current") {
          return (
            <MobileNavLink
              key={app.title}
              title={app.title}
              href={link()}
              linkClasses={`${app.textColor} ${"hover:" + app.textColor}`}
            />
          );
        }
      })}
      <li className="flex items-center justify-between rounded-md p-2 text-sm font-medium">
        {session?.user?.name ? (
          <p>
            <span>{session?.user?.name}</span>{" "}
            <span className="text-muted-foreground">
              &#40;{session?.user?.email}&#41;
            </span>
          </p>
        ) : (
          <p>
            <span className="text-muted-foreground">
              {session?.user?.email}
            </span>
          </p>
        )}
        <div className="flex gap-2">
          <SignOut />
          <ThemeSwitch variant="outline" />
        </div>
      </li>
    </ul>
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
      <Button variant="outline" size="icon" type="submit">
        <LogOutIcon />
      </Button>
    </form>
  );
}
