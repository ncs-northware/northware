import { CreateRoleForm } from "@/components/role-forms";
import { getPermissionList } from "@/lib/role-actions";
import { Headline } from "@northware/ui/components/headline";
import { SidebarLayout } from "@northware/ui/components/sidebar-layout";

export const metadata = { title: "Neue Rolle" };

export default async function Page() {
  const permissionList = await getPermissionList();
  return (
    <SidebarLayout
      service="cockpit"
      breadcrumbs={[
        { label: "Admin Panel", href: "/admin" },
        { label: "Rollenverwaltung", href: "/admin/role" },
        { label: "Neue Rolle", href: "/admin/role/create", active: true },
      ]}
    >
      <Headline level="h1">Neue Rolle</Headline>
      <CreateRoleForm permissionsResponse={permissionList} />
    </SidebarLayout>
  );
}
