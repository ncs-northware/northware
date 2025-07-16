import { Headline } from "@northware/ui/components/headline";
import { SidebarLayout } from "@northware/ui/components/sidebar-layout";
import CreateUserForm from "@/components/create-user-form";
import { createUser } from "@/lib/user-actions";

export default function Page() {
  return (
    // TODO: #515 User Onboarding Flow erstellen
    <SidebarLayout
      breadcrumbs={[
        { label: "Admin Panel", href: "/admin" },
        { label: "Benutzerverwaltung", href: "/admin/user" },
        { label: "Benutzer erstellen", href: "create", active: true },
      ]}
      service="cockpit"
    >
      <Headline level="h1">Benutzer erstellen</Headline>
      <CreateUserForm createUser={createUser} />
    </SidebarLayout>
  );
}
