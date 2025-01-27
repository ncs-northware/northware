import { SignOutButton } from '@northware/auth/clerk';
import { currentUser } from '@northware/auth/clerk';
import { type ServiceType, suiteAppsMeta } from '@northware/service-config';
import { Brand } from '@northware/ui/components/base/brand';
import { Button } from '@northware/ui/components/base/button';
import {
  appTextColors,
  menuData,
} from '@northware/ui/components/menu/menu-data';
import { MobileNavLink } from '@northware/ui/components/menu/nav-links';
import { ThemeSwitch } from '@northware/ui/components/menu/theme-switch';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@northware/ui/components/panels/accordion';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@northware/ui/components/panels/dialog';
import { LogOutIcon, MenuIcon } from 'lucide-react';
import Link from 'next/link';
import { navigationMenuButtonStyle } from './navigation-menu-premitive';

export async function MobileNav({ service }: { service: ServiceType }) {
  const menuItems = await menuData(service);

  return (
    <div className="container flex justify-between py-4 md:hidden">
      <div className="ml-3 flex items-center gap-3">
        <Link href="/">
          <Brand service={service} />
        </Link>
      </div>
      <div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className={navigationMenuButtonStyle()} variant="blank">
              <MenuIcon className="h-6 w-6" />
            </Button>
          </DialogTrigger>
          <DialogContent
            aria-describedby="Hauptmenü"
            className="data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 flex flex-col border-b"
          >
            <DialogTitle className="font-semibold">
              <Link href="/">
                <Brand service={service} />
              </Link>
            </DialogTitle>

            <div className="flex flex-1 flex-col justify-between">
              <ul className="grid gap-1">
                <MobileNavLink href="/" title="Home" />
                {menuItems.topLevelItems.map((item) => {
                  const ItemChildren = menuItems.childItems(item.itemId);
                  if (ItemChildren.length === 0) {
                    // Top-Level-Element ohne Unterpunkte
                    return (
                      <MobileNavLink
                        key={item.itemId}
                        href={item.href}
                        title={item.title}
                      />
                    );
                  }
                  return (
                    // Top-Level-Element mit Unterpunkten
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
                })}
              </ul>
              <MobileNavMeta service={service} />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
async function MobileNavMeta({ service }: { service: ServiceType }) {
  const user = await currentUser();
  return (
    <ul className="grid gap-1 border-border/50 border-t py-4 dark:border-border/70">
      {suiteAppsMeta.map((app) => {
        if (app.slug !== service) {
          return (
            <MobileNavLink
              key={app.title}
              title={app.title}
              href={app.href || '#'}
              linkClasses={`${appTextColors.get(app.slug)} ${`hover:${appTextColors.get(app.slug)}`}`}
            />
          );
        }
      })}
      <li className="flex items-center justify-between rounded-md p-2 font-medium text-sm">
        {user?.firstName !== null || user?.lastName !== null ? (
          <p>
            <span>
              {user?.firstName !== null ? user?.firstName : null}{' '}
              {user?.lastName !== null ? user?.lastName : null}
            </span>{' '}
            <span className="text-muted-foreground">
              &#40;{user?.emailAddresses[0].emailAddress}&#41;
            </span>
          </p>
        ) : (
          <p>
            <span className="text-muted-foreground">
              {user?.emailAddresses[0].emailAddress}
            </span>
          </p>
        )}
        <div className="flex gap-2">
          <SignOutButton>
            <Button type="submit" size="icon" variant="outline">
              <LogOutIcon />
            </Button>
          </SignOutButton>
          <ThemeSwitch variant="outline" />
        </div>
      </li>
    </ul>
  );
}
