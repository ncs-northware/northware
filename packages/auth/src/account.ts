import { db } from "@northware/database/connection";
import {
  permissionsToAccounts,
  permissionsToRoles,
  rolesToAccounts,
} from "@northware/database/schema";
import { eq } from "drizzle-orm";
export async function getUserPermissions(clerkUserId?: string) {
  const user = clerkUserId || "";
  const rawRoles = await db
    .select({
      rolePermission: permissionsToRoles.permissionKey,
    })
    .from(rolesToAccounts)
    .innerJoin(
      permissionsToRoles,
      eq(rolesToAccounts.roleKey, permissionsToRoles.roleKey)
    )
    .where(eq(rolesToAccounts.accountUserId, user));

  const rawAccountPermissions = await db
    .select({ accountPermission: permissionsToAccounts.permissionKey })
    .from(permissionsToAccounts)
    .where(eq(permissionsToAccounts.accountUserId, user));

  const userPermissions = [
    ...new Set(
      rawRoles
        .map((role) => role.rolePermission)
        .concat(
          rawAccountPermissions.map(
            (permission) => permission.accountPermission
          )
        )
    ),
  ];

  return userPermissions;
}

export async function getUserRoles(
  clerkUserId: string
): Promise<(string | null)[]> {
  const rawRoles = await db
    .select({
      accountRole: rolesToAccounts.roleKey,
    })
    .from(rolesToAccounts)
    .where(eq(rolesToAccounts.accountUserId, clerkUserId || ""));

  const userRoles = [...new Set(rawRoles.map((role) => role.accountRole))];

  return userRoles;
}
