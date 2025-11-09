import { Headline } from "@northware/ui/components/headline";
import { PermissionProvider } from "@northware/ui/components/permission-provider";
import { notFound } from "next/navigation";
import { EmployeePersonalForm } from "@/components/hr-forms";
import { getBasicEmployee, getEmployeePersonal } from "@/lib/hr-actions";
import EmployeeSidebar from "./employee-sidebar";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ employeeId: number }>;
}) {
  const { employeeId } = await params;
  const data = await getBasicEmployee(employeeId);
  if (!data.success) {
    return { title: "Mitarbeiter bearbeiten" };
  }
  return {
    title: `${data.employee.employeeId} / ${data.employee.sirName}, ${data.employee.firstName}`,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ employeeId: number }>;
}) {
  const { employeeId } = await params;
  const data = await getEmployeePersonal(employeeId);

  if (!data.success) {
    notFound();
  }

  return (
    <EmployeeSidebar
      breadcrumbs={[
        { label: "HR", href: "/hr" },
        { label: "HR Management", href: "/hr/management" },
        {
          label: `${data.employee?.employeeId} / ${data.employee?.sirName}, ${data.employee?.firstName}`,
          href: `/hr/management/${employeeId}`,
          active: true,
        },
      ]}
      id={employeeId}
    >
      <PermissionProvider permissionKeys={["cockpit::hr-management.update"]}>
        <Headline level="h1">
          {data.employee?.employeeId} / {data.employee?.sirName},{" "}
          {data.employee?.firstName}
        </Headline>
        <EmployeePersonalForm data={data.employee} />
      </PermissionProvider>
    </EmployeeSidebar>
  );
}
