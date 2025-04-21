import type { ServiceType } from "./types";

export const suiteAppsMeta: {
  title: string;
  href: string;
  slug: ServiceType;
}[] = [
  // Attribute der Navigationspunkte der AppSwitches in MetaNav
  //   TODO: permission-based rendering
  {
    title: "Northware Cockpit",
    href: "http://localhost:40110",
    slug: "cockpit",
  },
  {
    title: "Northware Finance",
    href: "http://localhost:40120",
    slug: "finance",
  },
  {
    title: "Northware Trader",
    href: "http://localhost:40130",
    slug: "trader",
  },
  {
    title: "Admin Panel",
    href: "http://localhost:40100",
    slug: "admin",
  },
];
