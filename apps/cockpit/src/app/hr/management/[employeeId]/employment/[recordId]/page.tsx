import { Headline } from "@northware/ui/components/headline";
import { Badge } from "@northware/ui/components/shadcn/badge";
import { differenceInCalendarMonths, formatDate } from "date-fns";
import { de } from "date-fns/locale";
import { notFound } from "next/navigation";
import { UpdateEmploymentForm } from "@/components/hr-forms";
import {
  getBasicEmployee,
  getEmployment,
  getEmploymentContext,
} from "@/lib/hr-actions";
import EmployeeSidebar from "../../employee-sidebar";

function EmploymentStatusBadge({ contractEnd }: { contractEnd: Date | null }) {
  if (!contractEnd) {
    return null;
  }

  const today = new Date();
  const monthsUntilEnd = differenceInCalendarMonths(contractEnd, today);

  if (contractEnd < today) {
    return (
      <Badge variant="secondary">Das Arbeitsverhältnis wurde beendet</Badge>
    );
  }

  if (monthsUntilEnd <= 3) {
    const endText =
      monthsUntilEnd === 0
        ? "diesem Monat"
        : `in ${monthsUntilEnd} Monat${monthsUntilEnd > 1 ? "en" : ""}`;

    return (
      <Badge className="bg-warning text-warning-foreground">
        Das Arbeitsverhältnis endet {endText}
      </Badge>
    );
  }

  return null;
}

export default async function Page({
  params,
}: {
  params: Promise<{ employeeId: number; recordId: number }>;
}) {
  const { employeeId, recordId } = await params;
  const employeeData = await getBasicEmployee(employeeId);
  const employmentData = await getEmployment(recordId);
  const contextData = await getEmploymentContext();
  if (
    !(employeeData.success && employmentData.success && contextData.success)
  ) {
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
          href: `/hr/management/${employeeId}/employment`,
          label: "Arbeitsverhältnisse",
        },
        {
          href: `hr/management/${employeeId}/employment/${recordId}`,
          label: `${employmentData.employment.position} (${formatDate(employmentData.employment.contractStart, "PPP", { locale: de })} - ${
            employmentData.employment.contractEnd === null
              ? ""
              : formatDate(employmentData.employment.contractEnd, "PPP", {
                  locale: de,
                })
          })`,
        },
      ]}
      id={employeeId}
    >
      <div className="rounded-md border border-border">
        <div className="border-border border-b p-4">
          <Headline level="h2">{employmentData.employment.position}</Headline>
          <p className="font-medium text-muted-foreground text-sm">
            {employmentData.employment.department} (
            {employmentData.employment.employer})
          </p>
        </div>
        <div className="p-4">
          <p className="font-medium text-muted-foreground text-sm">
            {formatDate(employmentData.employment.contractStart, "PPP", {
              locale: de,
            })}{" "}
            -{" "}
            {employmentData.employment.contractEnd !== null &&
              formatDate(employmentData.employment.contractEnd, "PPP", {
                locale: de,
              })}
          </p>
          <div>
            <EmploymentStatusBadge
              contractEnd={employmentData.employment.contractEnd}
            />
          </div>
        </div>
      </div>
      <UpdateEmploymentForm
        companies={contextData.companies}
        data={employmentData.employment}
        departments={contextData.departments}
        employeeId={employeeId}
        recordId={recordId}
      />
    </EmployeeSidebar>
  );
}
