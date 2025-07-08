"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertWrapper } from "@northware/ui/components/custom-alert";
import { Button } from "@northware/ui/components/ui-registry/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@northware/ui/components/ui-registry/form";
import { Input } from "@northware/ui/components/ui-registry/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import {
  CreateUserFormSchema,
  type TCreateUserFormSchema,
} from "@/lib/rbac-schema";

export default function CreateUserForm({
  createUser,
}: {
  createUser: SubmitHandler<TCreateUserFormSchema>;
}) {
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

  const router = useRouter();

  const onSubmit: SubmitHandler<TCreateUserFormSchema> = async (data) => {
    setErrors([]); // Fehler zurücksetzen
    try {
      await createUser(data);
      router.push("/admin");
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
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* 
        TODO: Styling für Form-Validation Messages
        */}
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vorname</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
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
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="emailAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-Mail</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Benutzername</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Passwort</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {errors.length > 0 && (
          <AlertWrapper variant="danger">
            <ul>
              {errors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </AlertWrapper>
        )}

        <Button type="submit">Benutzer hinzufügen</Button>
      </form>
    </Form>
  );
}
