import { z } from "zod";

/******************** Form Schema Generator Utilities ******************************/

export const UserUpdateRoleFormSchema = z.object({
  roles: z.array(z.string()),
});

export type TUpdateRoleSchema = z.infer<typeof UserUpdateRoleFormSchema>;

export const UserUpdatePermissionsFormSchema = z.object({
  permissions: z.array(z.string()),
});

export type TUpdatePermissionSchema = z.infer<
  typeof UserUpdatePermissionsFormSchema
>;

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

/***** Form Default Values *****************************************************/

export function getDefaultRBACValues<T>(
  list: T[],
  key: keyof T,
  activeKeys?: (string | null)[]
): Record<string, boolean> {
  return list.reduce(
    (acc, item) => {
      const itemKey = item[key];
      acc[String(itemKey)] = activeKeys
        ? activeKeys.includes(String(itemKey))
        : false;
      return acc;
    },
    {} as Record<string, boolean>
  );
}

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
