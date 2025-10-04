"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertIcon, AlertWrapper } from "@northware/ui/components/custom-alert";
import { PasswordInput } from "@northware/ui/components/password-input";
import {
  AlertDescription,
  AlertTitle,
} from "@northware/ui/components/shadcn/alert";
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
} from "@northware/ui/components/shadcn/alert-dialog";
import { Badge } from "@northware/ui/components/shadcn/badge";
import { Button } from "@northware/ui/components/shadcn/button";
import { Checkbox } from "@northware/ui/components/shadcn/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@northware/ui/components/shadcn/collapsible";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@northware/ui/components/shadcn/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@northware/ui/components/shadcn/dropdown-menu";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@northware/ui/components/shadcn/form";
import { Input } from "@northware/ui/components/shadcn/input";
import { Switch } from "@northware/ui/components/shadcn/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@northware/ui/components/shadcn/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@northware/ui/components/shadcn/tooltip";
import {
  BadgeCheckIcon,
  ChevronDownIcon,
  EllipsisIcon,
  MailIcon,
  TrashIcon,
  TriangleAlertIcon,
} from "@northware/ui/icons/lucide";
import { toast } from "@northware/ui/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { PermissionFilter } from "@/components/role-forms";
import {
  CreateEMailAddressFormSchema,
  CreateUserFormSchema,
  parseErrorMessages,
  type TCreateEMailAddressFormSchema,
  type TCreateUserFormSchema,
  type TUpdatePasswordFormSchema,
  type TUpdatePermissionSchema,
  type TUpdateRoleSchema,
  type TUpdateUserFormSchema,
  UpdatePasswordFormSchema,
  UpdateUserFromSchema,
  UpdateUserRoleFormSchema,
  UserUpdatePermissionsFormSchema,
} from "@/lib/rbac-schema";
import type {
  TPermissionListResponse,
  TRoleListResponse,
  TSingleUser,
} from "@/lib/rbac-types";
import { updateUserPermissions, updateUserRoles } from "@/lib/role-actions";
import {
  createEmailAddress,
  createUser,
  deleteEmailAddress,
  deleteUser,
  updateEmailAddress,
  updatePassword,
  updateUser,
} from "@/lib/user-actions";

