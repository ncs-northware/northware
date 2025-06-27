import { getRoleList } from "@/lib/role-actions";
import { Button } from "@northware/ui/components/button";
import { DataTable } from "@northware/ui/components/data-table";
import { Headline } from "@northware/ui/components/headline";
import { SidebarLayout } from "@northware/ui/components/sidebar-layout";
import Link from "next/link";
import { columns } from "./columns";

export const metadata = { title: "Rollenverwaltung" };

export default async function Page() {
  const roleList = (await getRoleList()) || [];
  if (!roleList.success) {
    // TODO: globalError
    return <div>Fehler: {roleList.error.message}</div>;
  }
  return (
    <SidebarLayout
      service="cockpit"
      defaultOpen={false}
      breadcrumbs={[
        { label: "Admin Panel", href: "/admin" },
        { label: "Rollenverwaltung", href: "/admin/roles", active: true },
      ]}
    >
      <div className="flex justify-between gap-4">
        <div>
          <Headline level="h1">Rollenverwaltung</Headline>
          <p className="mb-4 text-justify font-medium text-muted-foreground">
            Rollen sind Sammlungen von Rechten. Vergebe Rollen an einen
            Benutzer, um ihm diese Sammlung an Rechten zuzuweisen. Benutzer
            einer bestimmten Rolle erhalten alle enthaltenen Rechte. Es ist
            nicht möglich dem Benutzer ein Rollen-Recht zu entziehen.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/role/create">Rolle erstellen</Link>
        </Button>
      </div>
      <DataTable
        columns={columns}
        data={roleList.roleList}
        withRowSelect={false}
        initialSorting="roleKey"
      />
    </SidebarLayout>
  );
}
