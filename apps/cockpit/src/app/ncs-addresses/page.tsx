import { db } from "@northware/database/connection";
import {
  employeesPersonalTable,
  employeesWorkerTable,
} from "@northware/database/schema";
import { Headline } from "@northware/ui/components/headline";
import { DataFetchError } from "@northware/ui/components/no-data-template";
import { SidebarLayout } from "@northware/ui/components/sidebar-layout";
import { eq } from "drizzle-orm";
import { departmentsTable } from "node_modules/@northware/database/schema/departments";
import { employeeColumns } from "./columns";
import { EmployeeDataTable } from "./data-table";

export const metadata = {
  title: "Adressbuch",
};

async function getEmployeeAddresses() {
  try {
    const result = await db
      .select({
        sirName: employeesPersonalTable.sirName,
        firstName: employeesPersonalTable.firstName,
        phoneWork: employeesWorkerTable.phoneWork,
        mailWork: employeesWorkerTable.mailWork,
        department: departmentsTable.departmentName,
        position: employeesWorkerTable.position,
      })
      .from(employeesPersonalTable)
      .leftJoin(
        employeesWorkerTable,
        eq(employeesPersonalTable.employeeId, employeesWorkerTable.employeeId)
      )
      .leftJoin(
        departmentsTable,
        eq(employeesWorkerTable.department, departmentsTable.recordId)
      )
      .orderBy(employeesPersonalTable.sirName);
    return { success: true, addresses: result };
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
  const data = await getEmployeeAddresses();

  if (!data.success) {
    return <DataFetchError message={data.error?.message} service="cockpit" />;
  }
  return (
    <SidebarLayout
      breadcrumbs={[
        { label: "Adressbuch", href: "/ncs-addresses", active: true },
      ]}
      defaultOpen={false}
      service="cockpit"
    >
      <Headline level="h1">Adressbuch</Headline>
      <EmployeeDataTable
        columns={employeeColumns}
        data={data.addresses || []}
      />
    </SidebarLayout>
  );
}
