import { auth, signOut } from "@northware/auth/auth";
import { HelloWorld } from "@northware/ui";

export default async function DashboardPage() {
  let session = await auth();
  console.log(session);
  return (
    <div className="">
      <div className="bg-slate-300 text-primary-200">
        You are logged in as {session?.user?.email}
        <SignOut />
      </div>
      <HelloWorld className="bg-green-400 text-trader-400" />
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
