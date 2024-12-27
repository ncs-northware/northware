import { MainNav } from "@northware/ui/components/menu/MainNav";
import { MobileNav } from "@northware/ui/components/menu/MobileNav";

export function SiteHeader() {
  // Rendert den Zusammengesetzen SiteHeader mit MetaNav, MainNav, MobileNav usw. innerhalb von <header>
  return (
    <header className="border-b border-border/50 dark:border-border/70">
      <MainNav />
      <MobileNav />
    </header>
  );
}
