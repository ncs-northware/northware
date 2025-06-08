"use server";

import type { TRoleDetailFormSchema } from "@/components/role-forms";
import { db } from "@northware/database/connection";
import { handleNeonError } from "@northware/database/neon-error-handling";
import { permissionsToRoles, rolesTable } from "@northware/database/schema";
import { and, eq, inArray } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { cache } from "react";

export const getRole = cache(async (recordId: number) => {
  try {
    const roleResponse = await db
      .select({
        recordId: rolesTable.recordId,
        roleKey: rolesTable.roleKey,
        roleName: rolesTable.roleName,
      })
      .from(rolesTable)
      .limit(1)
      .where(eq(rolesTable.recordId, recordId));

    const permissionsResponse = await db
      .select({ permissionKey: permissionsToRoles.permissionKey })
      .from(permissionsToRoles)
      .where(eq(permissionsToRoles.roleKey, roleResponse[0].roleKey));

    const permissions = [
      ...new Set(
        permissionsResponse.map((permission) => permission.permissionKey)
      ),
    ];

    return {
      role: roleResponse[0],
      permissions: permissions,
    };
  } catch (error) {
    console.error(error);
  }
});

export async function updateRoleDetails(data: TRoleDetailFormSchema) {
  try {
    await db
      .update(rolesTable)
      .set({ roleKey: data.roleKey, roleName: data.roleName })
      .where(eq(rolesTable.recordId, data.recordId));
    revalidatePath("/admin/role");
  } catch (error) {
    handleNeonError(error);
  }
}

export async function updateRolePermissions({
  data,
  rolePermissions,
  roleKey,
}: {
  data: { [x: string]: boolean | undefined };
  rolePermissions: string[];
  roleKey?: string;
}) {
  // filtert aus den übergebenen Formulardaten die permissionKeys der aktiven Switches heraus
  const selectedPermissions = Object.entries(data)
    .filter(([_, value]) => value) // Nur ausgewählte Berechtigungen (value === true)
    .map(([permissionKey]) => permissionKey); // Extrahiere die permissionKeys

  // enthält permissionKeys, die in selecctedPermissions aber nicht in extraPermissionsResponse enthalten sind
  const permissionsToAdd = selectedPermissions.filter(
    (selectedPermission) => !rolePermissions.includes(selectedPermission)
  );
  // enthält permissionKeys, die in extraPermissionsResponse aber nicht in selectedPermissions enthalten sind
  const permissionsToRemove = rolePermissions
    .filter((permission): permission is string => permission !== null)
    .filter((perm) => !selectedPermissions.includes(perm));

  const insertPermissions = new Array();
  permissionsToAdd.forEach((permission, i) => {
    insertPermissions[i] = { permissionKey: permission, roleKey: roleKey };
  });

  try {
    // fügt neue Berechtigungen (insertPermissions) in die Datenbank Tabelle PermissionsToAccounts ein
    if (insertPermissions.length > 0) {
      await db
        .insert(permissionsToRoles)
        .values(insertPermissions)
        .onConflictDoNothing();
    }
    // entfernt Berechtigungen (permissionsToRemove) aus der Datenbank Tabelle PermissionsToAccounts
    if (permissionsToRemove.length > 0) {
      await db
        .delete(permissionsToRoles)
        .where(
          and(
            inArray(permissionsToRoles.permissionKey, permissionsToRemove),
            eq(permissionsToRoles.roleKey, roleKey || "")
          )
        );
    }
    revalidatePath("admin/role");
  } catch (error) {
    handleNeonError(error);
  }
}

export async function deleteRole(recordId: number) {
  try {
    await db.delete(rolesTable).where(eq(rolesTable.recordId, recordId));
    revalidatePath("/admin/role");
  } catch (error) {
    handleNeonError(error);
  }
}
