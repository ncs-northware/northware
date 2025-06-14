"use server";

import type {
  TChangePasswordFormSchema,
  TCreateEMailAddressFormSchema,
  TCreateUserFormSchema,
  TUpdateUserFormSchema,
} from "@/lib/user-schema";
import { clerkClient, currentUser } from "@northware/auth/server";
import { db } from "@northware/database/connection";
import { handleNeonError } from "@northware/database/neon-error-handling";
import {
  permissionsTable,
  permissionsToAccounts,
  permissionsToRoles,
  rolesTable,
  rolesToAccounts,
} from "@northware/database/schema";
import { and, eq, inArray } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { cache } from "react";

/****************** Clerk User **********************/
interface ClerkError {
  errors: Array<{
    code: string;
    message: string;
    meta: { paramName: string };
  }>;
}

function handleClerkError(typesafeError: ClerkError) {
  const errorMessages: string[] = [];
  if (typesafeError.errors) {
    typesafeError.errors.map((error) => {
      switch (error.code) {
        case "form_password_length_too_short":
          errorMessages.push(
            "Das Passwort muss mindestens 8 Zeichen lang sein."
          );
          break;
        case "form_password_size_in_bytes_exceeded":
          errorMessages.push("Das Passwort darf maximal 72 Zeichen lang sein.");
          break;
        case "form_password_pwned":
          errorMessages.push(
            "Dies ist ein kompromitiertes Passwort. Bitte nutzen Sie ein anderes Passwort."
          );
          break;
        case "form_username_invalid_length":
          errorMessages.push(
            "Der Benutzername muss zwischen 4 und 64 Zeichen lang sein."
          );
          break;
        case "form_param_format_invalid":
          errorMessages.push("Bitte geben Sie eine gültige E-Mail Adresse an.");
          break;
        case "form_identifier_exists":
          switch (error.meta.paramName) {
            case "email_address":
              errorMessages.push(
                "Diese E-Mail Adresse ist bereits registriert."
              );
              break;
            case "username":
              errorMessages.push("Dieser Benutzername ist bereits vergeben.");
              break;
            default:
              errorMessages.push(
                "Der Username oder die E-Mail-Adresse ist bereits vergeben."
              );
              break;
          }
          break;
        default:
          errorMessages.push(
            `Es ist ein Fehler aufgetreten: ${error.message} (Fehlercode: ${error.code})` ||
              "Es ist ein unbekannter Fehler bei der Kommunikation mit dem Server aufgetreten."
          );
          break;
      }
    });
  } else {
    errorMessages.push(
      "Es ist ein unbekannter Fehler beim Aktualisieren des Nutzers aufgetreten."
    );
  }
  if (errorMessages.length > 0) {
    throw new Error(JSON.stringify(errorMessages));
  }
}

export async function getUsers() {
  try {
    const loggedInUser = await currentUser();
    const client = await clerkClient();
    const response = await client.users.getUserList();
    const users = response.data
      .filter((user) => user.id !== loggedInUser?.id)
      .map((user) => {
        const primaryEmail = user.emailAddresses.find(
          (email) => email.id === user.primaryEmailAddressId
        )?.emailAddress;
        return {
          id: user.id,
          fullName: user.fullName,
          email: primaryEmail,
          username: user.username,
        };
      });
    return users;
  } catch {
    return null;
  }
}

export const getSingleUser = cache(async (id: string) => {
  try {
    const client = await clerkClient();
    const response = await client.users.getUser(id);
    const user_emailAddresses = response.emailAddresses
      .map((email) => ({
        id: email.id,
        emailAddress: email.emailAddress,
        verificationStatus: email.verification?.status,
      }))
      .sort((a, b) => {
        if (a.id === response.primaryEmailAddressId) {
          return -1; // 'a' kommt zuerst
        }
        if (b.id === response.primaryEmailAddressId) {
          return 1; // 'b' kommt zuerst
        }
        // Alphabetische Sortierung der übrigen E-Mail-Adressen
        return a.emailAddress.localeCompare(b.emailAddress);
      });
    return {
      id: response.id,
      firstName: response.firstName,
      lastName: response.lastName,
      fullName: response.fullName,
      username: response.username,
      emailAddresses: user_emailAddresses,
      primaryEmailAddressId: response.primaryEmailAddressId,
    };
  } catch (error) {
    // FIXME: Kann dieser Error in eine global-error Seite eingebaut werden?
    console.error(error);
  }
});

