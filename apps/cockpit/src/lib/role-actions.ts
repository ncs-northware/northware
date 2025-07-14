"use server";

import { db } from "@northware/database/connection";
import { handleNeonError } from "@northware/database/neon-error-handling";
import {
  permissionsTable,
  permissionsToAccounts,
  permissionsToRoles,
  rolesTable,
  rolesToAccounts,
} from "@northware/database/schema";
import { and, eq, inArray, ne } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { cache } from "react";
import type {
  TCreatePermissionDetailFormSchema,
  TCreateRoleFormData,
  TPermissionDetailFormSchema,
  TRoleDetailFormSchema,
} from "@/lib/rbac-schema";
import type {
  TPermissionListResponse,
  TRoleListResponse,
  TRoleWithPermissions,
  TUpdatePermissionsParams,
  TUpdateRolesParams,
} from "@/lib/rbac-types";

/************ Role Management **************************************/

export async function getRoleList(): Promise<TRoleListResponse> {
  try {
    const response = await db
      .select({
        recordId: rolesTable.recordId,
        roleKey: rolesTable.roleKey,
        roleName: rolesTable.roleName,
        permissionKey: permissionsTable.permissionKey,
        permissionName: permissionsTable.permissionName,
      })
      .from(rolesTable)
      .leftJoin(
        permissionsToRoles,
        eq(rolesTable.roleKey, permissionsToRoles.roleKey)
      )
      .leftJoin(
        permissionsTable,
        eq(permissionsToRoles.permissionKey, permissionsTable.permissionKey)
      )
      .orderBy(rolesTable.roleKey);

    const result: Record<string, TRoleWithPermissions> = {};
    for (const item of response) {
      if (!result[item.roleKey]) {
        result[item.roleKey] = {
          recordId: item.recordId,
          roleKey: item.roleKey,
          roleName: item.roleName,
          permissions: [],
        };
      }

      if (item.permissionKey !== null) {
        result[item.roleKey].permissions.push({
          permissionKey: item.permissionKey,
          permissionName: item.permissionName,
        });
      }
    }
    return { success: true, roleList: Object.values(result) };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error
          : new Error("Es ist ein unerwarteter Fehler aufgetreten."),
    };
  }
}

export async function updateUserRoles({
  data,
  userRolesResponse,
  userId,
}: TUpdateRolesParams) {
  // filtert aus den übergebenen Formulardaten die roleKeys der aktiven Switches heraus

  // enthält roleKeys, die in selecctedRoles aber nicht in userRolesResponse enthalten sind
  const rolesToAdd = data.roles.filter(
    (role) => !userRolesResponse.includes(role)
  );
  // enthält roleKeys, die in userRolesRespnse aber nicht in selectedRoles enthalten sind
  const rolesToRemove = userRolesResponse
    .filter((userrole) => userrole !== undefined)
    .filter((userRole) => !data.roles.includes(userRole));

  const insertRoles: { roleKey: string; accountUserId: string }[] = [];
  rolesToAdd.forEach((role, i) => {
    insertRoles[i] = { roleKey: role, accountUserId: userId };
  });

  try {
    // fügt neue Rollen (insertRoles) in die Datenbank Tabelle RolesToAcconts ein
    if (insertRoles.length > 0) {
      await db
        .insert(rolesToAccounts)
        .values(insertRoles)
        .onConflictDoNothing();
    }

    // entfernt Rollen (rolesToRemove) aus der Datenbank Tabelle RolesToAccounts
    if (rolesToRemove.length > 0) {
      await db
        .delete(rolesToAccounts)
        .where(
          and(
            inArray(rolesToAccounts.roleKey, rolesToRemove),
            eq(rolesToAccounts.accountUserId, userId)
          )
        );
    }
    revalidatePath("admin/user");
  } catch (error) {
    handleNeonError(error);
  }
}

export const getRole = cache(
  async (
    recordId: number
  ): Promise<
    | {
        success: true;
        role: { recordId: number; roleKey: string; roleName: string | null };
        permissions: string[];
      }
    | { success: false; error: Error }
  > => {
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

      if (roleResponse.length === 0) {
        throw new Error("Es wurde keine Rolle gefunden."); // Gebe null zurück, wenn keine Rolle gefunden wurde
      }

      const role = roleResponse[0];

      const permissionsResponse = await db
        .select({ permissionKey: permissionsToRoles.permissionKey })
        .from(permissionsToRoles)
        .where(eq(permissionsToRoles.roleKey, role.roleKey));

      const permissions = [
        ...new Set(
          permissionsResponse.map((permission) => permission.permissionKey)
        ),
      ];

      return {
        success: true,
        role: roleResponse[0],
        permissions,
      };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error
            ? error
            : new Error("Es ist ein unerwarteter Fehler aufgetreten."),
      };
    }
  }
);