/*********************** Clerk User Data **************************************/
export default function CreateUserForm() {
  const router = useRouter();
  const [errors, setErrors] = useState<string[]>([]);
  const form = useForm<TCreateUserFormSchema>({
    resolver: zodResolver(CreateUserFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      emailAddress: "",
      username: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<TCreateUserFormSchema> = async (data) => {
    setErrors([]); // Fehler zurücksetzen
    try {
      const userId = await createUser(data);
      router.push(`/admin/user/create/${userId}/roles`);
    } catch (err) {
      setErrors(parseErrorMessages(err));
    }
  };

  return (
    <Form {...form}>
      <form
        className="mb-5 grid gap-4 sm:grid-cols-2"
        onSubmit={form.handleSubmit(onSubmit)}
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
          name="emailAddress"
          render={({ field }) => (
            <FormItem className="sm:col-span-2">
              <FormLabel>E-Mail</FormLabel>
              <FormControl>
                <Input
                  placeholder="mmuster@northware.de"
                  type="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="sm:col-span-2">
              <FormLabel>Benutzername</FormLabel>
              <FormControl>
                <Input placeholder="mmuster" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="sm:col-span-2">
              <FormLabel>Passwort</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {errors.length > 0 && (
          <AlertWrapper className="sm:col-span-2" variant="destructive">
            <ul className="w-max">
              {errors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </AlertWrapper>
        )}

        <Button className="sm:col-span-2" type="submit">
          Speichern und Weiter
        </Button>
      </form>
    </Form>
  );
}

export function UpdateUserForm({ user }: { user?: TSingleUser }) {
  const [errors, setErrors] = useState<string[]>([]);
  const form = useForm<TUpdateUserFormSchema>({
    resolver: zodResolver(UpdateUserFromSchema),
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
        className="mb-5 grid grid-cols-2 gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
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
          <AlertWrapper className="col-span-2" variant="destructive">
            <AlertDescription>
              <ul className="w-max">
                {errors.map((error) => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
            </AlertDescription>
          </AlertWrapper>
        )}

        <Button className="col-span-2" type="submit" variant="default">
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
                        className="bg-success text-success-foreground"
                        variant="secondary"
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
                    <Button size="icon" variant="ghost">
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
                      onClick={() => submitEmailDeletion(row.id)}
                      variant="destructive"
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
    resolver: zodResolver(CreateEMailAddressFormSchema),
    defaultValues: {
      emailAddress: "",
      verified: true,
      primary: false,
    },
  });

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      form.reset();
      setErrors([]);
    }
  };

  async function onSubmit(values: TCreateEMailAddressFormSchema) {
    setErrors([]); // Fehler zurücksetzen
    try {
      await createEmailAddress(values, userId);
      setOpen(false);
      form.reset();
      toast.success("Die E-Mail Adresse wurde hinzugefügt.");
    } catch (err) {
      setErrors(parseErrorMessages(err));
    }
  }

  return (
    <Dialog onOpenChange={handleOpenChange} open={open}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          E-Mail Adresse hinzufügen
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Neue E-Mail Adresse hinzufügen</DialogTitle>
          <div>
            <Form {...form}>
              <form
                className="grid gap-4 py-4"
                onSubmit={form.handleSubmit(onSubmit)}
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
                  <AlertWrapper variant="destructive">
                    <AlertDescription>
                      <ul className="w-max">
                        {errors.map((error) => (
                          <li key={error}>{error}</li>
                        ))}
                      </ul>
                    </AlertDescription>
                  </AlertWrapper>
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

export function UpdatePasswordFormDialog({ id }: { id?: string }) {
  const [errors, setErrors] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  const form = useForm<TUpdatePasswordFormSchema>({
    resolver: zodResolver(UpdatePasswordFormSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
      signOutSessions: false,
      skipChecks: false,
    },
  });

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      form.reset(); // Formular zurücksetzen, wenn Dialog geschlossen wird
      setErrors([]); // Fehler auch zurücksetzen
    }
  };

  const onSubmit: SubmitHandler<TUpdatePasswordFormSchema> = async (data) => {
    setErrors([]); // Fehler zurücksetzen
    try {
      await updatePassword(id, data);
      setOpen(false);
      form.reset();
      toast.success("Das Passwort wurde gespeichert.");
    } catch (err) {
      setErrors(parseErrorMessages(err));
    }
  };

  return (
    <Dialog onOpenChange={handleOpenChange} open={open}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          Passwort ändern
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Passwort ändern</DialogTitle>
          <div>
            <Form {...form}>
              <form
                className="grid gap-4 py-4"
                onSubmit={form.handleSubmit(onSubmit)}
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
                  <AlertWrapper variant="destructive">
                    <AlertDescription>
                      <ul className="w-max">
                        {errors.map((error) => (
                          <li key={error}>{error}</li>
                        ))}
                      </ul>
                    </AlertDescription>
                  </AlertWrapper>
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

export function UserDeleteButton({
  userId,
  mode = "list",
}: {
  userId: string;
  mode?: "list" | "page";
}) {
  const router = useRouter();
  const [errors, setErrors] = useState<string[]>([]);
  async function submitUserDeletion() {
    setErrors([]); // Fehler zurücksetzen
    try {
      await deleteUser(userId);
      router.push("/admin/user");
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
        <Button
          className={
            mode === "list" ? "text-destructive hover:text-destructive" : ""
          }
          size={mode === "page" ? "sm" : "icon"}
          variant={mode === "page" ? "destructive" : "ghost"}
        >
          <TrashIcon />
          {mode === "page" && <span>Benutzer löschen</span>}
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
            <span className="text-destructive">
              Diese Aktion kann nicht rückgängig gemacht werden.
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Abbrechen</AlertDialogCancel>
          <AlertDialogAction asChild onClick={() => submitUserDeletion()}>
            <Button variant="destructive">Benutzer löschen</Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

/********************* User Roles *******************************************/

type RolesFormProps = {
  rolesResponse: TRoleListResponse;
  userRolesResponse: (string | undefined)[];
  userId: string;
};

export function UpdateUserRolesForm({
  rolesResponse,
  userRolesResponse,
  userId,
}: RolesFormProps) {
  const [errors, setErrors] = useState<string[]>([]);
  const [filterValue, setFilterValue] = useState<string>("");
  const form = useForm<TUpdateRoleSchema>({
    resolver: zodResolver(UpdateUserRoleFormSchema),
    defaultValues: {
      roles: userRolesResponse,
    },
  });

  if (!rolesResponse.success) {
    return rolesResponse.error.message;
  }

  async function onSubmit(data: TUpdateRoleSchema) {
    try {
      await updateUserRoles({ data, userRolesResponse, userId });
      toast.success("Die Rollen des Benutzers wurden aktualisiert.");
    } catch (err) {
      setErrors(parseErrorMessages(err));
    }
  }

  const filteredRoles = rolesResponse.roleList.filter((role) => {
    if (!filterValue) {
      return true;
    }
    const v = filterValue.toLowerCase();
    return (
      role.roleName?.toLowerCase().includes(v) ||
      role.roleKey?.toLowerCase().includes(v)
    );
  });

  return (
    <Form {...form}>
      <PermissionFilter
        filterValue={filterValue}
        setFilterValue={setFilterValue}
      />
      <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="roles"
          render={() => (
            <FormItem className="lg:grid-cols-2">
              {filteredRoles.map((role) => (
                <FormField
                  control={form.control}
                  key={role.roleKey}
                  name="roles"
                  render={({ field }) => (
                    <FormItem className="p-3" key={role.roleKey}>
                      <Collapsible>
                        <div className="flex flex-row items-center justify-between">
                          <FormLabel>
                            <span>{role.roleName}</span>
                            <Badge variant="secondary">{role.roleKey}</Badge>
                            <CollapsibleTrigger asChild>
                              <Button
                                className="size-8"
                                size="icon"
                                type="button"
                                variant="ghost"
                              >
                                <ChevronDownIcon />
                              </Button>
                            </CollapsibleTrigger>
                          </FormLabel>

                          <FormControl>
                            <Switch
                              checked={field.value.includes(role.roleKey)}
                              onCheckedChange={(checked) =>
                                checked
                                  ? field.onChange([
                                      ...field.value,
                                      role.roleKey,
                                    ])
                                  : field.onChange(
                                      field.value.filter(
                                        (value) => value !== role.roleKey
                                      )
                                    )
                              }
                            />
                          </FormControl>
                        </div>
                        <CollapsibleContent>
                          <ul className="text-muted-foreground text-sm">
                            {role.permissions.length > 0 ? (
                              role.permissions.map((permission) => (
                                <li
                                  className="my-2"
                                  key={permission.permissionKey}
                                >
                                  <span className="mr-2">
                                    {permission.permissionName}
                                  </span>
                                  <Badge
                                    className="font-mono"
                                    variant="secondary"
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
          <AlertWrapper variant="destructive">
            <AlertDescription>
              <ul>
                {errors.map((err) => (
                  <li key={err}>{err}</li>
                ))}
              </ul>
            </AlertDescription>
          </AlertWrapper>
        )}
        <Button className="w-full" type="submit">
          Rollen aktualisieren
        </Button>
      </form>
    </Form>
  );
}

export function CreateUserRolesForm({
  rolesResponse,
  userRolesResponse,
  userId,
}: RolesFormProps) {
  const router = useRouter();
  const [errors, setErrors] = useState<string[]>([]);
  const [filterValue, setFilterValue] = useState<string>("");
  const form = useForm<TUpdateRoleSchema>({
    resolver: zodResolver(UpdateUserRoleFormSchema),
    defaultValues: {
      roles: userRolesResponse,
    },
  });

  if (!rolesResponse.success) {
    return rolesResponse.error.message;
  }

  async function onSubmit(data: TUpdateRoleSchema) {
    try {
      await updateUserRoles({ data, userRolesResponse, userId });
      router.push(`/admin/user/create/${userId}/permissions`);
    } catch (err) {
      setErrors(parseErrorMessages(err));
    }
  }

  const filteredRoles = rolesResponse.roleList.filter((role) => {
    if (!filterValue) {
      return true;
    }
    const v = filterValue.toLowerCase();
    return (
      role.roleName?.toLowerCase().includes(v) ||
      role.roleKey?.toLowerCase().includes(v)
    );
  });

  return (
    <Form {...form}>
      <PermissionFilter
        filterValue={filterValue}
        setFilterValue={setFilterValue}
      />
      <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="roles"
          render={() => (
            <FormItem className="lg:grid-cols-2">
              {filteredRoles.map((role) => (
                <FormField
                  control={form.control}
                  key={role.roleKey}
                  name="roles"
                  render={({ field }) => (
                    <FormItem className="p-3" key={role.roleKey}>
                      <Collapsible>
                        <div className="flex flex-row items-center justify-between">
                          <FormLabel>
                            <span>{role.roleName}</span>
                            <Badge variant="secondary">{role.roleKey}</Badge>
                            <CollapsibleTrigger asChild>
                              <Button
                                className="size-8"
                                size="icon"
                                type="button"
                                variant="ghost"
                              >
                                <ChevronDownIcon />
                              </Button>
                            </CollapsibleTrigger>
                          </FormLabel>

                          <FormControl>
                            <Switch
                              checked={field.value.includes(role.roleKey)}
                              onCheckedChange={(checked) =>
                                checked
                                  ? field.onChange([
                                      ...field.value,
                                      role.roleKey,
                                    ])
                                  : field.onChange(
                                      field.value.filter(
                                        (value) => value !== role.roleKey
                                      )
                                    )
                              }
                            />
                          </FormControl>
                        </div>
                        <CollapsibleContent>
                          <ul className="text-muted-foreground text-sm">
                            {role.permissions.length > 0 ? (
                              role.permissions.map((permission) => (
                                <li
                                  className="my-2"
                                  key={permission.permissionKey}
                                >
                                  <span className="mr-2">
                                    {permission.permissionName}
                                  </span>
                                  <Badge
                                    className="font-mono"
                                    variant="secondary"
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
          <AlertWrapper variant="destructive">
            <AlertDescription>
              <ul>
                {errors.map((err) => (
                  <li key={err}>{err}</li>
                ))}
              </ul>
            </AlertDescription>
          </AlertWrapper>
        )}
        <div className="flex w-full flex-col gap-2 lg:flex-row lg:gap-2">
          <Button className="flex-auto" type="submit">
            Rollen vergeben und weiter
          </Button>
          <Button className="flex-auto" variant="secondary">
            <Link href={`/admin/user/create/${userId}/permissions`}>
              Weiter ohne Rollen
            </Link>
          </Button>
        </div>
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
  const [filterValue, setFilterValue] = useState<string>("");

  const form = useForm<TUpdatePermissionSchema>({
    resolver: zodResolver(UserUpdatePermissionsFormSchema),
    defaultValues: { permissions: extraPermissionsResponse },
  });

  if (!permissionsResponse.success) {
    return (
      <AlertWrapper variant="warning">
        <AlertIcon variant="warning" />
        <AlertTitle>Es ist ein Fehler aufgetreten.</AlertTitle>
        <AlertDescription>
          Wir konnten nicht alle erforderlichen Daten abrufen. Es ist daher
          aktuell nicht möglich, die Rollenberechtigungen zu bearbeiten.
          <br />
          {permissionsResponse.error.message}
        </AlertDescription>
      </AlertWrapper>
    );
  }

  async function onSubmit(data: TUpdatePermissionSchema) {
    try {
      await updateUserPermissions({ data, extraPermissionsResponse, userId });
      toast.success("Die Berechtigungen des Benutzers wurden aktualisiert.");
    } catch (err) {
      setErrors(parseErrorMessages(err));
    }
  }

  const filteredPermissions = permissionsResponse.permissionList.filter(
    (perm) => {
      if (!filterValue) {
        return true;
      }
      const v = filterValue.toLowerCase();
      return (
        perm.permissionName?.toLowerCase().includes(v) ||
        perm.permissionKey?.toLowerCase().includes(v)
      );
    }
  );

  return (
    <Form {...form}>
      <PermissionFilter
        filterValue={filterValue}
        setFilterValue={setFilterValue}
      />
      <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="permissions"
          render={() => (
            <FormItem className="lg:grid-cols-2">
              {filteredPermissions.map((perm) => (
                <FormField
                  control={form.control}
                  key={perm.recordId}
                  name="permissions"
                  render={({ field }) => (
                    <FormItem
                      className="flex flex-row items-center justify-between p-3"
                      key={perm.recordId}
                    >
                      <FormLabel>
                        <span>{perm.permissionName}</span>
                        <Badge variant="secondary">{perm.permissionKey}</Badge>
                      </FormLabel>
                      <FormControl>
                        <Switch
                          checked={field.value.includes(perm.permissionKey)}
                          onCheckedChange={(checked) =>
                            checked
                              ? field.onChange([
                                  ...field.value,
                                  perm.permissionKey,
                                ])
                              : field.onChange(
                                  field.value.filter(
                                    (value) => value !== perm.permissionKey
                                  )
                                )
                          }
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
          <AlertWrapper variant="destructive">
            <AlertDescription>
              <ul>
                {errors.map((err) => (
                  <li key={err}>{err}</li>
                ))}
              </ul>
            </AlertDescription>
          </AlertWrapper>
        )}
        <Button className="w-full" type="submit">
          Zusätzliche Berechtigungen aktualisieren
        </Button>
      </form>
    </Form>
  );
}

export function CreateUserPermissionsForm({
  permissionsResponse,
  extraPermissionsResponse,
  userId,
}: PermissionsFormProps) {
  const router = useRouter();
  const [errors, setErrors] = useState<string[]>([]);
  const [filterValue, setFilterValue] = useState<string>("");

  const form = useForm<TUpdatePermissionSchema>({
    resolver: zodResolver(UserUpdatePermissionsFormSchema),
    defaultValues: { permissions: extraPermissionsResponse },
  });

  if (!permissionsResponse.success) {
    return (
      <AlertWrapper variant="warning">
        <AlertIcon variant="warning" />
        <AlertTitle>Es ist ein Fehler aufgetreten.</AlertTitle>
        <AlertDescription>
          Wir konnten nicht alle erforderlichen Daten abrufen. Es ist daher
          aktuell nicht möglich, die Berechtigungen zu bearbeiten.
          <br />
          {permissionsResponse.error.message}
        </AlertDescription>
      </AlertWrapper>
    );
  }

  async function onSubmit(data: TUpdatePermissionSchema) {
    try {
      await updateUserPermissions({ data, extraPermissionsResponse, userId });
      router.push("/admin/user");
    } catch (err) {
      setErrors(parseErrorMessages(err));
    }
  }

  const filteredPermissions = permissionsResponse.permissionList.filter(
    (perm) => {
      if (!filterValue) {
        return true;
      }
      const v = filterValue.toLowerCase();
      return (
        perm.permissionName?.toLowerCase().includes(v) ||
        perm.permissionKey?.toLowerCase().includes(v)
      );
    }
  );

  return (
    <Form {...form}>
      <PermissionFilter
        filterValue={filterValue}
        setFilterValue={setFilterValue}
      />
      <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="permissions"
          render={() => (
            <FormItem className="lg:grid-cols-2">
              {filteredPermissions.map((perm) => (
                <FormField
                  control={form.control}
                  key={perm.recordId}
                  name="permissions"
                  render={({ field }) => (
                    <FormItem
                      className="flex flex-row items-center justify-between p-3"
                      key={perm.recordId}
                    >
                      <FormLabel>
                        <span>{perm.permissionName}</span>
                        <Badge variant="secondary">{perm.permissionKey}</Badge>
                      </FormLabel>
                      <FormControl>
                        <Switch
                          checked={field.value.includes(perm.permissionKey)}
                          onCheckedChange={(checked) =>
                            checked
                              ? field.onChange([
                                  ...field.value,
                                  perm.permissionKey,
                                ])
                              : field.onChange(
                                  field.value.filter(
                                    (value) => value !== perm.permissionKey
                                  )
                                )
                          }
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
          <AlertWrapper variant="destructive">
            <AlertDescription>
              <ul>
                {errors.map((err) => (
                  <li key={err}>{err}</li>
                ))}
              </ul>
            </AlertDescription>
          </AlertWrapper>
        )}
        <div className="flex w-full flex-col gap-2 lg:flex-row lg:gap-2">
          <Button className="flex-auto" variant="secondary">
            <Link href={`/admin/user/create/${userId}/roles`}>
              Zurück zu den Rollen
            </Link>
          </Button>
          <Button className="flex-auto" type="submit">
            Berechtigungen vergeben und abschließen
          </Button>
          <Button className="flex-auto" variant="secondary">
            <Link href={"/admin/user"}>
              Weiter ohne zusätzliche Berechtigungen
            </Link>
          </Button>
        </div>
      </form>
    </Form>
  );
}
