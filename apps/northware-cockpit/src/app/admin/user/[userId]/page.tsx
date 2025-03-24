import { RolesForm } from '@/components/update-user-form';
import { getRoleList, getSingleUser } from '@/lib/user-actions';
import { getUserRoles } from '@northware/auth/account';
import { Headline } from '@northware/ui/components/base/headline';
import { Container } from '@northware/ui/components/layouts/container';

export default async function EditUserPage({
  params,
}: { params: Promise<{ userId: string }> }) {
  const { userId } = await params;
  const user = await getSingleUser(userId);
  const userRolesResponse = await getUserRoles(userId);
  const roleListResponse = await getRoleList();
  return (
    <Container service="cockpit">
      <Headline level="h2">Accounts von {user?.username}</Headline>
      <RolesForm
        rolesResponse={roleListResponse}
        userRolesResponse={userRolesResponse}
        userId={userId}
      />
    </Container>
  );
}
