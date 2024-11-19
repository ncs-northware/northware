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
import { signIn } from "@northware/auth/auth";

const formSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export function LoginForm({ onSubmit }: { onSubmit: (values: any) => void }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-Mail</FormLabel>
              <FormControl>
                <Input placeholder="kunde@northware.de" {...field} />
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
                <Input placeholder="kunde@northware.de" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button size="lg" variant="default" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}
