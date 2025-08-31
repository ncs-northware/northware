import { getExtraPermissions } from "@northware/auth/account";
import { Headline } from "@northware/ui/components/headline";
import { PermissionProvider } from "@northware/ui/components/permission-provider";
import { SidebarLayout } from "@northware/ui/components/sidebar-layout";
import { notFound } from "next/navigation";
import { CreateUserPermissionsForm } from "@/components/user-forms";
import { getPermissionList } from "@/lib/role-actions";
import { getSingleUser } from "@/lib/user-actions";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;
  const user = await getSingleUser(userId);
  if (!user.success) {
    return { title: "Berechtiungen des Benutzers" };
  }
  return { title: `Berechtigungen von ${user.response.fullName}` };
}

export default async function Page({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;
  const user = await getSingleUser(userId);
  const permissionsResponse = await getPermissionList();
  const extraPermissionsResponse = await getExtraPermissions(userId);
  if (!user.success) {
    notFound();
  }
  return (
    <SidebarLayout
      breadcrumbs={[
        { label: "Admin Panel", href: "/admin" },
        { label: "Benutzerverwaltung", href: "/admin/user" },
        { label: "Benutzer erstellen", href: "admin/user/create" },
        {
          label: `Zusätzliche Berechtigungen von ${user.response.fullName || user.response.emailAddresses[0].emailAddress}`,
          href: `admin/user/${user.response.id}/permissions`,
          active: true,
        },
      ]}
      service="cockpit"
    >
      <PermissionProvider permissionKeys={["cockpit::user.create"]}>
        <Headline level="h1">
          Zusätzliche Berechtigungen von{" "}
          {user.response.fullName ||
            user.response.emailAddresses[0].emailAddress}
        </Headline>
        <p className="text-justify font-medium text-muted-foreground">
          Damit neue Benutzer die Northware Apps nutzen können, benötigen sie
          die Berechtigungen, verschiedene Inhalte zu sehen und zu bearbeiten.
          Besitzt ein Nutzer eine Berechtigung, kann er einzelne Aktionen
          ausführen. Möglicherweise werden Rollenberechtigungen des Benutzers
          durch einzelne Berechtigungen erweitert.
        </p>
        <CreateUserPermissionsForm
          extraPermissionsResponse={extraPermissionsResponse}
          permissionsResponse={permissionsResponse}
          userId={userId}
        />
      </PermissionProvider>
    </SidebarLayout>
  );
}
