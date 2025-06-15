import {
  RoleDeleteButton,
  RoleDetailForm,
  RolePermissionsForm,
} from "@/components/role-forms";
import { getRole } from "@/lib/role-actions";
import { getPermissionList } from "@/lib/role-actions";
import { Headline } from "@northware/ui/components/headline";
import { SidebarLayout } from "@northware/ui/components/sidebar-layout";
import { redirect } from "next/navigation";

export async function generateMetadata({
  params,
}: { params: Promise<{ recordId: number }> }) {
  const { recordId } = await params;
  const details = await getRole(recordId);
  return { title: details?.role.roleName };
}

export default async function UpdateRole({
  params,
}: { params: Promise<{ recordId: number }> }) {
  const { recordId } = await params;
  const details = await getRole(recordId);
  const permissionsList = await getPermissionList();
  if (!details) {
    redirect("/admin/role");
  }
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
      <div className="flex justify-between gap-4">
        <Headline level="h1">{details?.role.roleName}</Headline>
        <RoleDeleteButton recordId={recordId} mode="page" />
      </div>
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
