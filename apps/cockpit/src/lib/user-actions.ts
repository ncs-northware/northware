"use server";

import type {
  TChangePasswordFormSchema,
  TCreateEMailAddressFormSchema,
  TCreateUserFormSchema,
  TUpdateUserFormSchema,
} from "@/lib/rbac-schema";
import type {
  TPermissionListResponse,
  TUpdatePermissionsParams,
} from "@/lib/rbac-types";
import { clerkClient, currentUser } from "@northware/auth/server";
import { db } from "@northware/database/connection";
import { handleNeonError } from "@northware/database/neon-error-handling";
import {
  permissionsTable,
  permissionsToAccounts,
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

export async function getUserList() {
  try {
    const loggedInUser = await currentUser();
    const client = await clerkClient();
    const response = await client.users.getUserList({ orderBy: "+first_name" });
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