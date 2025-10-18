import { db } from "@northware/database/connection";
import { companiesTable } from "@northware/database/schema/companies";
import {
  employeesPersonalTable,
  employeesWorkerTable,
} from "@northware/database/schema/hr-employees";
import { Headline } from "@northware/ui/components/headline";
import { DataFetchError } from "@northware/ui/components/no-data-template";
import { PermissionProvider } from "@northware/ui/components/permission-provider";
import { SidebarLayout } from "@northware/ui/components/sidebar-layout";
import type { ColumnDef } from "@tanstack/react-table";
import { eq } from "drizzle-orm";
import EmployeeList from "./employee-list";

export const metadata = {
  title: "HR Management",
};

async function getEmployeeList() {
  try {
    const result = await db
      .select({
        recordId: employeesWorkerTable.recordId,
        employeeId: employeesPersonalTable.employeeId,
        firstName: employeesPersonalTable.firstName,
        sirName: employeesPersonalTable.sirName,
        contractSince: employeesWorkerTable.contractSince,
        employerId: companiesTable.companyId,
        employer: companiesTable.companyName,
      })
      .from(employeesWorkerTable)
      .leftJoin(
        employeesPersonalTable,
        eq(employeesWorkerTable.employeeId, employeesPersonalTable.employeeId)
      )
      .leftJoin(
        companiesTable,
        eq(employeesWorkerTable.employer, companiesTable.companyId)
      );
    return {
      success: true,
      employees: result,
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error
          : new Error("Es ist ein unerwarteter Fehler aufgetreten."),
    };
  }
}

export default async function Page() {
  const data = await getEmployeeList();
  type Employee = {
    recordId: number;
    employeeId: number | null;
    firstName: string | null;
    sirName: string | null;
    contractSince: string;
    employerId: number | null;
    employer: string | null;
  };

  const columns: ColumnDef<Employee>[] = [
    { accessorKey: "recordId" },
    { accessorKey: "employeeId" },
    { accessorKey: "firstName" },
    { accessorKey: "sirName" },
    { accessorKey: "contractSince" },
    { accessorKey: "employerId" },
    { accessorKey: "employer" },
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
      <PermissionProvider permissionKeys={["cockpit::hr-management:read"]}>
        <Headline level="h1">HR Management</Headline>
        <EmployeeList columns={columns} data={data.employees || []} />
      </PermissionProvider>
    </SidebarLayout>
  );
}
