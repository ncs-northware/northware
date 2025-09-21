"use client";

import { SignOutButton, useAuth, useSession } from "@clerk/nextjs";
import { Fragment, type ReactNode } from "react";

export function MultisessionAppSupport({ children }: { children: ReactNode }) {
  const { session } = useSession();
  return (
    <Fragment key={session ? session.id : "no-users"}>{children}</Fragment>
  );
}

export function MultisessionSignOutButton({ ...props }) {
  const { sessionId } = useAuth();
  if (!sessionId) {
    return <SignOutButton />;
  }
  return <SignOutButton signOutOptions={{ sessionId }} {...props} />;
}
