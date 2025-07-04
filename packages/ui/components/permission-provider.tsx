import { getUserPermissions } from "@northware/auth/account";
import { currentUser } from "@northware/auth/server";
import { Button } from "@northware/ui/components/button";
import { Headline } from "@northware/ui/components/headline";
import { ShieldXIcon } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

export async function userHasPermission(permissionKeys: string[]) {
  const user = await currentUser();
  const permissions = await getUserPermissions(user?.id);

  // Wenn der Benutzer "all-access" hat, sind alle Berechtigungen erfüllt
  if (permissions.includes("all-access")) {
    return true;
  }

  // Überprüfen, ob jede erforderliche Berechtigung im 'permissions'-Array enthalten ist
  return permissionKeys.every((key) => permissions.includes(key));
}

export async function PermissionProvider({
  children,
  permissionKeys,
}: { children: ReactNode; permissionKeys: string[] }) {
  if (await userHasPermission(permissionKeys)) {
    return children;
  }
  return (
    <div className="flex h-full flex-col items-center justify-center gap-8">
      <ShieldXIcon className="size-12" />
      <div>
        <Headline level="h1" className="mb-4 text-center">
          Der Zugriff wurde verweigert.
        </Headline>
        <p className="text-center text-muted-foreground text-xl">
          Sie sind nicht berechtigt, diese Seite zu besuchen.
          <br />
          Falls Sie der Meinung sind, dass Sie die nötigen Berechtigungen
          erhalten sollten, treten Sie mit dem Support in Kontakt.
        </p>
      </div>
      <Button size="lg">
        <Link href="/">Zurück zur Homepage</Link>
      </Button>
    </div>
  );
}
