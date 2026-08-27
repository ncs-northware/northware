import { auth } from "@northware/auth/server";
import type { DataTableFeatures } from "@northware/ui/components/data-table";
import { Headline } from "@northware/ui/components/headline";
import { DataFetchError } from "@northware/ui/components/no-data-template";
import { PermissionProvider } from "@northware/ui/components/permission-provider";
import { SidebarLayout } from "@northware/ui/components/sidebar-layout";
import { createColumnHelper } from "@tanstack/react-table";
import { EmployeeList } from "@/components/hr-lists";
import { type EmployeeItem, getEmployeeList } from "@/lib/hr-actions";

export const metadata = {
  title: "HR Management",
};

export default async function Page() {
  await auth.protect();
  const data = await getEmployeeList();

  const columnHelper = createColumnHelper<DataTableFeatures, EmployeeItem>();

  const columns = columnHelper.columns([
    columnHelper.accessor("employeeId", {}),
    columnHelper.accessor("firstName", {}),
    columnHelper.accessor("sirName", {}),
    columnHelper.accessor("activeContracts", {}),
    columnHelper.accessor("terminatedContracts", {}),
  ]);

  if (!data.success) {
    return <DataFetchError message={data.error.message} service="cockpit" />;
  }

  return (
    <SidebarLayout
      breadcrumbs={[
        { href: "/hr", label: "HR" },
        { active: true, href: "hr/management", label: "HR Management" },
      ]}
      service="cockpit"
    >
      <PermissionProvider permissionKeys={["cockpit::hr-management.read"]}>
        <Headline level="h1">Mitarbeiter wählen</Headline>
        <EmployeeList columns={columns} data={data.employees} />
      </PermissionProvider>
    </SidebarLayout>
  );
}
