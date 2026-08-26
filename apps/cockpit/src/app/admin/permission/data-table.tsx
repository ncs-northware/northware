"use client";

import {
  type DataTableFeatures,
  DataTableFilter,
  DataTablePagination,
  features,
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
  type SortingState,
  useTable,
} from "@tanstack/react-table";
import { useState } from "react";
import {
  PermissionDeleteButton,
  UpdatePermissionDetails,
} from "@/components/role-forms";
import type { TPermissionType } from "@/lib/rbac-types";

interface DataTableProps<TData extends TPermissionType> {
  columns: ColumnDef<DataTableFeatures, TData>[];
  data: TData[];
  permissions: { update: boolean; delete: boolean };
}

export function DataTable<TData extends TPermissionType>({
  columns,
  data,
  permissions,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useTable({
    columns,
    data,
    features,
    globalFilterFn: "includesString",
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    state: { globalFilter, sorting },
  });
  return (
    <div>
      <div className="flex items-center gap-2 py-4">
        <DataTableFilter table={table} />
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
