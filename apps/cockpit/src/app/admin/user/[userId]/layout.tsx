import { SidebarLayout } from "@northware/ui/components/sidebar-layout";
import { notFound } from "next/navigation";
import { getSingleUser } from "@/lib/user-actions";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;
  const user = await getSingleUser(userId);

  if (!user.success) {
    // Standard-Titel für Metadaten, falls die Benutzerdaten nicht ermittelt werden können.
    return "Benutzerprofil";
  }

  return { title: user?.response.fullName };
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

  if (!user.success) {
    notFound();
  }

  return (
    <SidebarLayout
      breadcrumbs={[
        { label: "Admin Panel", href: "/admin" },
        { label: "Benutzerverwaltung", href: "/admin/user" },
        {
          label:
            user?.response.fullName ||
            user?.response.emailAddresses[0].emailAddress ||
            "Benutzer",
          href: `/admin/user/${userId}`,
          active: true,
        },
      ]}
      mainLabel="Hauptnavigation"
      service="cockpit"
      subLabel={user?.response.fullName || "Benutzer"}
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
