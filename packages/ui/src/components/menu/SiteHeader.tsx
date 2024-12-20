import { MainNav } from "@northware/ui/components/menu/MainNav";
import { MetaNav } from "@northware/ui/components/menu/MetaNav";
import { MobileNav } from "@northware/ui/components/menu/MobileNav";

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
