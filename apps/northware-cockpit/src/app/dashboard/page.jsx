import { auth, signOut } from "@northware/auth/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@northware/ui/components";

export default async function DashboardPage() {
  let session = await auth();
  console.log(session);
  return (
    <>
      You are logged in as {session?.user?.email}
      <SignOut />
      <Card className="bg-green-300">
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
      <div className="size-24 rounded-md bg-cockpit-400">Test</div>
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
