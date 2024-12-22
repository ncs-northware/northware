import { signOut } from "@northware/auth/auth";
import { Brand } from "@northware/ui/components/base/Brand";
import { Button } from "@northware/ui/components/base/Button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@northware/ui/components/panels/Card";
import Link from "next/link";

export function MessageLoggedIn({ user }: { user: any }) {
  return (
    <>
      <Brand className="mb-6 text-2xl" iconWidth="w-14" />
      <Card>
        <CardHeader>
          <CardTitle className="text-2-xl">
            Sie sind bereits angemeldet.
          </CardTitle>
        </CardHeader>
        <CardContent>
          {user?.name ? (
            <p className="text-sm font-medium leading-none">{user?.name}</p>
          ) : (
            ""
          )}
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {user?.email}
          </p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href="/">
            <Button variant="link">Zum Dasboard</Button>
          </Link>
          <form
            action={async () => {
              "use server";
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
