"use client";

import {
  createRole,
  deleteRole,
  updateRoleDetails,
  updateRolePermissions,
} from "@/lib/role-actions";
import { generateCreateRoleFormSchema } from "@/lib/role-schema";
import type { TPermissionListResponse } from "@/lib/user-actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, AlertDescription } from "@northware/ui/components/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@northware/ui/components/alert-dialog";
import { Badge } from "@northware/ui/components/badge";
import { Button } from "@northware/ui/components/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@northware/ui/components/form";
import { Input } from "@northware/ui/components/input";
import { toast } from "@northware/ui/components/sonner";
import { Switch } from "@northware/ui/components/switch";
import { TrashIcon } from "@northware/ui/icons/lucide";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

export function CreateRoleForm({
  permissionsResponse,
}: { permissionsResponse: TPermissionListResponse }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  if (!permissionsResponse.success) {
    return permissionsResponse.error.message;
  }

  const defaultPermissionValues = permissionsResponse.permissionList.reduce(
    (acc: Record<string, boolean>, permission) => {
      // Setze den Standardwert für jede Berechtigung auf false
      acc[permission.permissionKey] = false;
      return acc;
    },
    {} as Record<string, boolean>
  );

  const CreateRoleFormSchema =
    generateCreateRoleFormSchema(permissionsResponse);

  // biome-ignore lint/correctness/useHookAtTopLevel: <explanation>
  const form = useForm<z.infer<typeof CreateRoleFormSchema>>({
    resolver: zodResolver(CreateRoleFormSchema),
    defaultValues: {
      roleKey: "",
      roleName: "",
      ...defaultPermissionValues,
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof CreateRoleFormSchema>> = async (
    data
  ) => {
    try {
      await createRole(data);
      router.push("/admin/role");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="roleKey"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Schlüsselbezeichnung</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="roleName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rollenbezeichnung</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {permissionsResponse.permissionList.map((permission) => (
            <FormField
              key={permission.permissionKey}
              control={form.control}
              name={
                permission.permissionKey as keyof z.infer<
                  typeof CreateRoleFormSchema
                >
              }
              render={({ field }) => (
                <FormItem className="flex flex-row items-start justify-between space-x-3 space-y-0">
                  <FormLabel>
                    <span>{permission.permissionName}</span>
                    <Badge className="font-mono" variant="secondary">
                      {permission.permissionKey}
                    </Badge>
                  </FormLabel>

                  <FormControl>
                    <Switch
                      checked={Boolean(field.value)}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          ))}
        </div>

        {error && (
          <Alert variant="danger">
            <AlertDescription>
              <p>{error}</p>
            </AlertDescription>
          </Alert>
        )}

        <Button type="submit" className="w-full">
          Rolle erstellen
        </Button>
      </form>
    </Form>
  );
}

type TRoleDetails = {
  recordId: number;
  roleKey: string;
  roleName: string | null;
};

const RoleDetailFormSchema = z.object({
  recordId: z.number(),
  roleKey: z.string(),
  roleName: z.string(),
});

export type TRoleDetailFormSchema = z.infer<typeof RoleDetailFormSchema>;

export function RoleDetailForm({
  roleDetails,
}: { roleDetails?: TRoleDetails }) {
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof RoleDetailFormSchema>>({
    resolver: zodResolver(RoleDetailFormSchema),
    defaultValues: {
      recordId: roleDetails?.recordId,
      roleKey: roleDetails?.roleKey,
      roleName: roleDetails?.roleName || "",
    },
  });
  const onSubmit: SubmitHandler<z.infer<typeof RoleDetailFormSchema>> = async (
    data
  ) => {
    try {
      await updateRoleDetails(data);
      toast.success("Die Rollendetails wurden aktualisiert.");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="mb-5 grid grid-cols-5 gap-4">
          <FormField
            control={form.control}
            name="recordId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ID</FormLabel>
                <FormControl>
                  <Input disabled {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="roleKey"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Schlüsselbezeichnung</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="roleName"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Rollenbezeichnung</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {error && (
          <Alert variant="danger">
            <AlertDescription>
              <p>{error}</p>
            </AlertDescription>
          </Alert>
        )}

        <Button type="submit" className="w-full">
          Rolle speichern
        </Button>
      </form>
    </Form>
  );
}

export function RolePermissionsForm({
  roleKey,
  permissionsResponse,
  rolePermissions,
}: {
  roleKey?: string;
  permissionsResponse: TPermissionListResponse;
  rolePermissions: string[];
}) {
  const [error, setError] = useState<string | null>(null);

  if (!permissionsResponse.success) {
    // globalError
    return <div>Fehler: {permissionsResponse.error.message}</div>;
  }

  const FormSchema = z.object(
    permissionsResponse.permissionList.reduce(
      (acc, permission) => {
        acc[permission.permissionKey] = z.boolean().default(false).optional();
        return acc;
      },
      {} as Record<string, z.ZodOptional<z.ZodDefault<z.ZodBoolean>>>
    )
  );
  const defaultValues = permissionsResponse.permissionList.reduce(
    (acc, permission) => {
      acc[permission.permissionKey] =
        rolePermissions.includes(permission.permissionKey) || false;
      return acc;
    },
    {} as Record<string, boolean>
  );

  // biome-ignore lint/correctness/useHookAtTopLevel: Da FormSchema und defaultValues sich auf roleResponse beziehen und vorher geprüft werden muss, ob roleResponse vorhanden ist, kann auch useForm erst verwendet werden, wenn roleResponse.success erfüllt ist.
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      await updateRolePermissions({ data, rolePermissions, roleKey });
      toast.success("Die Rollenberechtigungen wurden aktualisiert.");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          {permissionsResponse.permissionList.map((permission) => (
            <FormField
              key={permission.permissionKey}
              control={form.control}
              name={permission.permissionKey}
              render={({ field }) => (
                <FormItem className="flex flex-row items-start justify-between space-x-3 space-y-0">
                  <FormLabel>
                    <span>{permission.permissionName}</span>
                    <Badge className="font-mono" variant="secondary">
                      {permission.permissionKey}
                    </Badge>
                  </FormLabel>

                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          ))}
        </div>

        {error && (
          <Alert variant="danger">
            <AlertDescription>
              <p>{error}</p>
            </AlertDescription>
          </Alert>
        )}
        <Button type="submit" className="w-full">
          Rollenberechtigungen aktualisieren
        </Button>
      </form>
    </Form>
  );
}

export function RoleDeleteButton({
  recordId,
  mode = "list",
}: { recordId: number; mode?: "list" | "page" }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  async function submitRoleDeletion() {
    try {
      await deleteRole(recordId);
      router.push("/admin/role");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Es ist ein unbekannter Fehler aufgetreten.");
      }
    }
  }
  if (error) {
    toast.error(error);
  }
  return (
    <AlertDialog>
      {mode === "list" && (
        <AlertDialogTrigger asChild>
          <Button variant="ghostDanger" size="icon">
            <TrashIcon className="size-4" />
          </Button>
        </AlertDialogTrigger>
      )}
      {mode === "page" && (
        <AlertDialogTrigger asChild>
          <Button variant="danger">
            <TrashIcon className="size-4" />
            <span>Rolle löschen</span>
          </Button>
        </AlertDialogTrigger>
      )}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Rolle löschen</AlertDialogTitle>
          <AlertDescription>
            <span>
              Soll die Rolle wirklich gelöscht werden? Alle Benutzer mit dieser
              Rolle verlieren die Berechtigungen, die dieser Rolle zugewiesen
              sind.
            </span>
            <br />
            <span className="text-danger">
              Diese Aktion kann nicht rückgängig gemacht werden.
            </span>
          </AlertDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Abbrechen</AlertDialogCancel>
          <AlertDialogAction
            variant="danger"
            onClick={() => submitRoleDeletion()}
          >
            Rolle löschen
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
