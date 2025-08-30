import { getUserRoles } from "@northware/auth/account";
import { Headline } from "@northware/ui/components/headline";
import { PermissionProvider } from "@northware/ui/components/permission-provider";
import { UpdateUserRolesForm } from "@/components/user-forms";
import { getRoleList } from "@/lib/role-actions";

export default async function Page({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;
  const roleList = await getRoleList();
  const userRoles = await getUserRoles(userId);
  return (
    <PermissionProvider
      permissionKeys={["cockpit::user.update", "cockpit::role.read"]}
    >
      <Headline level="h1">Rollen des Benutzers</Headline>
      <p className="mb-4 text-justify font-medium text-muted-foreground">
        Rollen sind Sammlungen von Rechten. Vergebe Rollen an einen Benutzer, um
        ihm diese Sammlung an Rechten zuzuweisen. Benutzer einer bestimmten
        Rolle erhalten alle enthaltenen Rechte. Es ist nicht möglich dem
        Benutzer ein Rollen-Recht zu entziehen.
      </p>
      <UpdateUserRolesForm
        rolesResponse={roleList}
        userId={userId}
        userRolesResponse={userRoles}
      />
    </PermissionProvider>
  );
}
