import CreateUserForm from "@/components/create-user-form";
import { createUser } from "@/lib/user-actions";
import { Container } from "@northware/ui/components/container";
import { Headline } from "@northware/ui/components/headline";

export default function CreateUserPage() {
  return (
    <Container service="admin">
      <Headline level="h1">Benutzer erstellen</Headline>
      <CreateUserForm createUser={createUser} />
    </Container>
  );
}
