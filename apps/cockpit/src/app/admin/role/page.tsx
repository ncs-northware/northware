import { getRoleList } from "@/lib/role-actions";
import { Button } from "@northware/ui/components/button";
import { DataTable } from "@northware/ui/components/data-table";
import { Headline } from "@northware/ui/components/headline";
import { SidebarLayout } from "@northware/ui/components/sidebar-layout";
import Link from "next/link";
import { columns } from "./columns";

export const metadata = { title: "Rollenverwaltung" };

export default async function RoleDashboard() {
  const roleList = (await getRoleList()) || [];
  if (!roleList.success) {
    // globalError
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
      <div className="flex flex-row justify-between">
        <Headline level="h1">Rollenverwaltung</Headline>
        <Button asChild>
          <Link href="/admin/role/create">Rolle erstellen</Link>
        </Button>
      </div>
      <DataTable
        columns={columns}
        data={roleList.roleList}
        withRowSelect={false}
      />
    </SidebarLayout>
  );
}
