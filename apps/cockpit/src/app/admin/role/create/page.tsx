import { Headline } from "@northware/ui/components/headline";
import { PermissionProvider } from "@northware/ui/components/permission-provider";
import { SidebarLayout } from "@northware/ui/components/sidebar-layout";
import { CreateRoleForm } from "@/components/role-forms";
import { getPermissionList } from "@/lib/role-actions";

export const metadata = { title: "Neue Rolle" };

export default async function Page() {
  const permissionList = await getPermissionList();
  return (
    <SidebarLayout
      breadcrumbs={[
        { label: "Admin Panel", href: "/admin" },
        { label: "Rollenverwaltung", href: "/admin/role" },
        { label: "Neue Rolle", href: "/admin/role/create", active: true },
      ]}
      service="cockpit"
    >
      <PermissionProvider permissionKeys={["cockpit::role.create"]}>
        <Headline level="h1">Neue Rolle</Headline>
        <CreateRoleForm permissionsResponse={permissionList} />
      </PermissionProvider>
    </SidebarLayout>
  );
}
