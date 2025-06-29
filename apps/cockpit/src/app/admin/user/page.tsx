import { getUserList } from "@/lib/user-actions";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@northware/ui/components/alert";
import { Button } from "@northware/ui/components/button";
import { DataTable } from "@northware/ui/components/data-table";
import { Headline } from "@northware/ui/components/headline";
import { PermissionProvider } from "@northware/ui/components/permission-provider";
import { SidebarLayout } from "@northware/ui/components/sidebar-layout";
import { LightbulbIcon } from "@northware/ui/icons/lucide";
import Link from "next/link";
import { columns } from "./columns";

export const metadata = { title: "Benutzerverwaltung" };

export default async function Page() {
  const userArray = (await getUserList()) || [];
  return (
    <SidebarLayout
      service="cockpit"
      defaultOpen={false}
      breadcrumbs={[
        { label: "Admin Panel", href: "/admin" },
        { label: "Benutzerverwaltung", href: "/admin/user", active: true },
      ]}
    >
      <PermissionProvider permissionKey="cockpit::user.read">
        <div className="flex justify-between gap-4">
          <div>
            <Headline level="h1">Benutzerverwaltung</Headline>
            <p className="mb-4 text-justify font-medium text-muted-foreground">
              Ein Benutzerkonto ist eine digitale Identität, mit der sich eine
              Person in den Northware Apps authentifizieren kann.
            </p>
          </div>

          {/* TODO Nur mit Berechtigung create User */}
          <Button variant="default">
            <Link href="user/create">Benutzer hinzufügen</Link>
          </Button>
        </div>
        <DataTable
          columns={columns}
          data={userArray}
          withRowSelect={false}
          initialSorting="fullName"
        />
        <Alert>
          <LightbulbIcon className="size-4" />
          <AlertTitle>Tipp</AlertTitle>
          <AlertDescription>
            Die eigenen Benutzerdaten können über das Benutzerprofil geändert
            werden.
          </AlertDescription>
        </Alert>
      </PermissionProvider>
    </SidebarLayout>
  );
}
