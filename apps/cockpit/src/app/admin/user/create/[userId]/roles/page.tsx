import { getUserRoles } from "@northware/auth/account";
import { Headline } from "@northware/ui/components/headline";
import { PermissionProvider } from "@northware/ui/components/permission-provider";
import { SidebarLayout } from "@northware/ui/components/sidebar-layout";
import { notFound } from "next/navigation";
import { CreateUserRolesForm } from "@/components/user-forms";
import { getRoleList } from "@/lib/role-actions";
import { getSingleUser } from "@/lib/user-actions";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;
  const user = await getSingleUser(userId);
  if (!user.success) {
    return { title: "Rollen des Benutzers" };
  }
  return { title: `Rollen von ${user.response.fullName}` };
}

export default async function Page({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;
  const user = await getSingleUser(userId);
  const rolesResponse = await getRoleList();
  const userRolesResponse = await getUserRoles(userId);
  if (!user.success) {
    notFound();
  }
  if (!rolesResponse.success) {
    notFound();
  }
  return (
    <SidebarLayout
      breadcrumbs={[
        { label: "Admin Panel", href: "/admin" },
        { label: "Benutzerverwaltung", href: "/admin/user" },
        { label: "Benutzer erstellen", href: "admin/user/create" },
        {
          label: `Rollen von ${user.response.fullName || user.response.emailAddresses[0].emailAddress}`,
          href: `admin/user/${user.response.id}/roles`,
          active: true,
        },
      ]}
      service="cockpit"
    >
      <PermissionProvider permissionKeys={["cockpit::user.create"]}>
        <Headline level="h1">
          Rollen von{" "}
          {user.response.fullName ||
            user.response.emailAddresses[0].emailAddress}
        </Headline>
        <p className="text-justify font-medium text-muted-foreground">
          Damit neue Benutzer die Northware Apps nutzen können, benötigen sie
          die Berechtigungen, verschiedene Inhalte zu sehen und zu bearbeiten.
          Rollen sind Sammlungen von Rechten. Wenn einem Nutzer eine Rolle
          zugewiesen wurde, erhält der alle Rechte, die in der Rolle inbegriffen
          sind.
        </p>
        <CreateUserRolesForm
          rolesResponse={rolesResponse}
          userId={userId}
          userRolesResponse={userRolesResponse}
        />
      </PermissionProvider>
    </SidebarLayout>
  );
}
