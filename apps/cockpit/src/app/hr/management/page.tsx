import { db } from "@northware/database/connection";
import {
  employeesPersonalTable,
  employeesWorkerTable,
} from "@northware/database/schema/hr-employees";
import { Headline } from "@northware/ui/components/headline";
import { DataFetchError } from "@northware/ui/components/no-data-template";
import { PermissionProvider } from "@northware/ui/components/permission-provider";
import { SidebarLayout } from "@northware/ui/components/sidebar-layout";
import type { ColumnDef } from "@tanstack/react-table";
import { and, eq, gte, isNull, lte, or } from "drizzle-orm";
import EmployeeList from "./employee-list";

export const metadata = {
  title: "HR Management",
};

type EmployeeItem = {
  employeeId: number | null;
  firstName: string | null;
  sirName: string | null;
  activeContracts: number;
  terminatedContracts: number;
};

async function getEmployeeList(): Promise<
  | { success: true; employees: EmployeeItem[] }
  | { success: false; error: Error }
> {
  try {
    const result = await db
      .select({
        employeeId: employeesPersonalTable.employeeId,
        firstName: employeesPersonalTable.firstName,
        sirName: employeesPersonalTable.sirName,
        activeContracts: db.$count(
          employeesWorkerTable,
          and(
            eq(
              employeesWorkerTable.employeeId,
              employeesPersonalTable.employeeId
            ),
            or(
              gte(
                employeesWorkerTable.contractEnd,
                new Date().toISOString().split("T")[0]
              ),
              isNull(employeesWorkerTable.contractEnd)
            )
          )
        ),
        terminatedContracts: db.$count(
          employeesWorkerTable,
          and(
            eq(
              employeesWorkerTable.employeeId,
              employeesPersonalTable.employeeId
            ),
            lte(
              employeesWorkerTable.contractEnd,
              new Date().toISOString().split("T")[0]
            )
          )
        ),
      })
      .from(employeesPersonalTable)
      .orderBy(
        employeesPersonalTable.sirName,
        employeesPersonalTable.firstName
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
