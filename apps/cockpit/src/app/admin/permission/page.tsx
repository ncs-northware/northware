import { CreatePermissionDetails } from "@/components/role-forms";
import { getPermissionList } from "@/lib/role-actions";
import { DataTable } from "@northware/ui/components/data-table";
import { Headline } from "@northware/ui/components/headline";
import { SidebarLayout } from "@northware/ui/components/sidebar-layout";
import { columns } from "./columns";

export const metadata = { title: "Berechtigungsschlüssel verwalten" };

export default async function PermissionDashboard() {
  const permissionList = await getPermissionList();
  if (!permissionList.success) {
    // globalError
    return <div>Fehler: {permissionList.error.message}</div>;
  }
  return (
    <SidebarLayout
      service="cockpit"
      defaultOpen={false}
      breadcrumbs={[
        { label: "Admin Panel", href: "/admin" },
        {
          label: "Berechtigungsschlüssel verwalten",
          href: "/admin/permission",
        },
      ]}
    >
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
        <CreatePermissionDetails />
      </div>
      <DataTable
        columns={columns}
        data={permissionList.permissionList}
        withRowSelect={false}
      />
    </SidebarLayout>
  );
}
