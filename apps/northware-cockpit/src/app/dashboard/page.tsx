import { auth, signOut } from "@northware/auth/auth";
import { Container, DarkModeToggle, Headline } from "@northware/ui/components";

export default async function DashboardPage() {
  let session = await auth();
  return (
    <Container>
      <DarkModeToggle />
      <Headline
        level="h1"
        className="color-primary-foreground bg-primary text-3xl font-semibold"
      >
        Northware
      </Headline>
      You are logged in as {session?.user?.email}
      <SignOut />
    </Container>
  );
}

function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button type="submit">Sign out</button>
    </form>
  );
}
