import { getUserPermissions } from "@northware/auth/account";
import { SignOutButton } from "@northware/auth/client";
import { currentUser } from "@northware/auth/server";
import type { ServiceType } from "@northware/service-config";
import { Brand } from "@northware/ui/components/brand";
import { Button } from "@northware/ui/components/button";
import { Card, CardContent } from "@northware/ui/components/card";
import { Headline } from "@northware/ui/components/headline";
import { ShieldXIcon } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import type { MenuApps } from "./app-switch";

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
}: {
  children: ReactNode;
  permissionKeys: string[];
}) {
  if (await userHasPermission(permissionKeys)) {
    return children;
  }
  return (
    <div className="flex h-svh flex-col items-center justify-center gap-8">
      <ShieldXIcon className="size-12" />
      <div>
        <Headline className="mb-4 text-center" level="h1">
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
  apps,
}: {
  children: ReactNode;
  service: ServiceType;
  apps: MenuApps[];
}) {
  const permissionKey = `${service}::app.read`;
  if (await userHasPermission([permissionKey])) {
    return children;
  }

  const hasAllowedApps = apps.some((app) => app.allowed);

  return (
    <div className="flex h-svh flex-col items-center justify-center gap-8">
      {hasAllowedApps ? (
        <>
          <div>
            <Headline level="h1">Bitte wählen Sie eine App</Headline>
            <p className="text-muted-foreground text-xl">
              Sie sind berechtigt, folgende Apps zu nutzen:
            </p>
          </div>
          <div className="flex gap-8">
            {apps.map(
              (app) =>
                app.allowed && (
                  <Link href={app.url || ""} key={app.slug}>
                    <Card className="hover:bg-accent/50">
                      <CardContent>
                        <Brand service={app.slug} />
                      </CardContent>
                    </Card>
                  </Link>
                )
            )}
          </div>
        </>
      ) : (
        <>
          <ShieldXIcon className="size-12" />
          <div>
            <Headline className="mb-4 text-center" level="h1">
              Sie haben keinen Zugriff auf Apps.
            </Headline>
            <p className="text-center text-muted-foreground text-xl">
              Sie sind nicht berechtigt eine Northware App zu nutzen. Bitte
              kontaktieren Sie den Support.
            </p>
          </div>
        </>
      )}
      <SignOutButton>
        <Button variant="outline">Abmelden</Button>
      </SignOutButton>
    </div>
  );
}
