"use client";

import {
  type TRoleListResponse,
  type TSingleUser,
  updateRoles,
  updateUser,
} from "@/lib/user-actions";
import {
  NewEmailFormSchema,
  type TUpdateUserFormSchema,
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
import { Alert } from "@northware/ui/components/panels/alert";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@northware/ui/components/panels/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@northware/ui/components/panels/table";
import { MailIcon } from "@northware/ui/icons/lucide";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

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
  const router = useRouter();

  const onSubmit: SubmitHandler<TUpdateUserFormSchema> = async (data) => {
    setErrors([]); // Fehler zurücksetzen
    try {
      await updateUser(user?.id, data);
      router.push("/user");
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
  data,
  primaryEmailAddressId,
}: {
  data?: { id: string; emailAddress: string }[];
  primaryEmailAddressId?: string | null;
}) {
  return (
    <>
      <Table className="mb-2">
        <TableBody>
          {data?.map((row) => (
            <TableRow key={row.id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <MailIcon className="size-4" />
                  <span>{row.emailAddress}</span>
                  {primaryEmailAddressId === row.id && (
                    <Badge
                      variant="secondary"
                      className="bg-success text-success-foreground"
                    >
                      Primär-Adresse
                    </Badge>
                  )}
                </div>
              </TableCell>
              <TableCell className="text-right">
                {primaryEmailAddressId !== row.id && (
                  <Button variant="ghost" size="sm">
                    Als primär kennzeichnen
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-danger hover:bg-danger/20 hover:text-danger"
                >
                  E-Mail Adresse löschen
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <NewEmailFormDialog />
    </>
  );
}

function NewEmailFormDialog() {
  const form = useForm<z.infer<typeof NewEmailFormSchema>>({
    resolver: zodResolver(NewEmailFormSchema),
    defaultValues: {
      email: "",
      setAsVerified: true,
      setAsPrimary: false,
    },
  });

  function onSubmit(values: z.infer<typeof NewEmailFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Dialog>
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
                  name="email"
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
                  name="setAsPrimary"
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
                  name="setAsVerified"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Als bestätigt kennzeichnen</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
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
