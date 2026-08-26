"use client";

import {
  DataTableColumnHeader,
  type DataTableFeatures,
  DataTableFilter,
  DataTablePagination,
  DataTableSelectCell,
  DataTableSelectHeader,
  DataTableViewOptions,
  features,
  TableDescriptionElement,
  TableDescriptionList,
  TableDescriptionTerm,
} from "@northware/ui/components/data-table";
import { Button } from "@northware/ui/components/shadcn/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@northware/ui/components/shadcn/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@northware/ui/components/shadcn/table";
import { MoreHorizontalIcon } from "@northware/ui/icons/lucide";
import {
  type ColumnVisibilityState,
  createColumnHelper,
  type SortingState,
  useTable,
} from "@tanstack/react-table";
import { useState } from "react";

const data: Payment[] = [
  {
    amount: 316,
    email: "ken99@example.com",
    id: "m5gr84i9",
    status: "success",
  },
  {
    amount: 242,
    email: "Abe45@example.com",
    id: "3u1reuv4",
    status: "success",
  },
  {
    amount: 837,
    email: "Monserrat44@example.com",
    id: "derv1ws0",
    status: "processing",
  },
  {
    amount: 874,
    email: "Silas22@example.com",
    id: "5kma53ae",
    status: "success",
  },
  {
    amount: 721,
    email: "carmella@example.com",
    id: "bhqecj4p",
    status: "failed",
  },
];

export interface Payment {
  amount: number;
  email: string;
  id: string;
  status: "pending" | "processing" | "success" | "failed";
}

const columnHelper = createColumnHelper<DataTableFeatures, Payment>();

export const columns = columnHelper.columns([
  columnHelper.display({
    cell: ({ row }) => (
      <TableCell>
        <DataTableSelectCell row={row} />
      </TableCell>
    ),
    enableHiding: false,
    enableSorting: false,
    header: ({ table }) => (
      <TableHead>
        <DataTableSelectHeader table={table} />
      </TableHead>
    ),
    id: "select",
  }),
  columnHelper.accessor("status", {
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue("amount"));

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        currency: "USD",
        style: "currency",
      }).format(amount);
      return (
        <TableCell>
          <div className="capitalize">{row.getValue("status")}</div>
          <TableDescriptionList className="lg:hidden">
            <TableDescriptionTerm>Email</TableDescriptionTerm>
            <TableDescriptionElement>
              {row.getValue("email")}
            </TableDescriptionElement>
            <TableDescriptionTerm>Amount</TableDescriptionTerm>
            <TableDescriptionElement className="sm:hidden">
              {formatted}
            </TableDescriptionElement>
          </TableDescriptionList>
        </TableCell>
      );
    },
    header: ({ column }) => (
      <TableHead>
        <DataTableColumnHeader column={column} title="Status" />
      </TableHead>
    ),
  }),
  columnHelper.accessor("email", {
    cell: ({ row }) => (
      <TableCell>
        <div className="hidden lowercase lg:table-cell">
          {row.getValue("email")}
        </div>
      </TableCell>
    ),
    header: ({ column }) => (
      <TableHead className="hidden lg:table-cell">
        <DataTableColumnHeader column={column} title="Email" />
      </TableHead>
    ),
  }),
  columnHelper.accessor("amount", {
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue("amount"));

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        currency: "USD",
        style: "currency",
      }).format(amount);

      return (
        <TableCell className="hidden sm:table-cell">
          <div className="text-right font-medium">{formatted}</div>
        </TableCell>
      );
    },
    header: ({ column }) => (
      <TableHead className="hidden sm:table-cell">
        <DataTableColumnHeader
          className="text-right"
          column={column}
          title="Amount"
        />
      </TableHead>
    ),
  }),
  columnHelper.display({
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <TableCell>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button className="h-8 w-8 p-0" variant="ghost">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontalIcon />
                </Button>
              }
            />
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(payment.id)}
              >
                Copy payment ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View customer</DropdownMenuItem>
              <DropdownMenuItem>View payment details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      );
    },
    enableHiding: false,
    header: () => (
      <TableHead className="relative">
        <span className="sr-only">Edit</span>
      </TableHead>
    ),
    id: "actions",
  }),
]);

