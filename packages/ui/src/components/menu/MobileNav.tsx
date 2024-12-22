import { Brand } from "@northware/ui/components/base/Brand";
import { Button } from "@northware/ui/components/base/Button";
import { menuData } from "@northware/ui/components/menu/menuData";
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
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { navigationMenuButtonStyle } from "./NavigationMenuPremitive";
import { MobileNavLink } from "@northware/ui/components/menu/NavLinks";

export async function MobileNav() {
  const menuItems = await menuData();

  return (
    <div className="flex justify-between p-4 md:hidden">
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
            <div className="flex flex-1 flex-col justify-between gap-8">
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
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
