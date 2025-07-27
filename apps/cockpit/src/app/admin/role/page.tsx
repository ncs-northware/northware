import { Headline } from "@northware/ui/components/headline";
import { DataFetchError } from "@northware/ui/components/no-data-template";
import {
  PermissionProvider,
  userHasPermission,
} from "@northware/ui/components/permission-provider";
import { SidebarLayout } from "@northware/ui/components/sidebar-layout";
import { Button } from "@northware/ui/components/ui-registry/button";
import Link from "next/link";
import { getRoleList } from "@/lib/role-actions";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export const metadata = { title: "Rollenverwaltung" };

export default async function Page() {
  const roleList = (await getRoleList()) || [];
  if (!roleList.success) {
    return (
      <DataFetchError message={roleList.error.message} service="cockpit" />
    );
  }
  return (
    <SidebarLayout
      breadcrumbs={[
        { label: "Admin Panel", href: "/admin" },
        { label: "Rollenverwaltung", href: "/admin/roles", active: true },
      ]}
      defaultOpen={false}
      service="cockpit"
    >
      <PermissionProvider permissionKeys={["cockpit::role.read"]}>
        <div className="flex justify-between gap-4">
          {/* FIXME: Responsive überarbeiten */}
          <div>
            <Headline level="h1">Rollenverwaltung</Headline>
            <p className="mb-4 text-justify font-medium text-muted-foreground">
              Rollen sind Sammlungen von Rechten. Vergebe Rollen an einen
              Benutzer, um ihm diese Sammlung an Rechten zuzuweisen. Benutzer
              einer bestimmten Rolle erhalten alle enthaltenen Rechte. Es ist
              nicht möglich dem Benutzer ein Rollen-Recht zu entziehen.
            </p>
          </div>
          {(await userHasPermission(["cockpit::role.create"])) && (
            <Button asChild>
              <Link href="/admin/role/create">Rolle erstellen</Link>
            </Button>
          )}
        </div>
        <DataTable
          columns={columns}
          data={roleList.roleList}
          permissions={{
            update: await userHasPermission(["cockpit::role.update"]),
            delete: await userHasPermission(["cockpit::role.delete"]),
          }}
        />
      </PermissionProvider>
    </SidebarLayout>
  );
}
