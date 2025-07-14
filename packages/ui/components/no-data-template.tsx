import type { ServiceType } from "@northware/service-config";
import { Headline } from "@northware/ui/components/headline";
import { SidebarLayout } from "@northware/ui/components/sidebar-layout";

export function DataFetchError({
  service,
  message,
}: {
  service: ServiceType;
  message?: string;
}) {
  return (
    /* Diese Komponente kann als Error-Page für Datenbank-Fehler auf List-Pages verwendet werden. Für Einzelseiten sollte notFound() aufgerufen werden.*/
    <SidebarLayout defaultOpen={true} service={service}>
      <div className="flex h-full flex-col items-center justify-center gap-4">
        <div className="flex flex-col items-center gap-2">
          <Headline className="m-0" level="h1">
            Es gab einen Datenbank-Fehler
          </Headline>
          <p className="text-center text-muted-foreground">
            Es gab einen Fehler bei dem Versuch eine Verbindung zu unserer
            Datenbank aufzubauen. <br />
            Leider können wir daher keine Daten anzeigen. Sollte das weiterhin
            passieren, kontaktieren Sie bitte den Support.
          </p>
        </div>
        <p className="text-muted-foreground text-sm">{message}</p>
      </div>
    </SidebarLayout>
  );
}
