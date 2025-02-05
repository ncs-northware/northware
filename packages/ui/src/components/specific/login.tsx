'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import type { ServiceType } from '@northware/service-config';
import { Brand } from '@northware/ui/components/base/brand';
import { Button } from '@northware/ui/components/base/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@northware/ui/components/form-parts/form';
import { Input } from '@northware/ui/components/form-parts/input';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@northware/ui/components/panels/card';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export function LoginForm({
  onSubmit,
  service,
}: {
  onSubmit: (values: { email: string; password: string }) => void;
  service: ServiceType;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: '', password: '' },
  });

  return (
    <>
      <Brand className="mb-6 text-2xl" iconWidth="w-14" service={service} />
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
