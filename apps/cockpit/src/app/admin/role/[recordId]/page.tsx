import { RoleDetailForm, RolePermissionsForm } from "@/components/role-forms";
import { getRole } from "@/lib/role-actions";
import { getPermissionList } from "@/lib/user-actions";
import { Headline } from "@northware/ui/components/headline";
import { SidebarLayout } from "@northware/ui/components/sidebar-layout";

export default async function UpdateRole({
  params,
}: { params: Promise<{ recordId: number }> }) {
  const { recordId } = await params;
  const details = await getRole(recordId);
  const permissionsList = await getPermissionList();
  return (
    <SidebarLayout
      service="cockpit"
      breadcrumbs={[
        { label: "Amin Panel", href: "/admin" },
        { label: "Rollenverwaltung", href: "/admin/role" },
        {
          label: details?.role.roleName || "Rolle",
          href: `/admin/role/${recordId}`,
        },
      ]}
    >
      <Headline level="h1">Rolle: {details?.role.roleName}</Headline>
      <RoleDetailForm roleDetails={details?.role} />

      <Headline level="h2" className="mt-5">
        Rollenberechtigungen
      </Headline>
      <RolePermissionsForm
        roleKey={details?.role.roleKey}
        permissionsResponse={permissionsList}
        rolePermissions={details?.permissions || []}
      />
    </SidebarLayout>
  );
}
