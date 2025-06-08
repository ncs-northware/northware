import type { TPermissionListResponse } from "@/lib/user-actions";
import { z } from "zod";

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
export type CreateRoleFormData = z.infer<
  ReturnType<typeof generateCreateRoleFormSchema>
>;
