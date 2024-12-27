import {
  LoginForm,
  LoginWrapper,
  MessageLoggedIn,
} from "@northware/ui/components";

import { auth, signIn } from "@northware/auth/auth";

export default async function LoginPage() {
  async function handleSubmit(values: any) {
    "use server";
    await signIn("credentials", {
      redirectTo: "/",
      email: values.email,
      password: values.password,
    });
  }

  let session = await auth();
  return (
    <LoginWrapper>
      {!session?.user ? (
        <LoginForm onSubmit={handleSubmit} />
      ) : (
        <MessageLoggedIn user={session?.user} />
      )}
    </LoginWrapper>
  );
}
