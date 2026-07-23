"use client";

import {
  DataTableFilter,
  DataTablePagination,
} from "@northware/ui/components/data-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@northware/ui/components/shadcn/table";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { Fragment, useState } from "react";
import {
  PermissionDeleteButton,
  UpdatePermissionDetails,
} from "@/components/role-forms";

interface DataTableProps<TData extends { recordId: number }, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  permissions: { update: boolean; delete: boolean };
}

export function DataTable<
  TData extends {
    recordId: number;
    permissionKey: string;
    permissionName: string | null;
  },
  TValue,
>({ columns, data, permissions }: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    globalFilterFn: "includesString",
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    state: { globalFilter, sorting },
  });
  return (
    <div>
      <div className="flex items-center gap-2 py-4">
        <DataTableFilter globalFilter={globalFilter} table={table} />
      </div>
      <div className="rounded-md border">
        <Table className="min-w-full">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Fragment key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </Fragment>
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
                    <Fragment key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Fragment>
                  ))}
                  <TableCell>
                    <div className="flex justify-end">
                      {permissions.update === true && (
                        <UpdatePermissionDetails
                          permissionDetails={row.original}
                        />
                      )}
                      {permissions.delete === true && (
                        <PermissionDeleteButton
                          recordId={row.original.recordId}
                        />
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
                  Keine Berechtigungsschlüssel gefunden.
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
