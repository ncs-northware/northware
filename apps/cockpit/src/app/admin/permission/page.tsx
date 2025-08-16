import { Headline } from "@northware/ui/components/headline";
import { DataFetchError } from "@northware/ui/components/no-data-template";
import {
  PermissionProvider,
  userHasPermission,
} from "@northware/ui/components/permission-provider";
import { SidebarLayout } from "@northware/ui/components/sidebar-layout";
import { CreatePermissionDetails } from "@/components/role-forms";
import { getPermissionList } from "@/lib/role-actions";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export const metadata = { title: "Berechtigungsschlüssel verwalten" };

export default async function Page() {
  const permissionList = await getPermissionList();
  if (!permissionList.success) {
    return (
      <DataFetchError
        message={permissionList.error.message}
        service="cockpit"
      />
    );
  }
  return (
    <SidebarLayout
      breadcrumbs={[
        { label: "Admin Panel", href: "/admin" },
        {
          label: "Berechtigungsschlüssel verwalten",
          href: "/admin/permission",
        },
      ]}
      defaultOpen={false}
      service="cockpit"
    >
      <PermissionProvider permissionKeys={["cockpit::permission.read"]}>
        <div className="flex justify-between gap-4">
          <div>
            <Headline level="h1">Berechtigungsschlüssel verwalten</Headline>
            <p className="mb-4 text-justify font-medium text-muted-foreground">
              Berechtigungsschlüssel sind Strings, die innerhalb der Northware
              Apps verwendet werden können, um zu prüfen, ob Benutzer und
              Benutzergruppen berechtigt sind, einzelne Seiten aufzurufen, Daten
              anzusehen und Aktionen auszuführen. Die einzelnen Berechtigungen
              können verschiedenen Rollen oder einzelnen Benutzern zugewiesen
              werden.
            </p>
          </div>
          {(await userHasPermission(["cockpit::permission.create"])) && (
            <CreatePermissionDetails />
          )}
        </div>
        <DataTable
          columns={columns}
          data={permissionList.permissionList}
          permissions={{
            update: await userHasPermission(["cockpit::permission.update"]),
            delete: await userHasPermission(["cockpit::permission.delete"]),
          }}
        />
      </PermissionProvider>
    </SidebarLayout>
  );
}
