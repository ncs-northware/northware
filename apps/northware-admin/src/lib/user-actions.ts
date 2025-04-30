"use server";

import type { TCreateUserFormSchema } from "@/lib/user-schema";
import { clerkClient } from "@northware/auth/server";
import { db } from "@northware/database/connection";
import { rolesTable, rolesToAccounts } from "@northware/database/schema";
import { and, eq, inArray } from "drizzle-orm";
import { revalidatePath } from "next/cache";

/****************** Clerk User **********************/
interface ClerkError {
  errors: Array<{
    code: string;
    message: string;
    meta: { paramName: string };
  }>;
}

export async function getUsers() {
  try {
    const client = await clerkClient();
    const response = await client.users.getUserList();
    const users = response.data.map((user) => ({
      id: user.id,
      fullName: user.fullName,
      email: user.emailAddresses[0].emailAddress,
      username: user.username,
    }));
    return users;
  } catch (error) {
    return [];
  }
}

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
    const errorMessages: string[] = [];
    const typesafeError = error as ClerkError;
    if (typesafeError.errors) {
      typesafeError.errors.map((error) => {
        switch (error.code) {
          case "form_password_length_too_short":
            errorMessages.push(
              "Das Passwort muss mindestens 8 Zeichen lang sein."
            );
            break;
          case "form_password_size_in_bytes_exceeded":
            errorMessages.push(
              "Das Passwort darf maximal 72 Zeichen lang sein."
            );
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
            errorMessages.push(
              "Bitte geben Sie eine gültige E-Mail Adresse an."
            );
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
        "Es ist ein unbekannter Fehler beim Anlegen des Nutzers aufgetreten."
      );
    }
    if (errorMessages.length > 0) {
      throw new Error(JSON.stringify(errorMessages));
    }
  }
}

export async function getSingleUser(id: string) {
  try {
    const client = await clerkClient();
    const response = await client.users.getUser(id);
    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteUser(id: string) {
  try {
    const client = await clerkClient();
    const response = await client.users.deleteUser(id);

    console.info(response);
  } catch (error) {
    console.error(error);
  }
}

/******************* User Accounts ********************/

export type TRoleList = {
  recordId: number;
  roleKey: string;
  roleName: string | null; // Optional, da varchar() ohne .notNull()
};

export type TRoleListResponse =
  | { success: true; roleList: TRoleList[] }
  | { success: false; error: Error };

export async function getRoleList(): Promise<TRoleListResponse> {
  try {
    const response = await db.select().from(rolesTable);
    return { success: true, roleList: response };
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
  try {
    const selectedRoles = Object.entries(data)
      .filter(([_, value]) => value) // Nur ausgewählte Rollen (value === true)
      .map(([roleKey]) => roleKey); // Extrahiere die roleKeys

    const rolesToAdd = selectedRoles.filter(
      (selectedRole) => !userRolesResponse.includes(selectedRole)
    );
    const rolesToRemove = userRolesResponse
      .filter((userRole): userRole is string => userRole !== null)
      .filter((userRole) => !selectedRoles.includes(userRole));

    const insertRoles = new Array();
    rolesToAdd.forEach((role, i) => {
      insertRoles[i] = { roleKey: role, accountUserId: userId };
    });

    if (insertRoles.length > 0) {
      await db
        .insert(rolesToAccounts)
        .values(insertRoles)
        .onConflictDoNothing();
    }
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
    revalidatePath("/admin");
  } catch (error) {
    return error;
  }
}
