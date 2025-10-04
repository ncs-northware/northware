export const suiteApps: {
  title: string;
  slug: ServiceType;
}[] = [
  // Attribute der Navigationspunkte der AppSwitches in MetaNav
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
];

export type ServiceType = "cockpit" | "finance" | "trader" | "docs";
