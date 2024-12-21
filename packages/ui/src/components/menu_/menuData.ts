import { db } from "@northware/database/connection";
import { mainNavTable } from "@northware/database/schema";
import { eq } from "drizzle-orm";

export async function menuData() {
  const result = await db
    .select({
      itemId: mainNavTable.itemId,
      title: mainNavTable.title,
      href: mainNavTable.href,
      childOf: mainNavTable.childOf,
    })
    .from(mainNavTable)
    .where(eq(mainNavTable.app, "cockpit"))
    .orderBy(mainNavTable.order);

  const topLevelItems = result.filter((item) => item.childOf == null);
  const childItems = (parent: string) => {
    const children = result.filter((item) => item.childOf == parent);
    return children;
  };
  return { topLevelItems, childItems };
}