export async function createUser(formData: TCreateUserFormSchema) {
  const { firstName, lastName, username, emailAddress, password } = formData;
  try {
    const client = await clerkClient();
    await client.users.createUser({
      firstName: firstName,
      lastName: lastName,
      username: username,
      emailAddress: [emailAddress],
      password: password,
    });
    revalidatePath("/admin");
  } catch (error) {
    const typesafeError = error as ClerkError;
    handleClerkError(typesafeError);
  }
}

export async function updateUser(formData: TUpdateUserFormSchema, id?: string) {
  if (typeof id === "undefined") {
    new Error(
      "Beim Aufruf der Funktion wurde nicht angegeben, welche Id der User hat."
    );
  } else {
    const { username, firstName, lastName } = formData;

    try {
      const client = await clerkClient();
      await client.users.updateUser(id, {
        username: username,
        firstName: firstName,
        lastName: lastName,
      });
      revalidatePath("/user");
    } catch (error) {
      const typesafeError = error as ClerkError;
      handleClerkError(typesafeError);
    }
  }
}

export async function deleteUser(id: string) {
  try {
    const client = await clerkClient();
    await client.users.deleteUser(id);
    revalidatePath("/user");
    // TODO: Rollen und permissions löschen
  } catch (error) {
    const typesafeError = error as ClerkError;
    handleClerkError(typesafeError);
  }
}

export async function createEmailAddress(
  formData: TCreateEMailAddressFormSchema,
  userId?: string
) {
  if (typeof userId === "undefined") {
    new Error(
      "Beim Aufruf der Funktion wurde nicht angegeben, welche Id der User hat."
    );
  } else {
    const { emailAddress, verified, primary } = formData;
    try {
      const client = await clerkClient();
      await client.emailAddresses.createEmailAddress({
        userId: userId,
        emailAddress: emailAddress,
        verified: verified,
        primary: primary,
      });
      revalidatePath("/user");
    } catch (error) {
      const typesafeError = error as ClerkError;
      handleClerkError(typesafeError);
    }
  }
}

export async function updateEmailAddress(
  addressId: string,
  mode: "primary" | "verification",
  verification?: boolean
) {
  try {
    const client = await clerkClient();
    if (mode === "primary") {
      await client.emailAddresses.updateEmailAddress(addressId, {
        primary: true,
      });
    }
    if (mode === "verification") {
      await client.emailAddresses.updateEmailAddress(addressId, {
        verified: verification,
      });
    }
    revalidatePath("/user");
  } catch (error) {
    const typesafeError = error as ClerkError;
    handleClerkError(typesafeError);
  }
}

export async function deleteEmailAddress(addressId: string) {
  try {
    const client = await clerkClient();
    await client.emailAddresses.deleteEmailAddress(addressId);
    revalidatePath("/user");
  } catch (error) {
    const typesafeError = error as ClerkError;
    handleClerkError(typesafeError);
  }
}

export async function changePassword(
  id: string | undefined,
  formData: TChangePasswordFormSchema
) {
  if (typeof id === "undefined") {
    new Error(
      "Beim Aufruf der Funktion wurde nicht angegeben, welche ID der User hat."
    );
  } else if (formData.newPassword === formData.confirmPassword) {
    try {
      const client = await clerkClient();
      await client.users.updateUser(id, {
        password: formData.newPassword,
        skipPasswordChecks: formData.skipChecks,
        signOutOfOtherSessions: formData.signOutSessions,
      });
      revalidatePath("/user");
    } catch (error) {
      const typesafeError = error as ClerkError;
      handleClerkError(typesafeError);
    }
  } else {
    new Error("Die eingegebenen Passwörter stimmen nicht überein.");
  }
}

