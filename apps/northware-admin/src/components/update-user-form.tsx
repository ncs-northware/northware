"use client";

import {
  type TRoleListResponse,
  type TSingleUser,
  changePassword,
  createEmailAddress,
  deleteEmailAddress,
  updateEmailAddress,
  updateRoles,
  updateUser,
} from "@/lib/user-actions";
import {
  type TChangePasswordFormSchema,
  type TUpdateUserFormSchema,
  changePasswordFormSchema,
  createEMailAddressFormSchema,
  updateUserFromSchema,
} from "@/lib/user-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Badge } from "@northware/ui/components/base/badge";
import { Button } from "@northware/ui/components/base/button";
import { Checkbox } from "@northware/ui/components/form-parts/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@northware/ui/components/form-parts/form";
import { Input } from "@northware/ui/components/form-parts/input";
import { PasswordInput } from "@northware/ui/components/form-parts/password-input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@northware/ui/components/menu/dropdown-menu";
import { Alert } from "@northware/ui/components/panels/alert";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@northware/ui/components/panels/dialog";
import { toast } from "@northware/ui/components/panels/sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@northware/ui/components/panels/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@northware/ui/components/panels/tooltip";
import {
  BadgeCheckIcon,
  EllipsisIcon,
  MailIcon,
  TriangleAlertIcon,
} from "@northware/ui/icons/lucide";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

// Clerk User Data

export function EditUserForm({ user }: { user?: TSingleUser }) {
  const [errors, setErrors] = useState<string[]>([]);
  const form = useForm<z.infer<typeof updateUserFromSchema>>({
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
      if (err instanceof Error) {
        // Parse die Fehlermeldungen aus dem Error-Objekt
        const errorMessages = JSON.parse(err.message) as string[];
        setErrors(errorMessages); // Setze die Fehlermeldungen im Zustand
      } else {
        setErrors([
          "Es ist ein unbekannter Fehler innerhalb des Programms aufgetreten.",
        ]);
      }
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
            <ul className="w-max">
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
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
  data?: { id: string; emailAddress: string; verificationStatus: string }[];
  primaryEmailAddressId?: string | null;
}) {
  const [errors, setErrors] = useState<string[]>([]);

  const setPrimaryEmail = async (addressId: string) => {
    setErrors([]); // Fehler zurücksetzen
    try {
      await updateEmailAddress(addressId, "primary");
      toast.success("Die primäre E-Mail Adresse wurde aktualisiert.");
    } catch (err) {
      if (err instanceof Error) {
        // Parse die Fehlermeldungen aus dem Error-Objekt
        const errorMessages = JSON.parse(err.message) as string[];
        setErrors(errorMessages); // Setze die Fehlermeldungen im Zustand
      } else {
        setErrors([
          "Es ist ein unbekannter Fehler innerhalb des Programms aufgetreten.",
        ]);
      }
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
      if (err instanceof Error) {
        // Parse die Fehlermeldungen aus dem Error-Objekt
        const errorMessages = JSON.parse(err.message) as string[];
        setErrors(errorMessages); // Setze die Fehlermeldungen im Zustand
      } else {
        setErrors([
          "Es ist ein unbekannter Fehler innerhalb des Programms aufgetreten.",
        ]);
      }
    }
  };

  const submitEmailDeletion = async (addressId: string) => {
    setErrors([]); // Fehler zurücksetzen
    try {
      await deleteEmailAddress(addressId);
      toast.success("Die E-Mail Adresse wurde gelöscht.");
    } catch (err) {
      if (err instanceof Error) {
        // Parse die Fehlermeldungen aus dem Error-Objekt
        const errorMessages = JSON.parse(err.message) as string[];
        setErrors(errorMessages); // Setze die Fehlermeldungen im Zustand
      } else {
        setErrors([
          "Es ist ein unbekannter Fehler innerhalb des Programms aufgetreten.",
        ]);
      }
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
  const form = useForm<z.infer<typeof createEMailAddressFormSchema>>({
    resolver: zodResolver(createEMailAddressFormSchema),
    defaultValues: {
      emailAddress: "",
      verified: true,
      primary: false,
    },
  });

  async function onSubmit(
    values: z.infer<typeof createEMailAddressFormSchema>
  ) {
    setErrors([]); // Fehler zurücksetzen
    try {
      await createEmailAddress(values, userId);
      setOpen(false);
      toast.success("Die E-Mail Adresse wurde hinzugefügt.");
    } catch (err) {
      if (err instanceof Error) {
        // Parse die Fehlermeldungen aus dem Error-Objekt
        const errorMessages = JSON.parse(err.message) as string[];
        setErrors(errorMessages); // Setze die Fehlermeldungen im Zustand
      } else {
        setErrors([
          "Es ist ein unbekannter Fehler innerhalb des Programms aufgetreten.",
        ]);
      }
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
                    <ul className="w-max">
                      {errors.map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                    </ul>
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

  const form = useForm<z.infer<typeof changePasswordFormSchema>>({
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
      if (err instanceof Error) {
        // Parse die Fehlermeldungen aus dem Error-Objekt
        const errorMessages = JSON.parse(err.message) as string[];
        setErrors(errorMessages); // Setze die Fehlermeldungen im Zustand
      } else {
        setErrors([
          "Es ist ein unbekannter Fehler innerhalb des Programms aufgetreten.",
        ]);
      }
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
                    <ul className="w-max">
                      {errors.map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                    </ul>
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

// User Roles

type RolesFormProps = {
  rolesResponse: TRoleListResponse;
  userRolesResponse: (string | null)[];
  userId: string;
};

export function RolesForm({
  rolesResponse,
  userRolesResponse,
  userId,
}: RolesFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  if (!rolesResponse.success) {
    return <div>Fehler: {rolesResponse.error.message}</div>;
  }

  const FormSchema = z.object(
    rolesResponse.roleList.reduce(
      (acc, role) => {
        acc[role.roleKey] = z.boolean().default(false).optional();
        return acc;
      },
      {} as Record<string, z.ZodOptional<z.ZodDefault<z.ZodBoolean>>>
    )
  );

  const defaultValues = rolesResponse.roleList.reduce(
    (acc, role) => {
      acc[role.roleKey] = userRolesResponse.includes(role.roleKey) || false;
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
      await updateRoles({ data, userRolesResponse, userId });
      router.push("/admin");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {rolesResponse.roleList.map((role) => (
          <FormField
            key={role.recordId}
            control={form.control}
            name={role.roleKey}
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>{role.roleName}</FormLabel>
                </div>
              </FormItem>
            )}
          />
        ))}

        {error && (
          <Alert variant="danger">
            <p>{error}</p>
          </Alert>
        )}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
