import { SidebarLayout } from "@northware/ui/components/sidebar-layout";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { getBasicEmployee } from "@/lib/hr-actions";

export default async function EmployeeSidebar({
  children,
  id,
}: {
  children: ReactNode;
  id: number;
}) {
  const data = await getBasicEmployee(id);

  if (!data.success) {
    notFound();
  }

  return (
    <SidebarLayout
      breadcrumbs={[
        { label: "HR", href: "/hr" },
        { label: "HR Management", href: "/hr/management" },
        {
          label: `${data.employee?.employeeId} / ${data.employee?.sirName}, ${data.employee?.firstName}`,
          href: `hr/management/${id}`,
        },
      ]}
      service="cockpit"
      subLabel={`${data.employee?.employeeId} / ${data.employee?.sirName}, ${data.employee?.firstName}`}
      subMenu={[
        {
          title: "Persönliche Daten",
          href: `/hr/management/${id}`,
        },
        {
          title: "Dienstliche Identität",
          href: `/hr/management/${id}/work-identity`,
        },
      ]}
    >
      {children}
    </SidebarLayout>
  );
}
