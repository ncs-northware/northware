"use client";

import {
  type TChangePasswordFormSchema,
  type TCreateEMailAddressFormSchema,
  type TUpdateUserFormSchema,
  changePasswordFormSchema,
  createEMailAddressFormSchema,
  updateUserFromSchema,
} from "@/lib/rbac-schema";
import type {
  TPermissionListResponse,
  TRoleListResponse,
} from "@/lib/rbac-types";
import {
  type TUpdatePermissionSchema,
  type TUpdateRoleSchema,
  UserUpdatePermissionsFormSchema,
  UserUpdateRoleFormSchema,
  parseErrorMessages,
} from "@/lib/rbac-utils";

import { updateUserPermissions, updateUserRoles } from "@/lib/role-actions";
import {
  changePassword,
  createEmailAddress,
  deleteEmailAddress,
  deleteUser,
  type getSingleUser,
  updateEmailAddress,
  updateUser,
} from "@/lib/user-actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, AlertDescription } from "@northware/ui/components/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@northware/ui/components/alert-dialog";
import { Badge } from "@northware/ui/components/badge";
import { Button } from "@northware/ui/components/button";
import { Checkbox } from "@northware/ui/components/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@northware/ui/components/collapsible";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@northware/ui/components/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@northware/ui/components/dropdown-menu";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@northware/ui/components/form";
import { Input } from "@northware/ui/components/input";
import { PasswordInput } from "@northware/ui/components/password-input";
import { toast } from "@northware/ui/components/sonner";
import { Switch } from "@northware/ui/components/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@northware/ui/components/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@northware/ui/components/tooltip";
import {
  BadgeCheckIcon,
  ChevronDownIcon,
  EllipsisIcon,
  MailIcon,
  TrashIcon,
  TriangleAlertIcon,
} from "@northware/ui/icons/lucide";
import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
// Clerk User Data

