import { UpdateRolesForm } from "@/components/user-forms";
import { getRoleList } from "@/lib/role-actions";
import { getUserRoles } from "@northware/auth/account";
import { Headline } from "@northware/ui/components/headline";

export default async function Page({
  params,
}: { params: Promise<{ userId: string }> }) {
  const { userId } = await params;
  const roleList = await getRoleList();
  const userRoles = await getUserRoles(userId);
  return (
    <>
      <Headline level="h1">Rollen des Benutzers</Headline>
      <p className="mb-4 text-justify font-medium text-muted-foreground">
        Rollen sind Sammlungen von Rechten. Vergebe Rollen an einen Benutzer, um
        ihm diese Sammlung an Rechten zuzuweisen. Benutzer einer bestimmten
        Rolle erhalten alle enthaltenen Rechte. Es ist nicht möglich dem
        Benutzer ein Rollen-Recht zu entziehen.
      </p>
      <UpdateRolesForm
        rolesResponse={roleList}
        userId={userId}
        userRolesResponse={userRoles}
      />
      {/* TODO: Dialogs für Rollen bearbeiten und erstellen, Rollen gruppieren?, Rollen in einem grid darstellen? */}
    </>
  );
}
