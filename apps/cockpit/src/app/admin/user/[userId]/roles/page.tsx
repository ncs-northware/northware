import { RolesForm } from "@/components/update-user-form";
import { getRoleList } from "@/lib/user-actions";
import { getUserRoles } from "@northware/auth/account";
import { Headline } from "@northware/ui/components/headline";

export default async function EditUserRolesPage({
  params,
}: { params: Promise<{ userId: string }> }) {
  const { userId } = await params;
  const roleList = await getRoleList();
  const userRoles = await getUserRoles(userId);
  return (
    <>
      <Headline level="h1">Rollen und Berechtigungen</Headline>
      <div>
        <Headline level="h2" className="mb-4">
          Rollen
        </Headline>
        <RolesForm
          rolesResponse={roleList}
          userId={userId}
          userRolesResponse={userRoles}
        />
      </div>
    </>
  );
}
