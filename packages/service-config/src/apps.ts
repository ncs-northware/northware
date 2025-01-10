export const suiteAppsMeta: {
  title: string;
  href: string;
  slug: 'cockpit' | 'admin' | 'finance' | 'trader';
  textColor: string;
}[] = [
  // Attribute der Navigationspunkte der AppSwitches in MetaNav
  //   TODO: permission-based rendering
  {
    title: 'Northware Cockpit',
    href: 'http://localhost:40110',
    slug: 'cockpit',
    textColor: 'text-cockpit',
  },
  {
    title: 'Northware Finance',
    href: 'http://localhost:40120',
    slug: 'finance',
    textColor: 'text-finance',
  },
  {
    title: 'Northware Trader',
    href: 'http://localhost:40130',
    slug: 'trader',
    textColor: 'text-trader',
  },
  {
    title: 'Admin Panel',
    href: 'http://localhost:40190',
    slug: 'admin',
    textColor: 'text-foreground',
  },
];
