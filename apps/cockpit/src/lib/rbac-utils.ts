import type { TPermissionListResponse } from "@/lib/rbac-types";
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

export function generateCreateRoleFormSchema(
  permissionsResponse: TPermissionListResponse
) {
  // Stellen Sie sicher, dass permissionsResponse.success true ist und permissionList existiert
  if (!permissionsResponse.success || !permissionsResponse.permissionList) {
    // Oder werfen Sie einen Fehler, je nach Anwendungsfall
    return z.object({
      roleKey: z.string(),
      roleName: z.string(),
    });
  }

  const dynamicPermissionSchema = permissionsResponse.permissionList.reduce(
    (acc, permission) => {
      acc[permission.permissionKey] = z.boolean();
      return acc;
    },
    {} as Record<string, z.ZodBoolean>
  );

  return z.object({
    roleKey: z.string(),
    roleName: z.string(),
    ...dynamicPermissionSchema,
  });
}

/**
 * Leitet den TypeScript-Typ für die Formulardaten ab.
 * Dieser Typ wird dynamisch generiert, daher ist es hier ein Hilfstyp.
 * Für den tatsächlichen Gebrauch in der Komponente oder API-Funktion,
 * verwenden Sie z.infer<ReturnType<typeof generateCreateRoleFormSchema>>.
 */
export type TCreateRoleFormData = z.infer<
  ReturnType<typeof generateCreateRoleFormSchema>
>;

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
