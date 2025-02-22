import { getSingleUser } from '@/lib/user-actions';
import { Container, Headline } from '@northware/ui/components';

export default async function EditUserAccounts({
  params,
}: { params: { id: string } }) {
  const user = await getSingleUser(params.id);
  console.log(user);
  return (
    <Container service="cockpit">
      <Headline level="h1">Accounts von {user.username}</Headline>
    </Container>
  );
}
