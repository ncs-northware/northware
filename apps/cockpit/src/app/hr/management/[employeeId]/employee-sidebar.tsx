import type { BreadcrumbType } from "@northware/ui/components/auto-breadcrumbs";
import { PermissionProvider } from "@northware/ui/components/permission-provider";
import { SidebarLayout } from "@northware/ui/components/sidebar-layout";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { getBasicEmployee } from "@/lib/hr-actions";

export default async function EmployeeSidebar({
  children,
  id,
  breadcrumbs,
}: {
  children: ReactNode;
  id: number;
  breadcrumbs?: BreadcrumbType[];
}) {
  const data = await getBasicEmployee(id);

  if (!data.success) {
    notFound();
  }

  return (
    <SidebarLayout
      breadcrumbs={breadcrumbs}
      service="cockpit"
      subLabel={`${data.employee?.employeeId} / ${data.employee?.sirName}, ${data.employee?.firstName}`}
      subMenu={[
        {
          title: "Persönliche Daten",
          href: `/hr/management/${id}`,
          exactMatch: true,
        },
        {
          title: "Arbeitsverhältnisse",
          href: `/hr/management/${id}/employment`,
        },
      ]}
    >
      <PermissionProvider permissionKeys={["cockpit::hr-management:update"]}>
        {children}
      </PermissionProvider>
    </SidebarLayout>
  );
}
