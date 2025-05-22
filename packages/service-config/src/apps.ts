import type { ServiceType } from "./types";

export const suiteApps: {
  title: string;
  slug: ServiceType;
  color: string;
}[] = [
  // Attribute der Navigationspunkte der AppSwitches in MetaNav
  //   TODO: permission-based rendering
  {
    title: "Northware Cockpit",
    slug: "cockpit",
    color: "text-cockpit hover:text-cockpit focus:text-cockpit",
  },
  {
    title: "Northware Finance",
    slug: "finance",
    color: "text-finance hover:text-finance focus:text-finance",
  },
  {
    title: "Northware Trader",
    slug: "trader",
    color: "text-trader hover:text-trader focus:text-trader",
  },
  {
    title: "Northware Admin",
    slug: "admin",
    color: "text-admin hover:text-admin focus:text-admin",
  },
];
