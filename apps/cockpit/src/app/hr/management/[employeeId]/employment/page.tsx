import { db } from "@northware/database/connection";
import { companiesTable } from "@northware/database/schema/companies";
import { departmentsTable } from "@northware/database/schema/departments";
import { employeesWorkerTable } from "@northware/database/schema/hr-employees";
import { Headline } from "@northware/ui/components/headline";
import { DataFetchError } from "@northware/ui/components/no-data-template";
import type { ColumnDef } from "@tanstack/react-table";
import { desc, eq } from "drizzle-orm";
import { type BasicEmployee, getBasicEmployee } from "@/lib/hr-actions";
import { EmploymentsList } from "../../employee-list";
import EmployeeSidebar from "../employee-sidebar";

type EmploymentItem = {
  recordId: number;
  position: string;
  departmentName: string | null;
  employer: string | null;
  contractStart: Date;
  contractEnd: Date | null;
};

async function getEmploymentsList(
  id: number
): Promise<
  | { success: true; employments: EmploymentItem[]; employee: BasicEmployee }
  | { success: false; error: Error }
> {
  try {
    const result = await db
      .select({
        recordId: employeesWorkerTable.recordId,
        position: employeesWorkerTable.position,
        departmentName: departmentsTable.departmentName,
        employer: companiesTable.companyName,
        contractStart: employeesWorkerTable.contractStart,
        contractEnd: employeesWorkerTable.contractEnd,
      })
      .from(employeesWorkerTable)
      .leftJoin(
        departmentsTable,
        eq(employeesWorkerTable.department, departmentsTable.recordId)
      )
      .leftJoin(
        companiesTable,
        eq(employeesWorkerTable.employer, companiesTable.companyId)
      )
      .where(eq(employeesWorkerTable.employeeId, id))
      .orderBy(
        employeesWorkerTable.contractStart,
        desc(employeesWorkerTable.contractEnd)
      );
    const employeeResult = await getBasicEmployee(id);
    if (!employeeResult.success) {
      throw (
        employeeResult.error ??
        new Error("Die Daten des Mitarbeiters konnten nicht geladen werden.")
      );
    }
    return {
      success: true,
      employments: result,
      employee: employeeResult.employee,
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ employeeId: number }>;
}) {
  const { employeeId } = await params;
  const data = await getEmploymentsList(employeeId);
  if (!data.success) {
    return { title: "Arbeitsverhältnisse" };
  }
  return {
    title: `Arbeitsverhältnisse | ${data.employee?.employeeId} / ${data.employee?.sirName}, ${data.employee?.firstName}`,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ employeeId: number }>;
}) {
  const { employeeId } = await params;
  const data = await getEmploymentsList(employeeId);

  const columns: ColumnDef<EmploymentItem>[] = [
    { accessorKey: "recordId" },
    { accessorKey: "contractStart" },
    { accessorKey: "contractEnd" },
    { accessorKey: "position" },
    { accessorKey: "departmentName" },
    { accessorKey: "employer" },
  ];

  if (!data.success) {
    return <DataFetchError message={data.error?.message} service="cockpit" />;
  }

  return (
    <EmployeeSidebar
      breadcrumbs={[
        { label: "HR", href: "/hr" },
        { label: "HR Management", href: "/hr/management" },
        {
          label: `${data.employee?.employeeId} / ${data.employee?.sirName}, ${data.employee?.firstName}`,
          href: `/hr/management/${employeeId}`,
        },
        {
          label: "Arbeitsverhältnisse",
          href: `/hr/management/${employeeId}/employment`,
          active: true,
        },
      ]}
      id={employeeId}
    >
      <Headline level="h1">
        Arbeitsverhältnisse von {data.employee?.firstName}{" "}
        {data.employee?.sirName}
      </Headline>
      <EmploymentsList
        columns={columns}
        data={data.employments || []}
        employeeId={employeeId}
      />
    </EmployeeSidebar>
  );
}
