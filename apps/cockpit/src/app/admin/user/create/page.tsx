import { Headline } from "@northware/ui/components/headline";
import { PermissionProvider } from "@northware/ui/components/permission-provider";
import { SidebarLayout } from "@northware/ui/components/sidebar-layout";
import CreateUserForm from "@/components/user-forms";

export const metadata = { title: "Benutzer hinzufügen" };

export default function Page() {
  return (
    <SidebarLayout
      breadcrumbs={[
        { label: "Admin Panel", href: "/admin" },
        { label: "Benutzerverwaltung", href: "/admin/user" },
        { label: "Benutzer hinzufügen", href: "create", active: true },
      ]}
      service="cockpit"
    >
      <PermissionProvider permissionKeys={["cockpit::user.create"]}>
        <Headline level="h1">Einen neuen Benutzer erstellen</Headline>
        <p className="text-justify font-medium text-muted-foreground">
          Ein Benutzerkonto ist eine digitale Identität, mit der sich eine
          Person in den Northware Apps authentifizieren können. Jedes
          Benutzerkonto besteht aus einem Butzernamen und einem Passwort. Die
          Benutzer sind mit einer E-Mail Adresse registriert und es sind
          ebenfalls Vor- und Nachname bzw. öffentliche Bezeichnungen der
          Benutzer gespeichert.
        </p>
        <CreateUserForm />
      </PermissionProvider>
    </SidebarLayout>
  );
}
