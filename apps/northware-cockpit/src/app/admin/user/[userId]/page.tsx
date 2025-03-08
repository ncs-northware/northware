import { RolesForm } from '@/components/update-user-form';
import { getRoleList, getSingleUser } from '@/lib/user-actions';
import { getUserRoles } from '@northware/auth/account';
import { Container, Headline } from '@northware/ui/components';
export default async function EditUserPage({
  params,
}: { params: Promise<{ userId: string }> }) {
  const { userId } = await params;
  const user = await getSingleUser(userId);
  const userRoles = await getUserRoles(userId);
  console.log('userRoles', userRoles);
  return (
    <Container service="cockpit">
      <Headline level="h2">Accounts von {user?.username}</Headline>
      <RolesForm roleResponse={await getRoleList()} />
    </Container>
  );
}
