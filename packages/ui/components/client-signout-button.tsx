// FIXME: Please evaluate the need of this file after updates

"use client";

import { SignOutButton } from "@northware/auth/client";
import { Button } from "./shadcn/button";

export function ClientSignOutButton() {
  return (
    <SignOutButton>
      <Button variant="outline">Abmelden</Button>
    </SignOutButton>
  );
}
