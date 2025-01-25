import { SignOutButton } from '@clerk/nextjs';
import { currentUser } from '@clerk/nextjs/server';
import { Container, Headline } from '@northware/ui/components';

export default async function DashboardPage() {
  const user = await currentUser();
  return (
    <Container service="cockpit">
      <Headline level="h1">Dashboard Home</Headline>
      {user ? (
        <SignOutButton redirectUrl="/login">
          <button type="button">Logout</button>
        </SignOutButton>
      ) : null}
    </Container>
  );
}