export async function createRole(data: TCreateRoleFormData) {
  const insertPermissions: { permissionKey: string; roleKey: string }[] = [];
  data.permissions.forEach((permission, i) => {
    insertPermissions[i] = {
      permissionKey: permission,
      roleKey: data.roleKey,
    };
  });
  try {
    await db
      .insert(rolesTable)
      .values({ roleKey: data.roleKey, roleName: data.roleName });

    if (insertPermissions.length > 0) {
      await db
        .insert(permissionsToRoles)
        .values(insertPermissions)
        .onConflictDoNothing();
    }
  } catch (error) {
    handleNeonError(error);
  }
}

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
  data: { permissions: string[] };
  rolePermissions: string[];
  roleKey?: string;
}) {
  // enthält permissionKeys, die in selecctedPermissions aber nicht in extraPermissionsResponse enthalten sind
  const permissionsToAdd = data.permissions.filter(
    (selectedPermission) => !rolePermissions.includes(selectedPermission)
  );
  // enthält permissionKeys, die in extraPermissionsResponse aber nicht in selectedPermissions enthalten sind
  const permissionsToRemove = rolePermissions
    .filter((permission) => permission !== null)
    .filter((perm) => !data.permissions.includes(perm));

  const insertPermissions: {
    permissionKey: string;
    roleKey: string;
  }[] = [];
  permissionsToAdd.forEach((permission, i) => {
    if (roleKey) {
      insertPermissions[i] = { permissionKey: permission, roleKey };
    }
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
  } catch (error) {
    handleNeonError(error);
  }
}

/************ Permission Management *************************************/

export async function getPermissionList(): Promise<TPermissionListResponse> {
  try {
    const response = await db
      .select({
        recordId: permissionsTable.recordId,
        permissionKey: permissionsTable.permissionKey,
        permissionName: permissionsTable.permissionName,
      })
      .from(permissionsTable)
      .where(ne(permissionsTable.permissionKey, "all-access"))
      .orderBy(permissionsTable.permissionKey);

    return { success: true, permissionList: response };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error
          : new Error("Es ist ein unerwarteter Fehler aufgetreten."),
    };
  }
}

export async function updateUserPermissions({
  data,
  extraPermissionsResponse,
  userId,
}: TUpdatePermissionsParams) {
  // enthält permissionKeys, die in selecctedPermissions aber nicht in extraPermissionsResponse enthalten sind
  const permissionsToAdd = data.permissions.filter(
    (selectedPermission) =>
      !extraPermissionsResponse.includes(selectedPermission)
  );
  // enthält permissionKeys, die in extraPermissionsResponse aber nicht in selectedPermissions enthalten sind
  const permissionsToRemove = extraPermissionsResponse
    .filter(
      (extraPermission): extraPermission is string => extraPermission !== null
    )
    .filter((userRole) => !data.permissions.includes(userRole));

  const insertPermissions: { permissionKey: string; accountUserId: string }[] =
    [];
  permissionsToAdd.forEach((permission, i) => {
    insertPermissions[i] = { permissionKey: permission, accountUserId: userId };
  });

  try {
    // fügt neue Berechtigungen (insertPermissions) in die Datenbank Tabelle PermissionsToAccounts ein
    if (insertPermissions.length > 0) {
      await db
        .insert(permissionsToAccounts)
        .values(insertPermissions)
        .onConflictDoNothing();
    }

    // entfernt Berechtigungen (permissionsToRemove) aus der Datenbank Tabelle PermissionsToAccounts
    if (permissionsToRemove.length > 0) {
      await db
        .delete(permissionsToAccounts)
        .where(
          and(
            inArray(permissionsToAccounts.permissionKey, permissionsToRemove),
            eq(permissionsToAccounts.accountUserId, userId)
          )
        );
    }
    revalidatePath("admin/user");
  } catch (error) {
    handleNeonError(error);
  }
}

export async function deletePermission(recordId: number) {
  try {
    await db
      .delete(permissionsTable)
      .where(eq(permissionsTable.recordId, recordId));
    revalidatePath("admin/permission");
  } catch (error) {
    handleNeonError(error);
  }
}

export async function createPermDetails(
  data: TCreatePermissionDetailFormSchema
) {
  try {
    await db.insert(permissionsTable).values({
      permissionKey: data.permissionKey,
      permissionName: data.permissionName,
    });
    revalidatePath("/admin/permission");
  } catch (error) {
    handleNeonError(error);
  }
}

export async function updatePermDetails(data: TPermissionDetailFormSchema) {
  try {
    await db
      .update(permissionsTable)
      .set({
        permissionKey: data.permissionKey,
        permissionName: data.permissionName,
      })
      .where(eq(permissionsTable.recordId, data.recordId));
    revalidatePath("/admin/permission");
  } catch (error) {
    handleNeonError(error);
  }
}
