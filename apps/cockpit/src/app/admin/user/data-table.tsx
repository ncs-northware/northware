"use client";

import {
  type DataTableFeatures,
  DataTableFilter,
  DataTablePagination,
  DataTableViewOptions,
  features,
} from "@northware/ui/components/data-table";
import { buttonVariants } from "@northware/ui/components/shadcn/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@northware/ui/components/shadcn/table";
import { EditIcon } from "@northware/ui/icons/lucide";
import {
  type ColumnDef,
  type ColumnVisibilityState,
  type RowData,
  type SortingState,
  useTable,
} from "@tanstack/react-table";
import Link from "next/link";
import { useState } from "react";
import { UserDeleteButton } from "@/components/user-forms";

interface DataTableProps<TData extends RowData & { id: string }> {
  columns: ColumnDef<DataTableFeatures, TData>[];
  data: TData[];
  permissions: { update: boolean; delete: boolean };
}

export function DataTable<TData extends RowData & { id: string }>({
  columns,
  data,
  permissions,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnVisibility, setColumnVisibility] =
    useState<ColumnVisibilityState>({});

  const table = useTable({
    columns,
    data,
    features,
    globalFilterFn: "includesString",
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    state: { columnVisibility, globalFilter, sorting },
  });
  return (
    <div>
      <div className="flex items-center gap-2 py-4">
        <DataTableFilter table={table} />
        <DataTableViewOptions table={table} />
      </div>
      <div className="rounded-md border">
        <Table className="min-w-full">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <table.FlexRender header={header} key={header.id} />
                ))}
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
                  <TableCell>
                    <div className="flex justify-end">
                      {permissions.update === true && (
                        <Link
                          className={buttonVariants({ variant: "ghost" })}
                          href={`user/${row.original.id}`}
                        >
                          <EditIcon />
                        </Link>
                      )}
                      {permissions.delete === true && (
                        <UserDeleteButton userId={row.original.id} />
                      )}
                    </div>
                  </TableCell>
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
      <DataTablePagination table={table} />
    </div>
  );
}
