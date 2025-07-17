import { userHasPermission } from "@northware/ui/components/permission-provider";
import { SidebarLayout } from "@northware/ui/components/sidebar-layout";
import { columns, type Payment } from "./columns";
import { DataTable } from "./data-table";

export const payments: Payment[] = [
  {
    id: 13,
    name: "Lindsay Walton",
    title: "Front-end Developer",
    email: "lindsay.walton@example.com",
    role: "Member",
  },
  {
    id: 36,
    name: "John Doe",
    title: "Front-end Developer",
    email: "lindsay.walton@example.com",
    role: "Member",
  },
  {
    id: 24,
    name: "Michel Müller",
    title: "Front-end Developer",
    email: "lindsay.walton@example.com",
    role: "Member",
  },
  // ...
];

export default async function DemoPage() {
  const editPermission = await userHasPermission(["cockpit::user.update"]);
  const deletePermission = await userHasPermission(["cockpit::user.delete"]);
  return (
    <SidebarLayout service="cockpit">
      <DataTable
        columns={columns}
        data={payments}
        permissions={{ edit: editPermission, delete: deletePermission }}
      />
    </SidebarLayout>
  );
}
