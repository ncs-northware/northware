import { Headline } from "@northware/ui/components/headline";
import { notFound } from "next/navigation";
import { EmployeePersonalForm } from "@/components/hr-forms";
import { getEmployeePersonal } from "@/lib/hr-actions";
import EmployeeSidebar from "./employee-sidebar";

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
    <EmployeeSidebar id={employeeId}>
      <Headline level="h1">
        {data.employee?.employeeId} / {data.employee?.sirName},{" "}
        {data.employee?.firstName}
      </Headline>
      <EmployeePersonalForm data={data.employee} />
    </EmployeeSidebar>
  );
}
