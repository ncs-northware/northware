import { UpdateUserPermissionsForm } from "@/components/update-user-form";
import { getPermissionList } from "@/lib/user-actions";
import { getExtraPermissions } from "@northware/auth/account";
import { Headline } from "@northware/ui/components/headline";

export default async function UpdatePermissionsPage({
  params,
}: { params: Promise<{ userId: string }> }) {
  const { userId } = await params;
  const permissionList = await getPermissionList();
  const extraPermissions = await getExtraPermissions(userId);
  return (
    <>
      <Headline level="h1">Zusätzliche Berechtigungen des Benutzers</Headline>
      <p className="mb-4 text-justify font-medium text-muted-foreground lg:w-1/2">
        Dem einzelnen Benutzer können einzelne Berechtigungen zugewiesen werden,
        um die Rollen-Berechtigungen zu erweitern.
      </p>
      <UpdateUserPermissionsForm
        permissionsResponse={permissionList}
        userId={userId}
        extraPermissionsResponse={extraPermissions}
      />
    </>
  );
}
