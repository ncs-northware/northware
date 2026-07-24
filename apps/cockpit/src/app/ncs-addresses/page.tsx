import { db } from "@northware/database/connection";
import { companiesTable } from "@northware/database/schema/companies";
import { departmentsTable } from "@northware/database/schema/departments";
import {
  employeesTable,
  employmentsTable,
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
        department: departmentsTable.departmentName,
        firstName: employeesTable.firstName,
        mailWork: employeesTable.mailWork,
        phoneWork: employeesTable.phoneWork,
        position: employmentsTable.position,
        sirName: employeesTable.sirName,
      })
      .from(employeesTable)
      .leftJoin(
        employmentsTable,
        eq(employeesTable.employeeId, employmentsTable.employeeId)
      )
      .leftJoin(
        departmentsTable,
        eq(employmentsTable.department, departmentsTable.recordId)
      )
      .where(
        and(
          or(
            gte(employmentsTable.contractEnd, new Date()),
            isNull(employmentsTable.contractEnd)
          )
        )
      )
      .orderBy(employeesTable.sirName);

    const departmentResult = await db
      .select({
        company: companiesTable.companyName,
        departmentName: departmentsTable.departmentName,
        mail: departmentsTable.mail,
        phone: departmentsTable.phone,
      })
      .from(departmentsTable)
      .leftJoin(
        companiesTable,
        eq(departmentsTable.companyId, companiesTable.companyId)
      )
      .orderBy(departmentsTable.recordId);

    return {
      departments: departmentResult,
      employees: employeeResult,
      success: true,
    };
  } catch (error) {
    return {
      error:
        error instanceof Error
          ? error
          : new Error("Es ist ein unerwarteter Fehler aufgetreten."),
      success: false,
    };
  }
}

export default async function Page() {
  const data = await getAddresses();

  if (!data.success) {
    const message =
      data.error instanceof Error
        ? data.error.message
        : "Es ist ein unerwarteter Fehler aufgetreten.";

    return <DataFetchError message={message} service="cockpit" />;
  }
  return (
    <SidebarLayout
      breadcrumbs={[
        { active: true, href: "/ncs-addresses", label: "Adressbuch" },
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
