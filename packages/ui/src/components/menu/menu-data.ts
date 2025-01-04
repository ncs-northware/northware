import { db } from '@northware/database/connection';
import { mainNavTable } from '@northware/database/schema';
import type { ServiceType } from '@northware/service-config';
import { eq } from 'drizzle-orm';

export async function menuData(service: ServiceType) {
  const result = await db
    .select({
      itemId: mainNavTable.itemId,
      title: mainNavTable.title,
      href: mainNavTable.href,
      childOf: mainNavTable.childOf,
    })
    .from(mainNavTable)
    .where(eq(mainNavTable.app, service))
    .orderBy(mainNavTable.order);

  const topLevelItems = result.filter((item) => item.childOf == null);
  const childItems = (parent: string) => {
    const children = result.filter((item) => item.childOf === parent);
    return children;
  };
  return { topLevelItems, childItems };
}

export const suiteAppsMeta: {
  title: string;
  envVariable: string;
  slug: 'cockpit' | 'admin' | 'finance' | 'trader';
  textColor: string;
}[] = [
  // Attribute der Navigationspunkte der AppSwitches in MetaNav
  {
    title: 'Northware Cockpit',
    envVariable: 'NEXT_PBLIC_COCKPIT_URL',
    slug: 'cockpit',
    textColor: 'text-cockpit',
  },
  {
    title: 'Northware Finance',
    envVariable: 'NEXT_PUBLIC_FINANCE_URL',
    slug: 'finance',
    textColor: 'text-finance',
  },
  {
    title: 'Northware Trader',
    envVariable: 'NEXT_PUBLIC_TRADER_URL',
    slug: 'trader',
    textColor: 'text-trader',
  },
  {
    title: 'Admin Panel',
    envVariable: 'NEXT_PUBLIC_ADMIN_URL',
    slug: 'admin',
    textColor: 'text-foreground',
  },
];
