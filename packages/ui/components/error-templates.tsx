import { SignOutButton } from "@northware/auth/client";
import { Headline } from "@northware/ui/components/headline";
import { Button } from "@northware/ui/components/ui-registry/button";
import { LoaderCircleIcon } from "lucide-react";
import Link from "next/link";

export function NotFoundTemplate() {
  return (
    <div className="flex h-svh flex-col items-center justify-center gap-4">
      <div className="flex flex-col items-center gap-2">
        <p className="font-medium text-lg text-primary">
          404 - Diese Seite wurde nicht gefunden
        </p>
        <Headline className="m-0" level="h1">
          Etwas ist schiefgelaufen.
        </Headline>
        <p className="text-muted-foreground">
          Die Seite, nach der Sie suchen existiert nicht.
        </p>
      </div>
      <Button size="lg">
        <Link href="/">Zurück zur Homepage</Link>
      </Button>
    </div>
  );
}

export function ErrorPageTemplate() {
  return (
    <div className="flex h-svh flex-col items-center justify-center gap-4">
      <div className="flex flex-col items-center gap-2">
        <Headline className="m-0" level="h1">
          Es ist ein Fehler aufgetreten.
        </Headline>
        <p className="text-muted-foreground">
          Es ist ein unerwarteter Fehler aufgetreten. Sollte das weiterhin
          passieren, kontaktiere den Support.
        </p>
      </div>
      <Button size="lg">
        <Link href="/">Zurück zur Startseite</Link>
      </Button>
      <SignOutButton>
        <Button variant="outline">Abmelden</Button>
      </SignOutButton>
    </div>
  );
}

export function LoadingPageTemplate() {
  return (
    <div className="flex h-svh flex-col items-center justify-center gap-4">
      <LoaderCircleIcon className="size-12 animate-spin" />
      <p className="text-muted-foreground text-xl">Die Seite wird geladen...</p>
      <SignOutButton>
        <Button variant="outline">Abmelden</Button>
      </SignOutButton>
    </div>
    
  );
}
