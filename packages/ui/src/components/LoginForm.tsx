"use client";

import { useForm } from "react-hook-form";
import { Button } from "./Button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "./Form";
import { Input } from "./Input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { useTheme } from "next-themes";

const formSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export function LoginForm({ onSubmit }: { onSubmit: (values: any) => void }) {
  const theme = useTheme();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  });

  return (
    <>
      <Image
        src={
          theme.resolvedTheme === "dark"
            ? "/img/logo-dark.svg"
            : "/img/logo-light.svg"
        }
        height={150}
        width={380}
        className="mb-6"
        alt="Northware Cockpit Logo"
      />
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E-Mail</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="kunde@northware.de"
                          autoComplete="email"
                          required
                          {...field}
                        />
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
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  size="lg"
                  variant="default"
                  type="submit"
                  className="w-full"
                >
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}

export function LoginWrapper({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex h-screen w-full flex-col items-center justify-center px-4">
      {children}
    </main>
  );
}
