import { Headline } from "@northware/ui/components/headline";
import { DataFetchError } from "@northware/ui/components/no-data-template";
import type { ColumnDef } from "@tanstack/react-table";
import { notFound } from "next/navigation";
import { EmploymentsList } from "@/components/hr-lists";
import {
  type EmploymentListItem,
  getBasicEmployee,
  getEmploymentsList,
} from "@/lib/hr-actions";
import EmployeeSidebar from "../employee-sidebar";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ employeeId: number }>;
}) {
  const { employeeId } = await params;
  const employeeData = await getBasicEmployee(employeeId);
  if (!employeeData.success) {
    return { title: "Arbeitsverhältnisse" };
  }
  return {
    title: `Arbeitsverhältnisse | ${employeeData.employee.employeeId} / ${employeeData.employee.sirName}, ${employeeData.employee.firstName}`,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ employeeId: number }>;
}) {
  const { employeeId } = await params;
  const employmentsData = await getEmploymentsList(employeeId);
  const employeeData = await getBasicEmployee(employeeId);

  const columns: ColumnDef<EmploymentListItem>[] = [
    { accessorKey: "recordId" },
    { accessorKey: "contractStart" },
    { accessorKey: "contractEnd" },
    { accessorKey: "position" },
    { accessorKey: "departmentName" },
    { accessorKey: "employer" },
  ];

  if (!employeeData.success) {
    return (
      <DataFetchError message={employeeData.error.message} service="cockpit" />
    );
  }
  if (!employmentsData.success) {
    notFound();
  }

  return (
    <EmployeeSidebar
      breadcrumbs={[
        { href: "/hr", label: "HR" },
        { href: "/hr/management", label: "HR Management" },
        {
          href: `/hr/management/${employeeId}`,
          label: `${employeeData.employee.employeeId} / ${employeeData.employee.sirName}, ${employeeData.employee.firstName}`,
        },
        {
          active: true,
          href: `/hr/management/${employeeId}/employment`,
          label: "Arbeitsverhältnisse",
        },
      ]}
      id={employeeId}
    >
      <Headline level="h1">
        Arbeitsverhältnisse von {employeeData.employee.firstName}{" "}
        {employeeData.employee.sirName}
      </Headline>
      <EmploymentsList
        columns={columns}
        data={employmentsData.employments}
        employeeId={employeeId}
      />
    </EmployeeSidebar>
  );
}
