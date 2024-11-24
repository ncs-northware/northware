import { auth, signOut } from "@northware/auth/auth";
import { DarkModeToggle, Headline } from "@northware/ui/components";
export default async function DashboardPage() {
  let session = await auth();
  return (
    <>
      <DarkModeToggle />
      <Headline
        level="h1"
        className="color-primary-foreground bg-primary text-3xl font-semibold"
      >
        Northware
      </Headline>
      You are logged in as {session?.user?.email}
      <SignOut />
    </>
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
