"use client";

import { deDE } from "@clerk/localizations";
import { ClerkProvider, useSession } from "@clerk/nextjs";
import { shadcn } from "@clerk/themes";
import { Fragment, type ReactNode } from "react";

export * from "@clerk/nextjs";

function MultisessionProvider({ children }: { children: ReactNode }) {
  const { session } = useSession();
  return (
    <Fragment key={session ? session.id : "no-users"}>{children}</Fragment>
  );
}

export function AuthProvider({ ...props }) {
  return (
    // FIXME: Signin URL als Env-Variable
    <ClerkProvider
      appearance={{ theme: shadcn }}
      signInUrl="/login"
      {...props}
      localization={deDE}
    >
      <MultisessionProvider>{props.children}</MultisessionProvider>
    </ClerkProvider>
  );
}
