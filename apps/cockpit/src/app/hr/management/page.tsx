import { Headline } from "@northware/ui/components/headline";
import { DataFetchError } from "@northware/ui/components/no-data-template";
import { PermissionProvider } from "@northware/ui/components/permission-provider";
import { SidebarLayout } from "@northware/ui/components/sidebar-layout";
import type { ColumnDef } from "@tanstack/react-table";
import { EmployeeList } from "@/components/hr-lists";
import { type EmployeeItem, getEmployeeList } from "@/lib/hr-actions";

export const metadata = {
  title: "HR Management",
};

export default async function Page() {
  const data = await getEmployeeList();

  const columns: ColumnDef<EmployeeItem>[] = [
    { accessorKey: "employeeId" },
    { accessorKey: "firstName" },
    { accessorKey: "sirName" },
    { accessorKey: "activeContracts" },
    { accessorKey: "terminatedContracts" },
  ];

  if (!data.success) {
    return <DataFetchError message={data.error?.message} service="cockpit" />;
  }

  return (
    <SidebarLayout
      breadcrumbs={[
        { label: "HR", href: "/hr" },
        { label: "HR Management", href: "hr/management", active: true },
      ]}
      service="cockpit"
    >
      <PermissionProvider permissionKeys={["cockpit::hr-management.read"]}>
        <Headline level="h1">Mitarbeiter wählen</Headline>
        <EmployeeList columns={columns} data={data.employees || []} />
      </PermissionProvider>
    </SidebarLayout>
  );
}
