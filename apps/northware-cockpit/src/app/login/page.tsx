import { LoginForm, LoginWrapper } from "@northware/ui/components";
import { signIn } from "@northware/auth/auth";

export default function LoginPage() {
  async function handleSubmit(values: any) {
    "use server";
    await signIn("credentials", {
      redirectTo: "/dashboard",
      email: values.email,
      password: values.password,
    });
  }

  return (
    <LoginWrapper>
      <LoginForm onSubmit={handleSubmit} />
    </LoginWrapper>
  );
}
