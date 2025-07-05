import { getExtraPermissions } from "@northware/auth/account";
import { Headline } from "@northware/ui/components/headline";
import { PermissionProvider } from "@northware/ui/components/permission-provider";
import { UpdateUserPermissionsForm } from "@/components/user-forms";
import { getPermissionList } from "@/lib/role-actions";
export default async function Page({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;
  const permissionList = await getPermissionList();
  const extraPermissions = await getExtraPermissions(userId);
  return (
    <PermissionProvider
      permissionKeys={["cockpit::user.update", "cockpit::permission:read"]}
    >
      <Headline level="h1">Zusätzliche Berechtigungen des Benutzers</Headline>
      <p className="mb-4 text-justify font-medium text-muted-foreground">
        Dem einzelnen Benutzer können einzelne Berechtigungen zugewiesen werden,
        um die Rollen-Berechtigungen zu erweitern.
      </p>
      <UpdateUserPermissionsForm
        extraPermissionsResponse={extraPermissions}
        permissionsResponse={permissionList}
        userId={userId}
      />
      {/* TODO: Dialogs für PermissionKeys bearbeiten und erstellen, Berechtigungen gruppieren?, Berechtigungen in einem grid darstellen? */}
    </PermissionProvider>
  );
}
