"use client";

import {
  CreatePermissionDetailFormSchema,
  CreateRoleFormSchema,
  PermissionDetailFormSchema,
  RoleDetailFormSchema,
  type TCreatePermissionDetailFormSchema,
  type TCreateRoleFormData,
  type TPermissionDetailFormSchema,
  type TRoleDetailFormSchema,
  type TUpdatePermissionSchema,
  UserUpdatePermissionsFormSchema,
  parseErrorMessages,
} from "@/lib/rbac-schema";
import type {
  TPermissionListResponse,
  TPermissionType,
} from "@/lib/rbac-types";

import {
  createPermDetails,
  createRole,
  deletePermission,
  deleteRole,
  updatePermDetails,
  updateRoleDetails,
  updateRolePermissions,
} from "@/lib/role-actions";
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@northware/ui/components/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@northware/ui/components/form";
import { Input } from "@northware/ui/components/input";
import { toast } from "@northware/ui/components/sonner";
import { Switch } from "@northware/ui/components/switch";
import { EditIcon, TrashIcon } from "@northware/ui/icons/lucide";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";

export function CreateRoleForm({
  permissionsResponse,
}: { permissionsResponse: TPermissionListResponse }) {
  const router = useRouter();
  const [errors, setErrors] = useState<string[]>([]);
  if (!permissionsResponse.success) {
    return permissionsResponse.error.message;
  }

  // biome-ignore lint/correctness/useHookAtTopLevel: <explanation>
  const form = useForm<TCreateRoleFormData>({
    resolver: zodResolver(CreateRoleFormSchema),
    defaultValues: {
      roleKey: "",
      roleName: "",
      permissions: [],
    },
  });

  const onSubmit: SubmitHandler<TCreateRoleFormData> = async (data) => {
    try {
      await createRole(data);
      router.push("/admin/role");
    } catch (err) {
      setErrors(parseErrorMessages(err));
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

        <div className="grid gap-4">
          <FormField
            control={form.control}
            name="permissions"
            render={() => (
              <FormItem className="grid-cols-2">
                {permissionsResponse.permissionList.map((perm) => (
                  <FormField
                    key={perm.recordId}
                    control={form.control}
                    name="permissions"
                    render={({ field }) => (
                      <FormItem
                        key={perm.recordId}
                        className="flex flex-row items-center justify-between p-3"
                      >
                        <FormLabel>
                          <span>{perm.permissionName}</span>
                          <Badge variant="secondary">
                            {perm.permissionKey}
                          </Badge>
                        </FormLabel>
                        <FormControl>
                          <Switch
                            checked={field.value.includes(perm.permissionKey)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([
                                    ...field.value,
                                    perm.permissionKey,
                                  ])
                                : field.onChange(
                                    field.value.filter(
                                      (value) => value !== perm.permissionKey
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                ))}
              </FormItem>
            )}
          />
        </div>

        {errors.length > 0 && (
          <Alert variant="danger">
            <AlertDescription>
              <ul>
                {errors.map((err, idx) => (
                  <li key={idx}>{err}</li>
                ))}
              </ul>
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

export function UpdateRoleDetailForm({
  roleDetails,
}: { roleDetails?: TRoleDetails }) {
  const [errors, setErrors] = useState<string[]>([]);

  const form = useForm<TRoleDetailFormSchema>({
    resolver: zodResolver(RoleDetailFormSchema),
    defaultValues: {
      recordId: roleDetails?.recordId,
      roleKey: roleDetails?.roleKey,
      roleName: roleDetails?.roleName || "",
    },
  });
  const onSubmit: SubmitHandler<TRoleDetailFormSchema> = async (data) => {
    try {
      await updateRoleDetails(data);
      toast.success("Die Rollendetails wurden aktualisiert.");
    } catch (err) {
      setErrors(parseErrorMessages(err));
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

        {errors.length > 0 && (
          <Alert variant="danger">
            <AlertDescription>
              <ul>
                {errors.map((err, idx) => (
                  <li key={idx}>{err}</li>
                ))}
              </ul>
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
  const [errors, setErrors] = useState<string[]>([]);

  if (!permissionsResponse.success) {
    // globalError
    return <div>Fehler: {permissionsResponse.error.message}</div>;
  }

  // biome-ignore lint/correctness/useHookAtTopLevel: Da FormSchema und defaultValues sich auf roleResponse beziehen und vorher geprüft werden muss, ob roleResponse vorhanden ist, kann auch useForm erst verwendet werden, wenn roleResponse.success erfüllt ist.
  const form = useForm<TUpdatePermissionSchema>({
    resolver: zodResolver(UserUpdatePermissionsFormSchema),
    defaultValues: { permissions: rolePermissions },
  });

  async function onSubmit(data: TUpdatePermissionSchema) {
    try {
      await updateRolePermissions({ data, rolePermissions, roleKey });
      toast.success("Die Rollenberechtigungen wurden aktualisiert.");
    } catch (err) {
      setErrors(parseErrorMessages(err));
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="permissions"
          render={() => (
            <FormItem className="grid-cols-2">
              {permissionsResponse.permissionList.map((perm) => (
                <FormField
                  key={perm.recordId}
                  control={form.control}
                  name="permissions"
                  render={({ field }) => (
                    <FormItem
                      key={perm.recordId}
                      className="flex flex-row items-center justify-between p-3"
                    >
                      <FormLabel>
                        <span>{perm.permissionName}</span>
                        <Badge variant="secondary">{perm.permissionKey}</Badge>
                      </FormLabel>
                      <FormControl>
                        <Switch
                          checked={field.value.includes(perm.permissionKey)}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([
                                  ...field.value,
                                  perm.permissionKey,
                                ])
                              : field.onChange(
                                  field.value.filter(
                                    (value) => value !== perm.permissionKey
                                  )
                                );
                          }}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              ))}
            </FormItem>
          )}
        />

        {errors.length > 0 && (
          <Alert variant="danger">
            <AlertDescription>
              <ul>
                {errors.map((err, idx) => (
                  <li key={idx}>{err}</li>
                ))}
              </ul>
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
  const [errors, setErrors] = useState<string[]>([]);
  async function submitRoleDeletion() {
    try {
      await deleteRole(recordId);
      router.push("/admin/role");
    } catch (err) {
      setErrors(parseErrorMessages(err));
    }
  }

  useEffect(() => {
    if (errors.length > 0) {
      toast.error(errors.join("\n"));
    }
  }, [errors]);

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

export function CreatePermissionDetails() {
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const form = useForm<TCreatePermissionDetailFormSchema>({
    resolver: zodResolver(CreatePermissionDetailFormSchema),
    defaultValues: {
      permissionKey: "",
      permissionName: "",
    },
  });
  const onSubmit: SubmitHandler<TCreatePermissionDetailFormSchema> = async (
    data
  ) => {
    try {
      await createPermDetails(data);
      setOpen(false);
      toast.success("Es wurde ein neuer Berechtigungsschlüssel hinzugefügt.");
    } catch (err) {
      setErrors(parseErrorMessages(err));
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Berechtigungsschlüssel hinzufügen</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Berechtigungsschlüssel hinzufügen</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="permissionKey"
                render={({ field }) => (
                  <FormItem className="grid gap-3">
                    <FormLabel>Berechtigungsschlüssel</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="app::feature:subfeature.permission"
                      />
                    </FormControl>
                    <FormDescription>
                      Der Berechtigungsschlüssel sollte folgendem Muster folgen:
                      app::feature:subfeature.permission
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="permissionName"
                render={({ field }) => (
                  <FormItem className="grid gap-3">
                    <FormLabel>Bezeichnung</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {errors.length > 0 && (
                <Alert variant="danger">
                  <AlertDescription>
                    <ul>
                      {errors.map((err, idx) => (
                        <li key={idx}>{err}</li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>
              )}
              <Button type="submit">Berechtigungsschlüssel hinzufügen</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export function UpdatePermissionDetails({
  permissionDetails,
}: { permissionDetails: TPermissionType }) {
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const form = useForm<TPermissionDetailFormSchema>({
    resolver: zodResolver(PermissionDetailFormSchema),
    defaultValues: {
      recordId: permissionDetails.recordId,
      permissionKey: permissionDetails.permissionKey,
      permissionName: permissionDetails.permissionName || "",
    },
  });
  const onSubmit: SubmitHandler<TPermissionDetailFormSchema> = async (data) => {
    try {
      await updatePermDetails(data);
      setOpen(false);
      toast.success("Der Berechtigungsschlüssel wurde aktualisiert.");
    } catch (err) {
      setErrors(parseErrorMessages(err));
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" type="button">
          <EditIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Berechtigungsschlüssel bearbeiten</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="recordId"
                render={({ field }) => (
                  <FormItem className="grid gap-3">
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
                name="permissionKey"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Berechtigungsschlüssel</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="permissionName"
                render={({ field }) => (
                  <FormItem className="grid gap-3">
                    <FormLabel>Bezeichnung</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {errors.length > 0 && (
                <Alert variant="danger">
                  <AlertDescription>
                    <ul>
                      {errors.map((err, idx) => (
                        <li key={idx}>{err}</li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>
              )}
              <Button type="submit">Speichern</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export function PermissionDeleteButton({
  recordId,
  mode = "list",
}: { recordId: number; mode?: "list" | "page" }) {
  const router = useRouter();
  const [errors, setErrors] = useState<string[]>([]);
  async function submitPermDeletion() {
    try {
      await deletePermission(recordId);
      router.push("/admin/permission");
    } catch (err) {
      setErrors(parseErrorMessages(err));
    }
  }

  useEffect(() => {
    if (errors.length > 0) {
      toast.error(errors.join("\n"));
    }
  }, [errors]);

  return (
    <AlertDialog>
      {mode === "list" && (
        <AlertDialogTrigger asChild>
          <Button variant="ghostDanger" size="icon">
            <TrashIcon />
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
          <AlertDialogTitle>Berechtigungsschlüssel löschen</AlertDialogTitle>
          <AlertDescription>
            <span>
              Soll der Berechtigungsschlüssel wirklich gelöscht werden? Alle
              Benutzer und Rollen verlieren die entsprechende Berechtigung.
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
            onClick={() => submitPermDeletion()}
          >
            Berechtigungsschlüssel löschen
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
