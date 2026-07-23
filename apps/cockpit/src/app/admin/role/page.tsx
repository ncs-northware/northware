import { Headline } from "@northware/ui/components/headline";
import { DataFetchError } from "@northware/ui/components/no-data-template";
import {
  PermissionProvider,
  userHasPermission,
} from "@northware/ui/components/permission-provider";
import { Button } from "@northware/ui/components/shadcn/button";
import { SidebarLayout } from "@northware/ui/components/sidebar-layout";
import { PlusIcon } from "@northware/ui/icons/lucide";
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
        { href: "/admin", label: "Admin Panel" },
        { active: true, href: "/admin/roles", label: "Rollenverwaltung" },
      ]}
      defaultOpen={false}
      service="cockpit"
    >
      <PermissionProvider permissionKeys={["cockpit::role.read"]}>
        <div className="flex justify-between gap-4">
          <Headline level="h1">Rollenverwaltung</Headline>
          {(await userHasPermission(["cockpit::role.create"])) === true && (
            <Button asChild>
              <Link href="/admin/role/create">
                <PlusIcon className="sm:hidden" />
                <span className="hidden sm:block">Rolle erstellen</span>
              </Link>
            </Button>
          )}
        </div>
        <p className="mb-4 text-justify font-medium text-muted-foreground">
          Rollen sind Sammlungen von Rechten. Vergebe Rollen an einen Benutzer,
          um ihm diese Sammlung an Rechten zuzuweisen. Benutzer einer bestimmten
          Rolle erhalten alle enthaltenen Rechte. Es ist nicht möglich dem
          Benutzer ein Rollen-Recht zu entziehen.
        </p>
        <DataTable
          columns={columns}
          data={roleList.roleList}
          permissions={{
            delete: await userHasPermission(["cockpit::role.delete"]),
            update: await userHasPermission(["cockpit::role.update"]),
          }}
        />
      </PermissionProvider>
    </SidebarLayout>
  );
}
