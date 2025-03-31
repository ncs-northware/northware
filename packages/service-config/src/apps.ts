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
    href: "http://localhost:40190",
    slug: "admin",
  },
];

export const storybookThemes = {
  default: "theme-cockpit",
  items: [
    {
      title: "Cockpit Light",
      value: "theme-cockpit",
    },
    {
      title: "Cockpit Dark",
      value: "theme-cockpit dark",
    },
    {
      title: "Finance Light",
      value: "theme-finance",
    },
    {
      title: "Finance Dark",
      value: "theme-finance dark",
    },
    {
      title: "Trader Light",
      value: "theme-trader",
    },
    {
      title: "Trader Dark",
      value: "theme-trader dark",
    },
    {
      title: "Admin Panel Light",
      value: "theme-admin",
    },
    {
      title: "Admin Panel Dark",
      value: "theme-admin dark",
    },
  ],
};
