import { getUserPermissions } from "@northware/auth/account";
import { currentUser } from "@northware/auth/server";
import { type ServiceType, suiteApps } from "@northware/service-config";
import { Brand } from "@northware/ui/components/brand";
import { Button } from "@northware/ui/components/button";
import { Card, CardContent } from "@northware/ui/components/card";
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
    <div className="flex h-svh flex-col items-center justify-center gap-8">
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

export async function AppPermissionProvider({
  children,
  service,
}: { children: ReactNode; service: ServiceType }) {
  const permissionKey = `${service}::app.read`;
  if (await userHasPermission([permissionKey])) {
    return children;
  }

  const sidebarApps = await Promise.all(
    suiteApps.map(async (app) => {
      const envKey = `NEXT_PUBLIC_${app.slug.toUpperCase()}_URL`;
      const url = process.env[envKey as keyof typeof process.env];

      return {
        slug: app.slug,
        url: url,
        allowed: await userHasPermission([`${app.slug}::app.read`]),
      };
    })
  );

  return (
    <div className="flex h-svh flex-col items-center justify-center gap-8">
      <div>
        <Headline level="h1">Bitte wählen Sie eine App</Headline>
        <p className="text-muted-foreground text-xl">
          Sie sind berechtigt, folgende Apps zu nutzen:
        </p>
      </div>
      <div className="flex gap-8">
        {sidebarApps.map(
          (app) =>
            app.allowed && (
              <Link key={app.slug} href={app.url || ""}>
                <Card className="hover:bg-accent/50">
                  <CardContent>
                    <Brand service={app.slug} />
                  </CardContent>
                </Card>
              </Link>
            )
        )}
      </div>
    </div>
  );
}
