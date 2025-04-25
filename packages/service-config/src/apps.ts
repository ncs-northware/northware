import type { ServiceType } from "./types";

export const suiteAppsMeta: {
  title: string;
  slug: ServiceType;
  color: string;
}[] = [
  // Attribute der Navigationspunkte der AppSwitches in MetaNav
  //   TODO: permission-based rendering
  {
    title: "Northware Cockpit",
    slug: "cockpit",
    color: "text-cockpit hover:text-cockpit",
  },
  {
    title: "Northware Finance",
    slug: "finance",
    color: "text-finance hover:text-finance",
  },
  {
    title: "Northware Trader",
    slug: "trader",
    color: "text-trader hover:text-trader",
  },
  {
    title: "Northware Admin",
    slug: "admin",
    color: "text-admin hover:text-admin",
  },
];
