import { db } from '@northware/database/connection';
import { mainNavTable } from '@northware/database/schema';
import { eq } from 'drizzle-orm';

export async function menuData() {
  const result = await db
    .select({
      itemId: mainNavTable.itemId,
      title: mainNavTable.title,
      href: mainNavTable.href,
      childOf: mainNavTable.childOf,
    })
    .from(mainNavTable)
    .where(eq(mainNavTable.app, 'cockpit'))
    .orderBy(mainNavTable.order);

  const topLevelItems = result.filter((item) => item.childOf == null);
  const childItems = (parent: string) => {
    const children = result.filter((item) => item.childOf === parent);
    return children;
  };
  return { topLevelItems, childItems };
}

// TODO In Config-Package auslagern
export const apps: {
  title: string;
  href?: string;
  envVariable?: string;
  textColor: string;
}[] = [
  // Attribute der Navigationspunkte der AppSwitches in MetaNav
  {
    envVariable: 'NEXT_PUBLIC_CP_FRONT',
    title: 'Northware Cockpit',
    textColor: 'text-cockpit',
  },
  {
    envVariable: 'NEXT_PUBLIC_FI_FRONT',
    title: 'Northware Finance',
    textColor: 'text-finance',
  },
  {
    envVariable: 'NEXT_PUBLIC_TRD_FRONT',
    title: 'Northware Trader',
    textColor: 'text-trader',
  },
];
