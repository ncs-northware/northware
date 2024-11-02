import { LoginForm } from "@northware/auth/components";
import { signIn } from "@northware/auth/auth";

export default function Login() {
  return (
    <main className={"${layout.login} ${layout.cockpit}"}>
      <section className={"layout.loginBox"}>
        <div id="loginForm">
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
