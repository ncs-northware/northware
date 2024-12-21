<<<<<<<< HEAD:packages/ui/src/components_/menu/SiteHeader.tsx
import { MainNav } from "@northware/ui/components_/menu/MainNav";
import { MetaNav } from "@northware/ui/components_/menu/MetaNav";
import { MobileNav } from "@northware/ui/components_/menu/MobileNav";
========
import { MainNav } from "@northware/ui/components/menu_/MainNav";
import { MetaNav } from "@northware/ui/components/menu_/MetaNav";
import { MobileNav } from "@northware/ui/components/menu_/MobileNav";
>>>>>>>> main:packages/ui/src/components/menu_/SiteHeader.tsx

export function SiteHeader() {
  // Rendert den Zusammengesetzen SiteHeader mit MetaNav, MainNav, MobileNav usw. innerhalb von <header>
  return (
    <header>
      <MetaNav />
      <MainNav />
      <MobileNav />
    </header>
  );
}
