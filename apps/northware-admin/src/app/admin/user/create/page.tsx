import CreateUserForm from "@/components/create-user-form";
import { createUser } from "@/lib/user-actions";
import { Headline } from "@northware/ui/components/base/headline";
import { Container } from "@northware/ui/components/layouts/container";

export default function CreateUserPage() {
  return (
    <Container service="cockpit">
      <Headline level="h1">Benutzer erstellen</Headline>
      <CreateUserForm createUser={createUser} />
    </Container>
  );
}
