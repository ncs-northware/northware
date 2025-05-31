import { getSingleUser } from "@/lib/user-actions";
import { SidebarLayout } from "@northware/ui/components/sidebar-layout";

export default async function EditUserLayout({
  params,
  children,
}: { params: Promise<{ userId: string }>; children: React.ReactNode }) {
  const { userId } = await params;
  const user = await getSingleUser(userId);
  return (
    <SidebarLayout
      service="cockpit"
      breadcrumbs={[
        { label: "Admin Panel", href: "/admin" },
        { label: "Benutzerverwaltung", href: "/admin/user" },
        {
          label: user?.fullName || "Benutzer",
          href: `/admin/user/${userId}`,
          active: true,
        },
      ]}
      mainLabel="Hauptnavigation"
      subLabel={user?.fullName || "Benutzer"}
      subMenu={[
        { title: "Persönliche Daten", href: `/admin/user/${userId}/#` },
        {
          title: "Rollen und Berechtigungen",
          href: `/admin/user/${userId}/roles`,
        },
      ]}
    >
      {children}
    </SidebarLayout>
  );
}
