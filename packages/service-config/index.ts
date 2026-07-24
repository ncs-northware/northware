export const suiteApps: {
  title: string;
  slug: ServiceType;
}[] = [
  // Attribute der Navigationspunkte der AppSwitches
  {
    slug: "cockpit",
    title: "Northware Cockpit",
  },
  {
    slug: "finance",
    title: "Northware Finance",
  },
  {
    slug: "trader",
    title: "Northware Trader",
  },
];

export type ServiceType = "cockpit" | "finance" | "trader" | "docs";
