import Image from "next/image";
import { Button } from "@northware/ui/components_/base/Button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@northware/ui/components_/panels/Accordion";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@northware/ui/components_/panels/Dialog";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { navigationMenuButtonStyle } from "./NavigationMenuPremitive";
<<<<<<<< HEAD:packages/ui/src/components_/menu/MobileNav.tsx
import { menuData } from "@northware/ui/components_/menu/menuData";
import { Brand } from "@northware/ui/components_/base/Brand";
========
import { menuData } from "@northware/ui/components/menu_/menuData";
import { Brand } from "@northware/ui/components/base/Brand";
>>>>>>>> main:packages/ui/src/components/menu_/MobileNav.tsx

export async function MobileNav() {
  const menuItems = await menuData();

  return (
    <div className="flex justify-between p-4 md:hidden">
      <div className="ml-3 flex items-center gap-3">
        <Brand />
      </div>
      <div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="blank" className={navigationMenuButtonStyle()}>
              <MenuIcon className="h-6 w-6" />
            </Button>
          </DialogTrigger>
          <DialogContent className="inset-x-0 top-0 flex flex-col border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top">
            <DialogTitle className="font-semibold">
              <Brand />
            </DialogTitle>
            <div className="flex flex-1 flex-col justify-between gap-8">
              <ul className="grid gap-1">
                {menuItems.topLevelItems.map((item) => {
                  const ItemChildren = menuItems.childItems(item.itemId);
                  if (ItemChildren.length == 0) {
                    return (
                      <li className="group w-full" key={item.itemId}>
                        <Link
                          className="flex flex-1 items-center justify-between border-b py-4 font-medium transition-all hover:underline"
                          href={item.href}
                        >
                          {item.title}
                        </Link>
                      </li>
                    );
                  } else {
                    return (
                      <li key={item.itemId}>
                        <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value="id">
                            <AccordionTrigger>{item.title}</AccordionTrigger>
                            <AccordionContent>
                              <ul>
                                <li className="group w-full">
                                  <Link
                                    href={item.href}
                                    className="flex select-none items-center gap-2 space-y-1 rounded-md bg-primary/60 p-3 font-medium leading-none text-primary-foreground no-underline outline-none transition-colors hover:bg-primary/80"
                                  >
                                    <div className="text-sm font-medium leading-none">
                                      {item.title}
                                    </div>
                                  </Link>
                                </li>
                                {ItemChildren.map((child) => {
                                  return (
                                    <li
                                      className="group w-full"
                                      key={child.itemId}
                                    >
                                      <Link
                                        href={child.href}
                                        className="flex select-none items-center gap-2 space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                      >
                                        <div className="text-sm font-medium leading-none">
                                          {child.title}
                                        </div>
                                      </Link>
                                    </li>
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
