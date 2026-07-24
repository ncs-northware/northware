import { AlertWrapper } from "@northware/ui/components/custom-alert";
import { Headline } from "@northware/ui/components/headline";
import { DataFetchError } from "@northware/ui/components/no-data-template";
import {
  PermissionProvider,
  userHasPermission,
} from "@northware/ui/components/permission-provider";
import {
  AlertDescription,
  AlertTitle,
} from "@northware/ui/components/shadcn/alert";
import { Button } from "@northware/ui/components/shadcn/button";
import { SidebarLayout } from "@northware/ui/components/sidebar-layout";
import { LightbulbIcon, PlusIcon } from "@northware/ui/icons/lucide";
import Link from "next/link";
import { getUserList } from "@/lib/user-actions";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export const metadata = { title: "Benutzerverwaltung" };

export default async function Page() {
  const userArray = (await getUserList()) || [];
  if (!userArray.success) {
    return (
      <DataFetchError message={userArray.error.message} service="cockpit" />
    );
  }
  return (
    <SidebarLayout
      breadcrumbs={[
        { href: "/admin", label: "Admin Panel" },
        { active: true, href: "/admin/user", label: "Benutzerverwaltung" },
      ]}
      defaultOpen={false}
      service="cockpit"
    >
      <PermissionProvider permissionKeys={["cockpit::user.read"]}>
        <div className="flex justify-between gap-4">
          <Headline level="h1">Benutzerverwaltung</Headline>
          {(await userHasPermission(["cockpit::user.create"])) === true && (
            <Button asChild>
              <Link href="user/create">
                <PlusIcon className="sm:hidden" />
                <span className="hidden sm:block">Benutzer hinzufügen</span>
              </Link>
            </Button>
          )}
        </div>
        <p className="mb-4 text-justify font-medium text-muted-foreground">
          Ein Benutzerkonto ist eine digitale Identität, mit der sich eine
          Person in den Northware Apps authentifizieren kann.
        </p>
        <DataTable
          columns={columns}
          data={userArray.users}
          permissions={{
            delete: await userHasPermission(["cockpit::user.delete"]),
            update: await userHasPermission(["cockpit::user.update"]),
          }}
        />
        <AlertWrapper>
          <LightbulbIcon className="size-4" />
          <AlertTitle>Tipp</AlertTitle>
          <AlertDescription>
            Die eigenen Benutzerdaten können über das Benutzerprofil geändert
            werden.
          </AlertDescription>
        </AlertWrapper>
      </PermissionProvider>
    </SidebarLayout>
  );
}
