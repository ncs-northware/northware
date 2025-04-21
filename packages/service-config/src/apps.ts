import type { ServiceType } from "./types";

export const suiteAppsMeta: {
  title: string;
  slug: ServiceType;
}[] = [
  // Attribute der Navigationspunkte der AppSwitches in MetaNav
  //   TODO: permission-based rendering
  {
    title: "Northware Cockpit",
    slug: "cockpit",
  },
  {
    title: "Northware Finance",
    slug: "finance",
  },
  {
    title: "Northware Trader",
    slug: "trader",
  },
  {
    title: "Northware Admin",
    slug: "admin",
  },
];