export function DataTableDemo() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnVisibility, setColumnVisibility] =
    useState<ColumnVisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useTable({
    columns,
    data,
    features,
    globalFilterFn: "includesString",
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    state: {
      columnVisibility,
      globalFilter,
      rowSelection,
      sorting,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 py-4">
        <DataTableFilter table={table} />
        <DataTableViewOptions table={table} />
      </div>
      <div className="rounded-md border">
        <Table className="min-w-full">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) =>
                  header.isPlaceholder ? null : (
                    <table.FlexRender header={header} key={header.id} />
                  )
                )}
                <TableHead className="relative">
                  <span className="sr-only">Aktionen</span>
                </TableHead>
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  data-state={row.getIsSelected() && "selected"}
                  key={row.id}
                >
                  {row.getVisibleCells().map((cell) => (
                    <table.FlexRender cell={cell} key={cell.id} />
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  className="h-24 text-center"
                  colSpan={columns.length}
                >
                  Keine Benutzer gefunden.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-muted-foreground text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <DataTablePagination table={table} />
      </div>
    </div>
  );
}

export function DataTablePaginationDemo() {
  const table = useTable({
    columns,
    data,
    features,
  });
  return <DataTablePagination table={table} />;
}

export function DataTableFilterDemo() {
  const [globalFilter, setGlobalFilter] = useState("");
  const table = useTable({
    columns,
    data,
    features,
    globalFilterFn: "includesString",
    onGlobalFilterChange: setGlobalFilter,
    state: { globalFilter },
  });
  return <DataTableFilter table={table} />;
}

export function DataTableViewOptionsDemo() {
  const [columnVisibility, setColumnVisibility] =
    useState<ColumnVisibilityState>({});
  const table = useTable({
    columns,
    data,
    features,
    onColumnVisibilityChange: setColumnVisibility,
    state: { columnVisibility },
  });
  return <DataTableViewOptions table={table} />;
}

export function DataTableColumnHeaderDemo() {
  const demoColumn = columnHelper.columns([
    columnHelper.accessor("email", {
      header: ({ column }) => (
        <TableHead>
          <DataTableColumnHeader column={column} title="Email" />
        </TableHead>
      ),
    }),
  ]);

  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useTable({
    columns: demoColumn,
    data,
    features,
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  });
  return (
    <div className="m-10">
      <Table className="w-full">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <table.FlexRender header={header} key={header.id} />
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                data-state={row.getIsSelected() && "selected"}
                key={row.id}
              >
                {row.getVisibleCells().map((cell) => (
                  <table.FlexRender cell={cell} key={cell.id} />
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell className="h-24 text-center" colSpan={columns.length}>
                Keine Benutzer gefunden.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export function DataTableSelectDemo() {
  const [rowSelection, setRowSelection] = useState({});
  const demoColumn = columnHelper.columns([
    columnHelper.display({
      cell: ({ row }) => (
        <TableCell>
          <DataTableSelectCell row={row} />
        </TableCell>
      ),
      enableHiding: false,
      enableSorting: false,
      header: () => (
        <TableHead>
          <DataTableSelectHeader table={table} />
        </TableHead>
      ),
      id: "select",
    }),
    columnHelper.accessor("email", {
      header: ({ column }) => (
        <TableHead>
          <DataTableColumnHeader column={column} title="Email" />
        </TableHead>
      ),
    }),
  ]);
  const table = useTable({
    columns: demoColumn,
    data,
    features,
    onRowSelectionChange: setRowSelection,
    state: { rowSelection },
  });

  return (
    <div className="m-10">
      <Table className="w-full">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <table.FlexRender header={header} key={header.id} />
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                data-state={row.getIsSelected() && "selected"}
                key={row.id}
              >
                {row.getVisibleCells().map((cell) => (
                  <table.FlexRender cell={cell} key={cell.id} />
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell className="h-24 text-center" colSpan={columns.length}>
                Keine Benutzer gefunden.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
