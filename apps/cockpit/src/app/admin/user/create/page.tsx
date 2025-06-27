import CreateUserForm from "@/components/create-user-form";
import { createUser } from "@/lib/user-actions";
import { Headline } from "@northware/ui/components/headline";
import { SidebarLayout } from "@northware/ui/components/sidebar-layout";

export default function Page() {
  return (
    <SidebarLayout
      service="cockpit"
      breadcrumbs={[
        { label: "Admin Panel", href: "/admin" },
        { label: "Benutzerverwaltung", href: "/admin/user" },
        { label: "Benutzer erstellen", href: "create", active: true },
      ]}
    >
      <Headline level="h1">Benutzer erstellen</Headline>
      <CreateUserForm createUser={createUser} />
    </SidebarLayout>
  );
}
