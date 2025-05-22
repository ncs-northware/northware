import { Button } from "@northware/ui/components/button";
import {
  DataTable,
  DataTableColumnHeader,
  type DataTableProps,
} from "@northware/ui/components/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@northware/ui/components/dropdown-menu";
import { MoreHorizontal } from "@northware/ui/icons/lucide";
import type { Meta, StoryFn } from "@storybook/react";
import type { ColumnDef } from "@tanstack/react-table";

export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="E-Mail" />
    ),
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    cell: () => {
      return (
        <div className="text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="size-8 p-0">
                <span className="sr-only">Open Menu</span>
                <MoreHorizontal className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>Copy payment ID</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View customer</DropdownMenuItem>
              <DropdownMenuItem>View payment details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];

const data: Payment[] = [
  {
    id: "m5gr84i9",
    amount: 316,
    status: "success",
    email: "ken99@example.com",
  },
  {
    id: "3u1reuv4",
    amount: 242,
    status: "success",
    email: "Abe45@example.com",
  },
  {
    id: "derv1ws0",
    amount: 837,
    status: "processing",
    email: "Monserrat44@example.com",
  },
  {
    id: "5kma53ae",
    amount: 874,
    status: "success",
    email: "Silas22@example.com",
  },
  {
    id: "bhqecj4p",
    amount: 721,
    status: "failed",
    email: "carmella@example.com",
  },
];

const meta = {
  title: "Components/Panels/DataTable",
  component: DataTable,
} satisfies Meta<DataTableProps<Payment, unknown>>;

export default meta;

const Template: StoryFn<DataTableProps<Payment, unknown>> = (args) => (
  <DataTable {...args} />
);

export const Default = Template.bind({});
Default.args = {
  columns: columns,
  data: data,
};

/**
 * Der Placeholder von dem Suchfeld kann über das Property `filterPlaceholder` angepasst werden.
 */

export const CustomFilterPlaceholder = Template.bind({});
CustomFilterPlaceholder.args = {
  columns: columns,
  data: data,
  filterPlaceholder: "Finde etwas...",
};

/**
 * Wenn der Wert des Properties `withRowSelect` auf `false` gesetzt wird, wird die Tabelle ohne Checkboxen angezeigt.
 */

export const NoRowSelect = Template.bind({});
NoRowSelect.args = {
  columns: columns,
  data: data,
  withRowSelect: false,
};

const moreData: Payment[] = [
  {
    id: "m5gr84i9",
    amount: 316,
    status: "success",
    email: "ken99@example.com",
  },
  {
    id: "3u1reuv4",
    amount: 242,
    status: "success",
    email: "Abe45@example.com",
  },
  {
    id: "a1b2c3d4",
    amount: 150,
    status: "pending",
    email: "user1@example.com",
  },
  {
    id: "e5f6g7h8",
    amount: 78,
    status: "processing",
    email: "test2@example.org",
  },
  {
    id: "i9j0k1l2",
    amount: 455,
    status: "success",
    email: "sample3@domain.net",
  },
  {
    id: "m3n4o5p6",
    amount: 123,
    status: "failed",
    email: "another4@email.co",
  },
  {
    id: "q7r8s9t0",
    amount: 299,
    status: "pending",
    email: "user5@example.com",
  },
  {
    id: "u1v2w3x4",
    amount: 67,
    status: "processing",
    email: "test6@example.org",
  },
  {
    id: "y5z6a7b8",
    amount: 512,
    status: "success",
    email: "sample7@domain.net",
  },
  {
    id: "c9d0e1f2",
    amount: 95,
    status: "failed",
    email: "another8@email.co",
  },
  {
    id: "g3h4i5j6",
    amount: 380,
    status: "pending",
    email: "user9@example.com",
  },
  {
    id: "k7l8m9n0",
    amount: 210,
    status: "processing",
    email: "test10@example.org",
  },
  {
    id: "o1p2q3r4",
    amount: 188,
    status: "success",
    email: "sample11@domain.net",
  },
  {
    id: "s5t6u7v8",
    amount: 333,
    status: "failed",
    email: "another12@email.co",
  },
  {
    id: "w9x0y1z2",
    amount: 72,
    status: "pending",
    email: "user13@example.com",
  },
  {
    id: "a3b4c5d6",
    amount: 415,
    status: "processing",
    email: "test14@example.org",
  },
  {
    id: "e7f8g9h0",
    amount: 199,
    status: "success",
    email: "sample15@domain.net",
  },
  {
    id: "i1j2k3l4",
    amount: 61,
    status: "failed",
    email: "another16@email.co",
  },
  {
    id: "m5n6o7p8",
    amount: 275,
    status: "pending",
    email: "user17@example.com",
  },
  {
    id: "q9r0s1t2",
    amount: 112,
    status: "processing",
    email: "test18@example.org",
  },
  {
    id: "u3v4w5x6",
    amount: 488,
    status: "success",
    email: "sample19@domain.net",
  },
  {
    id: "y7z8a9b0",
    amount: 165,
    status: "failed",
    email: "another20@email.co",
  },
];

/**
 * Wenn die Tabelle viele Daten anzeigen soll, wird eine pagination verwendet.
 */

export const BigTable = Template.bind({});
BigTable.args = {
  columns: columns,
  data: moreData,
};
