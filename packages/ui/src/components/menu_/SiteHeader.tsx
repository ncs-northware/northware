import { MainNav } from "@northware/ui/components/menu_/MainNav";
import { MetaNav } from "@northware/ui/components/menu_/MetaNav";
import { MobileNav } from "@northware/ui/components/menu_/MobileNav";

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
