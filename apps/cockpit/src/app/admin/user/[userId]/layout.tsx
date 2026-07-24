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
    return { title: "Benutzerprofil" };
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
        { href: "/admin", label: "Admin Panel" },
        { href: "/admin/user", label: "Benutzerverwaltung" },
        {
          active: true,
          href: `/admin/user/${userId}`,
          label:
            user?.response.fullName ||
            user?.response.emailAddresses[0].emailAddress ||
            "Benutzer",
        },
      ]}
      mainLabel="Hauptnavigation"
      service="cockpit"
      subLabel={user?.response.fullName || "Benutzer"}
      subMenu={[
        {
          exactMatch: true,
          href: `/admin/user/${userId}`,
          title: "Persönliche Daten",
        },
        {
          href: `/admin/user/${userId}/roles`,
          title: "Rollen",
        },
        {
          href: `/admin/user/${userId}/permissions`,
          title: "Zusätzliche Berechtigungen",
        },
      ]}
    >
      {children}
    </SidebarLayout>
  );
}
