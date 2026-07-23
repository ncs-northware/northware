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
        { href: "/admin", label: "Admin Panel" },
        { href: "/admin/role", label: "Rollenverwaltung" },
        { active: true, href: "/admin/role/create", label: "Neue Rolle" },
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
