'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Brand } from '@northware/ui/components/base/Brand';
import { Button } from '@northware/ui/components/base/Button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@northware/ui/components/form-parts/Form';
import { Input } from '@northware/ui/components/form-parts/Input';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@northware/ui/components/panels/Card';
import { useTheme } from 'next-themes';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export function LoginForm({ onSubmit }: { onSubmit: (values: any) => void }) {
  const theme = useTheme();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: '', password: '' },
  });

  return (
    <>
      <Brand className="mb-6 text-2xl" iconWidth="w-14" />
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
