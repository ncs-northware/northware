import { getUserPermissions } from "@northware/auth/account";
import { db } from "@northware/database/connection";
import { mainNavTable } from "@northware/database/schema/main-nav";
import type { ServiceType } from "@northware/service-config";
import { and, eq, inArray } from "drizzle-orm";

export async function menuData(service: ServiceType, userId?: string) {
  const userPermissions = await getUserPermissions(userId);
  const result = await db
    .select({
      itemId: mainNavTable.itemId,
      title: mainNavTable.title,
      href: mainNavTable.href,
      childOf: mainNavTable.childOf,
      permissionKey: mainNavTable.permissionKey,
    })
    .from(mainNavTable)
    .where(
      and(
        eq(mainNavTable.app, service),
        userPermissions.includes("all-access")
          ? undefined
          : inArray(mainNavTable.permissionKey, userPermissions)
      )
    )
    .orderBy(mainNavTable.order);

  const topLevelItems = result.filter((item) => item.childOf == null);
  const childItems = (parent: string) => {
    const children = result.filter((item) => item.childOf === parent);
    return children;
  };
  return { topLevelItems, childItems };
}
