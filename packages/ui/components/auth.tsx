"use client";

import { SignIn, UserButton } from "@northware/auth/client";
import type { ServiceType } from "@northware/service-config";
import { Brand } from "@northware/ui/components/brand";
import { LoaderCircleIcon } from "@northware/ui/icons/lucide";

export function SignInForm({ service }: { service: ServiceType }) {
  return (
    <main className="flex h-screen w-full flex-col items-center justify-center px-4">
      <Brand className="mb-6 text-2xl" iconWidth="w-14" service={service} />
      <SignIn
        appearance={{
          elements: {
            card: "bg-background text-card-foreground rounded-xl border shadow-sm",
            formFieldAction__password: "hidden",
            footerAction__havingTrouble: "hidden",
            // The Clerk Branding and Development Banner of the SignIn Component are hidden through the globals.css
          },
        }}
        fallback={<LoaderCircleIcon className="size-12 animate-spin" />}
      />
    </main>
  );
}

export function UserMenu() {
  return (
    <UserButton
      appearance={{
        elements: {
          rootBox: "w-full",
          userButtonBox: "justify-between w-full",
          userButtonTrigger: "w-full shadow-none",
          userButtonOuterIdentifier: "text-sm font-medium",
          userButtonPopoverFooter: "hidden",
        },
        layout: { shimmer: false },
      }}
      showName
    />
  );
}
