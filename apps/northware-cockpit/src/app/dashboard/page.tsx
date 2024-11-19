import { auth, signOut } from "@northware/auth/auth";
import { StyleBook } from "@northware/ui/components";
import { DarkModeToggle } from "@northware/ui/components";
export default async function DashboardPage() {
  let session = await auth();
  return (
    <>
      <DarkModeToggle />
      <StyleBook />
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
