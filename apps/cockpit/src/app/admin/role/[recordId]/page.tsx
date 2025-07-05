import { Headline } from "@northware/ui/components/headline";
import {
  PermissionProvider,
  userHasPermission,
} from "@northware/ui/components/permission-provider";
import { SidebarLayout } from "@northware/ui/components/sidebar-layout";
import { redirect } from "next/navigation";
import {
  RoleDeleteButton,
  RolePermissionsForm,
  UpdateRoleDetailForm,
} from "@/components/role-forms";
import { getPermissionList, getRole } from "@/lib/role-actions";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ recordId: number }>;
}) {
  const { recordId } = await params;
  const details = await getRole(recordId);
  return { title: details?.role.roleName };
}

export default async function Page({
  params,
}: {
  params: Promise<{ recordId: number }>;
}) {
  const { recordId } = await params;
  const details = await getRole(recordId);
  const permissionsList = await getPermissionList();
  if (!details) {
    redirect("/admin/role");
  }
  return (
    <SidebarLayout
      breadcrumbs={[
        { label: "Amin Panel", href: "/admin" },
        { label: "Rollenverwaltung", href: "/admin/role" },
        {
          label: details?.role.roleName || "Rolle",
          href: `/admin/role/${recordId}`,
        },
      ]}
      service="cockpit"
    >
      <PermissionProvider permissionKeys={["cockpit::role.update"]}>
        <div className="flex justify-between gap-4">
          <Headline level="h1">{details?.role.roleName}</Headline>
          {(await userHasPermission(["cockpit::role.delete"])) && (
            <RoleDeleteButton mode="page" recordId={recordId} />
          )}
        </div>
        <UpdateRoleDetailForm roleDetails={details?.role} />

        <Headline className="mt-5" level="h2">
          Rollenberechtigungen
        </Headline>
        <RolePermissionsForm
          permissionsResponse={permissionsList}
          roleKey={details?.role.roleKey}
          rolePermissions={details?.permissions || []}
        />
      </PermissionProvider>
    </SidebarLayout>
  );
}
