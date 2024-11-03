import { LoginForm } from "@northware/auth/components";
import { signIn } from "@northware/auth/auth";
import template from "@northware/ui/templates/login";
import Image from "next/image";
export default function LoginPage() {
  return (
    <main className={`${template.login} ${template.cockpit}`}>
      <section className={template.loginBox}>
        <div id="loginForm">
          <Image
            src="/img/logo.svg"
            height={150}
            width={450}
            className="mx-auto mb-6"
            alt="Northware Cockpit Logo"
          />
          <h1 className="mb-4 text-center">Login</h1>
          <LoginForm
            action={async (formData) => {
              "use server";
              await signIn("credentials", {
                redirectTo: "/dashboard",
                email: formData.get("email"),
                password: formData.get("password"),
              });
            }}
          />
        </div>
      </section>
    </main>
  );
}
