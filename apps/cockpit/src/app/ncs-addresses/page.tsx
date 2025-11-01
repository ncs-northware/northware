import { db } from "@northware/database/connection";
import { companiesTable } from "@northware/database/schema/companies";
import { departmentsTable } from "@northware/database/schema/departments";
import {
  employeesPersonalTable,
  employeesWorkerTable,
} from "@northware/database/schema/hr-employees";
import { Headline } from "@northware/ui/components/headline";
import { DataFetchError } from "@northware/ui/components/no-data-template";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@northware/ui/components/shadcn/tabs";
import { SidebarLayout } from "@northware/ui/components/sidebar-layout";
import { and, eq, gte, isNull, or } from "drizzle-orm";
import { departmentColumns, employeeColumns } from "./columns";
import { DataTable } from "./data-table";

export const metadata = {
  title: "Adressbuch",
};

async function getAddresses() {
  try {
    const employeeResult = await db
      .select({
        sirName: employeesPersonalTable.sirName,
        firstName: employeesPersonalTable.firstName,
        phoneWork: employeesPersonalTable.phoneWork,
        mailWork: employeesPersonalTable.mailWork,
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
      .where(
        and(
          or(
            gte(
              employeesWorkerTable.contractEnd,
              new Date().toISOString().split("T")[0]
            ),
            isNull(employeesWorkerTable.contractEnd)
          )
        )
      )
      .orderBy(employeesPersonalTable.sirName);

    const departmentResult = await db
      .select({
        departmentName: departmentsTable.departmentName,
        company: companiesTable.companyName,
        phone: departmentsTable.phone,
        mail: departmentsTable.mail,
      })
      .from(departmentsTable)
      .leftJoin(
        companiesTable,
        eq(departmentsTable.companyId, companiesTable.companyId)
      )
      .orderBy(departmentsTable.recordId);

    return {
      success: true,
      employees: employeeResult,
      departments: departmentResult,
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
  const data = await getAddresses();

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
      <Tabs defaultValue="employees">
        <TabsList>
          <TabsTrigger value="employees">Mitarbeiter</TabsTrigger>
          <TabsTrigger value="departments">Abteilungen</TabsTrigger>
        </TabsList>
        <TabsContent value="employees">
          <DataTable columns={employeeColumns} data={data.employees || []} />
        </TabsContent>
        <TabsContent value="departments">
          <DataTable
            columns={departmentColumns}
            data={data.departments || []}
            paginationPageSize={data.departments?.length}
          />
        </TabsContent>
      </Tabs>
    </SidebarLayout>
  );
}
