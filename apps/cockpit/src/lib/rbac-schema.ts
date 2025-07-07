import { z } from "zod/v4";

/************** User Form Schema  **************************************************************/

export const CreateUserFormSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  emailAddress: z.email("Bitte geben Sie eine gültige E-Mail Adresse an."),
  username: z
    .string()
    .min(4, {
      error: "Der Benutzername muss mindestens 4 Zeichen lang sein.",
    })
    .max(64, {
      error: "Der Benutzername darf maximal 64 Zeichen lang sein.",
    }),
  password: z
    .string()
    .min(8, { error: "Das Passwort muss mindestens 8 Zeichen lang sein." })
    .max(72, { error: "Das Passwort darf maximal 72 Zeichen lang sein." }),
});
export type TCreateUserFormSchema = z.infer<typeof CreateUserFormSchema>;

export const UpdateUserFromSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  username: z
    .string()
    .min(4, {
      error: "Der Benutzername muss mindestens 4 Zeichen lang sein.",
    })
    .max(64, {
      error: "Der Benutzername darf maximal 64 Zeichen lang sein.",
    }),
});
export type TUpdateUserFormSchema = z.infer<typeof UpdateUserFromSchema>;

export const CreateEMailAddressFormSchema = z.object({
  emailAddress: z.email(),
  verified: z.boolean().default(true).optional(),
  primary: z.boolean().default(false).optional(),
});
export type TCreateEMailAddressFormSchema = z.infer<
  typeof CreateEMailAddressFormSchema
>;

export const UpdatePasswordFormSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, { error: "Das Passwort muss mindestens 8 Zeichen lang sein." })
      .max(72, { error: "Das Passwort darf maximal 72 Zeichen lang sein." }),
    confirmPassword: z.string(),
    signOutSessions: z.boolean(),
    skipChecks: z.boolean(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    error: "Die Passwörter stimmen nicht überein.",
    path: ["confirmPassword"],
  });

export type TUpdatePasswordFormSchema = z.infer<
  typeof UpdatePasswordFormSchema
>;

/******************** User Roles and Permissions ******************************/

export const UpdateUserRoleFormSchema = z.object({
  roles: z.array(z.string()),
});

export type TUpdateRoleSchema = z.infer<typeof UpdateUserRoleFormSchema>;

export const UserUpdatePermissionsFormSchema = z.object({
  permissions: z.array(z.string()),
});

export type TUpdatePermissionSchema = z.infer<
  typeof UserUpdatePermissionsFormSchema
>;

/************************** Role Managment Form Schema ****************************************************/

export const CreateRoleFormSchema = z.object({
  roleKey: z
    .string()
    .regex(
      /^(all|cockpit|trader|finance)::([a-z0-9]+(?:-[a-z0-9]+)*)(?::([a-z0-9]+(?:-[a-z0-9]+)*))?$/,
      "Ungültiges Format des Rollenschlüssels. Erwartet wird app::rolestring:subrole"
    ),
  roleName: z.string(),
  permissions: z.array(z.string()),
});

export type TCreateRoleFormData = z.infer<typeof CreateRoleFormSchema>;

export const RoleDetailFormSchema = z.object({
  recordId: z.number(),
  roleKey: z
    .string()
    .regex(
      /^(all|cockpit|trader|finance)::([a-z0-9]+(?:-[a-z0-9]+)*)(?::([a-z0-9]+(?:-[a-z0-9]+)*))?$/,
      "Ungültiges Format des Berechtigungssschlüssels. Erwartet wird app::rolestring:subrole"
    ),
  roleName: z.string(),
});

export type TRoleDetailFormSchema = z.infer<typeof RoleDetailFormSchema>;

/************************Permission Management Form Schema ******************************************/

export const PermissionDetailFormSchema = z.object({
  recordId: z.number(),
  permissionKey: z.union([
    z.literal("all-access"),
    z
      .string()
      .regex(
        /^(all|cockpit|trader|finance)::([a-z0-9]+(?:-[a-z0-9]+)*)(?::([a-z0-9]+(?:-[a-z0-9]+)*))?\.(read|create|update|delete)$/,
        "Ungültiges Format des Berechtigungssschlüssels. Erwartet wird app::feature:subfeature.permission"
      ),
  ]),
  permissionName: z.string(),
});

export const CreatePermissionDetailFormSchema = z.object({
  permissionKey: z.union([
    z.literal("all-access"),
    z
      .string()
      .regex(
        /^(cockpit|trader|finance)::([a-z0-9]+(?:-[a-z0-9]+)*)(?::([a-z0-9]+(?:-[a-z0-9]+)*))?\.(read|create|update|delete)$/,
        "Ungültiges Format des Berechtigungssschlüssels. Erwartet wird app::feature:subfeature.permission"
      ),
  ]),
  permissionName: z.string(),
});

export type TCreatePermissionDetailFormSchema = z.infer<
  typeof CreatePermissionDetailFormSchema
>;

export type TPermissionDetailFormSchema = z.infer<
  typeof PermissionDetailFormSchema
>;

/**** Error Utilities *************************************************************/

export function parseErrorMessages(err: unknown): string[] {
  if (err instanceof Error) {
    try {
      // Versuche, die Fehlermeldung als JSON-Array zu parsen
      return JSON.parse(err.message) as string[];
    } catch {
      // Wenn das Parsen fehlschlägt, gib die Error-Message als einzelnes Array zurück
      return [err.message];
    }
  }
  // Fallback für unbekannte Fehler
  return ["Es ist ein unbekannter Fehler innerhalb des Programms aufgetreten."];
}
