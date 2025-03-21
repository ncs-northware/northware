import { db } from '@northware/database/connection';
import {
  accountsTable,
  permissionsToAccounts,
  permissionsToRoles,
  rolesToAccounts,
} from '@northware/database/schema';
import { eq } from 'drizzle-orm';
export async function getUserPermissions(clerkUserId?: string) {
  const user = clerkUserId || '';
  const rawRoles = await db
    .select({
      rolePermission: permissionsToRoles.permissionKey,
    })
    .from(accountsTable)
    .innerJoin(
      rolesToAccounts,
      eq(accountsTable.clerkUserId, rolesToAccounts.accountUserId)
    )
    .innerJoin(
      permissionsToRoles,
      eq(rolesToAccounts.roleKey, permissionsToRoles.roleKey)
    )
    .where(eq(accountsTable.clerkUserId, user));

  const rawAccountPermissions = await db
    .select({ accountPermission: permissionsToAccounts.permissionKey })
    .from(accountsTable)
    .innerJoin(
      permissionsToAccounts,
      eq(accountsTable.clerkUserId, permissionsToAccounts.accountUserId)
    )
    .where(eq(accountsTable.clerkUserId, user));

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
    .from(accountsTable)
    .leftJoin(
      rolesToAccounts,
      eq(accountsTable.clerkUserId, rolesToAccounts.accountUserId)
    )
    .leftJoin(
      permissionsToRoles,
      eq(rolesToAccounts.roleKey, permissionsToRoles.roleKey)
    )
    .where(eq(accountsTable.clerkUserId, clerkUserId || ''));

  const userRoles = [...new Set(rawRoles.map((role) => role.accountRole))];

  return userRoles;
}
