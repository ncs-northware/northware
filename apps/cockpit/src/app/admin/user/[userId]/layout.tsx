import { SidebarLayout } from "@northware/ui/components/sidebar-layout";
import { getSingleUser } from "@/lib/user-actions";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;
  const user = await getSingleUser(userId);

  if (user instanceof Error) {
    // Hier kannst du entscheiden, wie du mit dem Fehler umgehen möchtest.
    // Für Metadaten könntest du einen Standardtitel oder einen Fehlerindikator verwenden.
    // Zum Beispiel:
    return "Benutzerprofil";
  }

  return { title: user?.fullName };
}

export default async function EditUserLayout({
  params,
  children,
}: {
  params: Promise<{ userId: string }>;
  children: React.ReactNode;
}) {
  const { userId } = await params;
  const user = await getSingleUser(userId);

  if (user instanceof Error) {
    // FIXME: globalError
    return "Es wurde kein Nutzer gefunden";
  }

  return (
    <SidebarLayout
      breadcrumbs={[
        { label: "Admin Panel", href: "/admin" },
        { label: "Benutzerverwaltung", href: "/admin/user" },
        {
          label:
            user?.fullName ||
            user?.emailAddresses[0].emailAddress ||
            "Benutzer",
          href: `/admin/user/${userId}`,
          active: true,
        },
      ]}
      mainLabel="Hauptnavigation"
      service="cockpit"
      subLabel={user?.fullName || "Benutzer"}
      subMenu={[
        {
          title: "Persönliche Daten",
          href: `/admin/user/${userId}`,
          exactMatch: true,
        },
        {
          title: "Rollen",
          href: `/admin/user/${userId}/roles`,
        },
        {
          title: "Zusätzliche Berechtigungen",
          href: `/admin/user/${userId}/permissions`,
        },
      ]}
    >
      {children}
    </SidebarLayout>
  );
}
