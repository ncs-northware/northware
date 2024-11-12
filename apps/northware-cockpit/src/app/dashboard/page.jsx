import { auth, signOut } from "@northware/auth/auth";
import { HelloWorld } from "@northware/ui";

export default async function DashboardPage() {
  let session = await auth();
  console.log(session);
  return (
    <div className="">
      <div className="">
        You are logged in as {session?.user?.email}
        <SignOut />
      </div>
      <HelloWorld />
    </div>
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