export function EditUserForm({
  user,
}: { user?: Awaited<ReturnType<typeof getSingleUser>> }) {
  const [errors, setErrors] = useState<string[]>([]);
  const form = useForm<TUpdateUserFormSchema>({
    resolver: zodResolver(updateUserFromSchema),
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      username: user?.username || "",
    },
  });

  const onSubmit: SubmitHandler<TUpdateUserFormSchema> = async (data) => {
    setErrors([]); // Fehler zurücksetzen
    try {
      await updateUser(data, user?.id);
      toast.success("Die Daten des Benutzers wurden aktualisiert.");
    } catch (err) {
      setErrors(parseErrorMessages(err));
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mb-5 grid grid-cols-2 gap-4"
      >
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vorname</FormLabel>
              <FormControl>
                <Input placeholder="Max" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nachname</FormLabel>
              <FormControl>
                <Input placeholder="Mustermann" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Benutzername</FormLabel>
              <FormControl>
                <Input placeholder="mmuster" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {errors.length > 0 && (
          <Alert variant="danger" className="col-span-2">
            <AlertDescription>
              <ul className="w-max">
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}

        <Button variant="default" type="submit" className="col-span-2">
          Speichern
        </Button>
      </form>
    </Form>
  );
}

export function UserEmailList({
  userId,
  data,
  primaryEmailAddressId,
}: {
  userId?: string;
  data?: { id: string; emailAddress: string; verificationStatus?: string }[];
  primaryEmailAddressId?: string | null;
}) {
  const [errors, setErrors] = useState<string[]>([]);

  const setPrimaryEmail = async (addressId: string) => {
    setErrors([]); // Fehler zurücksetzen
    try {
      await updateEmailAddress(addressId, "primary");
      toast.success("Die primäre E-Mail Adresse wurde aktualisiert.");
    } catch (err) {
      setErrors(parseErrorMessages(err));
    }
  };

  const setEmailVerification = async (
    addressId: string,
    verification: boolean
  ) => {
    setErrors([]); // Fehler zurücksetzen
    try {
      await updateEmailAddress(addressId, "verification", verification);
      toast.success(
        verification
          ? "Die E-Mail Adresse wurde als verifiziert gekennzeichnet."
          : !verification &&
              "Die E-Mail Adresse wurde als nicht verifiziert gekennzeichnet."
      );
    } catch (err) {
      setErrors(parseErrorMessages(err));
    }
  };

  const submitEmailDeletion = async (addressId: string) => {
    setErrors([]); // Fehler zurücksetzen
    try {
      await deleteEmailAddress(addressId);
      toast.success("Die E-Mail Adresse wurde gelöscht.");
    } catch (err) {
      setErrors(parseErrorMessages(err));
    }
  };

  if (errors.length > 0) {
    toast.error(errors);
  }

  return (
    <>
      <Table className="mb-2">
        <TableBody>
          {data?.map((row) => (
            <TableRow key={row.id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <TooltipProvider>
                    <MailIcon className="size-4" />
                    <span>{row.emailAddress}</span>
                    {row.verificationStatus === "verified" ? (
                      <Tooltip>
                        <TooltipTrigger>
                          <BadgeCheckIcon className="size-4 text-success" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Die E-Mail Adresse ist verifiziert.</p>
                        </TooltipContent>
                      </Tooltip>
                    ) : (
                      row.verificationStatus !== "verified" && (
                        <Tooltip>
                          <TooltipTrigger>
                            <TriangleAlertIcon className="size-4 text-warning" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Die E-Mail Adresse ist nicht verifiziert.</p>
                          </TooltipContent>
                        </Tooltip>
                      )
                    )}

                    {primaryEmailAddressId === row.id && (
                      <Badge
                        variant="secondary"
                        className="bg-success text-success-foreground"
                      >
                        Primär-Adresse
                      </Badge>
                    )}
                  </TooltipProvider>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <EllipsisIcon className="size-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {primaryEmailAddressId !== row.id && (
                      <DropdownMenuItem onClick={() => setPrimaryEmail(row.id)}>
                        Als primär kennzeichnen
                      </DropdownMenuItem>
                    )}
                    {row.verificationStatus === "verified" ? (
                      <DropdownMenuItem
                        onClick={() => setEmailVerification(row.id, false)}
                      >
                        Als nicht verifiziert kennzeichnen
                      </DropdownMenuItem>
                    ) : (
                      row.verificationStatus !== "verified" && (
                        <DropdownMenuItem
                          onClick={() => setEmailVerification(row.id, true)}
                        >
                          Als verifiziert kennzeichnen
                        </DropdownMenuItem>
                      )
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      variant="destructive"
                      onClick={() => submitEmailDeletion(row.id)}
                    >
                      E-Mail Adresse löschen
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <CreateEmailFormDialog userId={userId} />
    </>
  );
}

function CreateEmailFormDialog({ userId }: { userId?: string }) {
  const [errors, setErrors] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const form = useForm<TCreateEMailAddressFormSchema>({
    resolver: zodResolver(createEMailAddressFormSchema),
    defaultValues: {
      emailAddress: "",
      verified: true,
      primary: false,
    },
  });

  async function onSubmit(values: TCreateEMailAddressFormSchema) {
    setErrors([]); // Fehler zurücksetzen
    try {
      await createEmailAddress(values, userId);
      setOpen(false);
      toast.success("Die E-Mail Adresse wurde hinzugefügt.");
    } catch (err) {
      setErrors(parseErrorMessages(err));
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          E-Mail Adresse hinzufügen
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Neue E-Mail Adresse hinzufügen</DialogTitle>
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid gap-4 py-4"
              >
                <FormField
                  control={form.control}
                  name="emailAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E-Mail Adresse</FormLabel>
                      <FormControl>
                        <Input placeholder="kunde@northware.de" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="primary"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Als primär kennzeichnen</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="verified"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Als verifiziert kennzeichnen</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                {errors.length > 0 && (
                  <Alert variant="danger">
                    <AlertDescription>
                      <ul className="w-max">
                        {errors.map((error, index) => (
                          <li key={index}>{error}</li>
                        ))}
                      </ul>
                    </AlertDescription>
                  </Alert>
                )}
                <Button type="submit" variant="default">
                  E-Mail Adresse hinzufügen
                </Button>
              </form>
            </Form>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export function EditPasswordFormDialog({ id }: { id?: string }) {
  const [errors, setErrors] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  const form = useForm<TChangePasswordFormSchema>({
    resolver: zodResolver(changePasswordFormSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
      signOutSessions: false,
      skipChecks: false,
    },
  });

  const onSubmit: SubmitHandler<TChangePasswordFormSchema> = async (data) => {
    setErrors([]); // Fehler zurücksetzen
    try {
      await changePassword(id, data);
      setOpen(false);
      toast.success("Das Passwort wurde gespeichert.");
    } catch (err) {
      setErrors(parseErrorMessages(err));
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Passwort ändern
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Passwort ändern</DialogTitle>
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid gap-4 py-4"
              >
                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Neues Passwort</FormLabel>
                      <FormControl>
                        <PasswordInput {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Passwort bestätigen</FormLabel>
                      <FormControl>
                        <PasswordInput {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="signOutSessions"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Von allen Sitzungen abmelden</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="skipChecks"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Passwort-Prüfungen überspringen</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                {errors.length > 0 && (
                  <Alert variant="danger">
                    <AlertDescription>
                      <ul className="w-max">
                        {errors.map((error, index) => (
                          <li key={index}>{error}</li>
                        ))}
                      </ul>
                    </AlertDescription>
                  </Alert>
                )}
                <Button type="submit" variant="default">
                  Passwort ändern
                </Button>
              </form>
            </Form>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export function UserDeleteButton({ userId }: { userId: string }) {
  const [errors, setErrors] = useState<string[]>([]);
  async function submitUserDeletion() {
    setErrors([]); // Fehler zurücksetzen
    try {
      await deleteUser(userId);
      toast.success("Der Benutzer wurde gelöscht.");
    } catch (err) {
      setErrors(parseErrorMessages(err));
      if (errors.length > 0) {
        toast.error(errors);
      }
    }
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghostDanger" size="icon">
          <TrashIcon className="size-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Benutzer löschen</AlertDialogTitle>
          <AlertDialogDescription>
            <span>
              Sind Sie sicher, dass der Benutzer gelöscht werden soll?
            </span>
            <br />
            <span className="text-danger">
              Diese Aktion kann nicht rückgängig gemacht werden.
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Abbrechen</AlertDialogCancel>
          <AlertDialogAction
            variant="danger"
            onClick={() => submitUserDeletion()}
          >
            Benutzer löschen
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

// User Roles

type RolesFormProps = {
  rolesResponse: TRoleListResponse;
  userRolesResponse: (string | undefined)[];
  userId: string;
};

export function UpdateRolesForm({
  rolesResponse,
  userRolesResponse,
  userId,
}: RolesFormProps) {
  const [errors, setErrors] = useState<string[]>([]);
  if (!rolesResponse.success) {
    return rolesResponse.error.message;
  }
  // biome-ignore lint/correctness/useHookAtTopLevel: <explanation>
  const form = useForm<TUpdateRoleSchema>({
    resolver: zodResolver(UserUpdateRoleFormSchema),
    defaultValues: {
      roles: userRolesResponse,
    },
  });

  async function onSubmit(data: TUpdateRoleSchema) {
    try {
      await updateUserRoles({ data, userRolesResponse, userId });
      toast.success("Die Rollen des Benutzers wurden aktualisiert.");
    } catch (err) {
      setErrors(parseErrorMessages(err));
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <FormField
          control={form.control}
          name="roles"
          render={() => (
            <FormItem className="grid-cols-2">
              {rolesResponse.roleList.map((role) => (
                <FormField
                  key={role.roleKey}
                  control={form.control}
                  name="roles"
                  render={({ field }) => (
                    <FormItem key={role.roleKey} className="p-3">
                      <Collapsible>
                        <div className="flex flex-row items-center justify-between">
                          <FormLabel>
                            <span>{role.roleName}</span>
                            <Badge variant="secondary">{role.roleKey}</Badge>
                            <CollapsibleTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="size-8"
                                type="button"
                              >
                                <ChevronDownIcon />
                              </Button>
                            </CollapsibleTrigger>
                          </FormLabel>

                          <FormControl>
                            <Switch
                              checked={field.value.includes(role.roleKey)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([
                                      ...field.value,
                                      role.roleKey,
                                    ])
                                  : field.onChange(
                                      field.value.filter(
                                        (value) => value !== role.roleKey
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                        </div>
                        <CollapsibleContent>
                          <ul className="text-muted-foreground text-sm">
                            {role.permissions.length > 0 ? (
                              role.permissions.map((permission) => (
                                <li
                                  key={permission.permissionKey}
                                  className="my-2"
                                >
                                  <span className="mr-2">
                                    {permission.permissionName}
                                  </span>
                                  <Badge
                                    variant="secondary"
                                    className="font-mono"
                                  >
                                    {permission.permissionKey}
                                  </Badge>
                                </li>
                              ))
                            ) : (
                              <li className="my-2">
                                Die Rolle enthält keine Berechtigungen.
                              </li>
                            )}
                          </ul>
                        </CollapsibleContent>
                      </Collapsible>
                    </FormItem>
                  )}
                />
              ))}
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
        <Button type="submit" className="w-full">
          Rollen aktualisieren
        </Button>
      </form>
    </Form>
  );
}

type PermissionsFormProps = {
  permissionsResponse: TPermissionListResponse;
  extraPermissionsResponse: (string | undefined)[];
  userId: string;
};

export function UpdateUserPermissionsForm({
  permissionsResponse,
  extraPermissionsResponse,
  userId,
}: PermissionsFormProps) {
  const [errors, setErrors] = useState<string[]>([]);

  if (!permissionsResponse.success) {
    // globalError
    return <div>Fehler: {permissionsResponse.error.message}</div>;
  }

  // biome-ignore lint/correctness/useHookAtTopLevel: Da FormSchema und defaultValues sich auf roleResponse beziehen und vorher geprüft werden muss, ob roleResponse vorhanden ist, kann auch useForm erst verwendet werden, wenn roleResponse.success erfüllt ist.
  const form = useForm<TUpdatePermissionSchema>({
    resolver: zodResolver(UserUpdatePermissionsFormSchema),
    defaultValues: { permissions: extraPermissionsResponse },
  });

  async function onSubmit(data: TUpdatePermissionSchema) {
    try {
      await updateUserPermissions({ data, extraPermissionsResponse, userId });
      toast.success("Die Berechtigungen des Benutzers wurden aktualisiert.");
    } catch (err) {
      setErrors(parseErrorMessages(err));
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
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
          Zusätzliche Berechtigungen aktualisieren
        </Button>
      </form>
    </Form>
  );
}