/******************* User Accounts ********************/

export type TRoleList = {
  roleKey: string;
  roleName: string | null;
  permissionKey: string | null;
  permissionName: string | null;
};

// Typdefinition für result
export type RoleWithPermissions = {
  recordId: number;
  roleKey: string;
  roleName: string | null;
  permissions: Array<{
    permissionKey: string | null;
    permissionName: string | null;
  }>;
};

export type TRoleListResponse =
  | { success: true; roleList: RoleWithPermissions[] }
  | { success: false; error: Error };

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
      );

    const result: Record<string, RoleWithPermissions> = {};
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
      error: error instanceof Error ? error : new Error("Unknown Error"),
    };
  }
}

// Typdefinition für result
type PermissionType = {
  permissionKey: string;
  permissionName: string | null;
};

export type TPermissionListResponse =
  | { success: true; permissionList: PermissionType[] }
  | { success: false; error: Error };

export async function getPermissionList(): Promise<TPermissionListResponse> {
  try {
    const response = await db
      .select({
        permissionKey: permissionsTable.permissionKey,
        permissionName: permissionsTable.permissionName,
      })
      .from(permissionsTable);

    return { success: true, permissionList: response };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error : new Error("Unknown Error"),
    };
  }
}

type UpdateRolesParams = {
  data: { [x: string]: boolean | undefined };
  userRolesResponse: (string | null)[];
  userId: string;
};

export async function updateRoles({
  data,
  userRolesResponse,
  userId,
}: UpdateRolesParams) {
  // filtert aus den übergebenen Formulardaten die roleKeys der aktiven Switches heraus
  const selectedRoles = Object.entries(data)
    .filter(([_, value]) => value) // Nur ausgewählte Rollen (value === true)
    .map(([roleKey]) => roleKey); // Extrahiere die roleKeys

  // enthält roleKeys, die in selecctedRoles aber nicht in userRolesResponse enthalten sind
  const rolesToAdd = selectedRoles.filter(
    (selectedRole) => !userRolesResponse.includes(selectedRole)
  );
  // enthält roleKeys, die in userRolesRespnse aber nicht in selectedRoles enthalten sind
  const rolesToRemove = userRolesResponse
    .filter((userRole): userRole is string => userRole !== null)
    .filter((userRole) => !selectedRoles.includes(userRole));

  const insertRoles = new Array();
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

type UpdatePermissionsParams = {
  data: { [x: string]: boolean | undefined };
  extraPermissionsResponse: (string | null)[];
  userId: string;
};

export async function updatePermissions({
  data,
  extraPermissionsResponse,
  userId,
}: UpdatePermissionsParams) {
  // filtert aus den übergebenen Formulardaten die permissionKeys der aktiven Switches heraus
  const selectedPermissions = Object.entries(data)
    .filter(([_, value]) => value) // Nur ausgewählte Berechtigungen (value === true)
    .map(([permissionKey]) => permissionKey); // Extrahiere die permissionKeys

  // enthält permissionKeys, die in selecctedPermissions aber nicht in extraPermissionsResponse enthalten sind
  const permissionsToAdd = selectedPermissions.filter(
    (selectedPermission) =>
      !extraPermissionsResponse.includes(selectedPermission)
  );
  // enthält permissionKeys, die in extraPermissionsResponse aber nicht in selectedPermissions enthalten sind
  const permissionsToRemove = extraPermissionsResponse
    .filter(
      (extraPermission): extraPermission is string => extraPermission !== null
    )
    .filter((userRole) => !selectedPermissions.includes(userRole));

  const insertPermissions = new Array();
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
