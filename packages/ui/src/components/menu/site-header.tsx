import type { ServiceType } from '@northware/service-config';
import { MainNav } from '@northware/ui/components/menu/main-nav';
import { MobileNav } from '@northware/ui/components/menu/mobile-nav';

export function SiteHeader({ service }: { service: ServiceType }) {
  // Rendert den Zusammengesetzen SiteHeader mit MetaNav, MainNav, MobileNav usw. innerhalb von <header>
  return (
    <header className="border-border/50 border-b dark:border-border/70">
      <MainNav service={service} />
      <MobileNav service={service} />
    </header>
  );
}
