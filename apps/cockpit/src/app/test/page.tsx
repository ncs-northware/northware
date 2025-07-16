import { SidebarLayout } from "@northware/ui/components/sidebar-layout";
import { columns, type Payment } from "./columns";
import { DataTable } from "./data-table";

export const payments: Payment[] = [
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "489e1d42",
    amount: 125,
    status: "processing",
    email: "example@gmail.com",
  },
  // ...
];

export default function DemoPage() {
  return (
    <SidebarLayout service="cockpit">
      <DataTable columns={columns} data={payments} />
    </SidebarLayout>
  );
}
