import CreateUserForm from '@/components/create-user-form';
import { createUser } from '@/lib/user-actions';
import { Container, Headline } from '@northware/ui/components';

export default function AdminDashboard() {
  return (
    <Container service="cockpit">
      <Headline level="h1">Benutzer erstellen</Headline>
      <CreateUserForm createUser={createUser} />
    </Container>
  );
}
