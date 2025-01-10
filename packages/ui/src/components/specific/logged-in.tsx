import { signOut } from '@northware/auth/auth';
import type { ServiceType } from '@northware/service-config';
import { Brand } from '@northware/ui/components/base/brand';
import { Button } from '@northware/ui/components/base/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@northware/ui/components/panels/card';
import Link from 'next/link';

interface User {
  name?: string | null | undefined;
  email?: string | null | undefined;
}

export function MessageLoggedIn({
  user,
  service,
}: { user: User; service: ServiceType }) {
  return (
    <>
      <Brand className="mb-6 text-2xl" iconWidth="w-14" service={service} />
      <Card>
        <CardHeader>
          <CardTitle className="text-2-xl">
            Sie sind bereits angemeldet.
          </CardTitle>
        </CardHeader>
        <CardContent>
          {user?.name ? (
            <p className="font-medium text-sm leading-none">{user?.name}</p>
          ) : (
            ''
          )}
          <p className="line-clamp-2 text-muted-foreground text-sm leading-snug">
            {user?.email}
          </p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href="/">
            <Button variant="link">Zum Dasboard</Button>
          </Link>
          <form
            action={async () => {
              'use server';
              await signOut();
            }}
          >
            <Button variant="outline" type="submit">
              Abmelden
            </Button>
          </form>
        </CardFooter>
      </Card>
    </>
  );
}
