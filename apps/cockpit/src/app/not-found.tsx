import { Headline } from "@northware/ui/components/headline";
import { SidebarLayout } from "@northware/ui/components/sidebar-layout";
import { Button } from "@northware/ui/components/ui-registry/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <SidebarLayout service="cockpit">
      <div className="flex h-full flex-col items-center justify-center gap-4">
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
    </SidebarLayout>
  );
}
