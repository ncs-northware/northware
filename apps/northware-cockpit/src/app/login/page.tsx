import { LoginForm } from "@northware/ui/components";
import { signIn } from "@northware/auth/auth";
import Image from "next/image";

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
    <main className={`${""} ${""}`}>
      <section className={""}>
        <div id="loginForm">
          <Image
            src="/img/logo.svg"
            height={150}
            width={450}
            className="mx-auto mb-6"
            alt="Northware Cockpit Logo"
          />
          <h1 className="mb-4 text-center">Login</h1>
          <LoginForm onSubmit={handleSubmit} />
        </div>
      </section>
    </main>
  );
}
