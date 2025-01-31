import CreateUserForm from '@/components/create-user-form';
import { Container, Headline } from '@northware/ui/components';

export default function AdminDashboard() {
  return (
    <Container service="cockpit">
      <Headline level="h1">Benutzer erstellen</Headline>
      <CreateUserForm />
    </Container>
  );
}
