import { getRoleList } from "@/lib/user-actions";
import { DataTable } from "@northware/ui/components/data-table";
import { Headline } from "@northware/ui/components/headline";
import { SidebarLayout } from "@northware/ui/components/sidebar-layout";
import { columns } from "./columns";

export default async function RoleDashboard() {
  const roleList = (await getRoleList()) || [];
  if (!roleList.success) {
    // globalError
    return <div>Fehler: {roleList.error.message}</div>;
  }
  return (
    <SidebarLayout
      service="cockpit"
      defaultOpen={false}
      breadcrumbs={[
        { label: "Admin Panel", href: "/admin" },
        { label: "Rollenverwaltung", href: "/admin/roles", active: true },
      ]}
    >
      <Headline level="h1">Rollenverwaltung</Headline>
      <DataTable
        columns={columns}
        data={roleList.roleList}
        withRowSelect={false}
      />
    </SidebarLayout>
  );
}
