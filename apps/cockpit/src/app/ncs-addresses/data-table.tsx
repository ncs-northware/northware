"use client";

import {
  type DataTableFeatures,
  DataTableFilter,
  DataTablePagination,
  DataTableViewOptions,
  features,
} from "@northware/ui/components/data-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@northware/ui/components/shadcn/table";
import {
  type ColumnDef,
  type ColumnVisibilityState,
  flexRender,
  type PaginationState,
  type RowData,
  useTable,
} from "@tanstack/react-table";
import { Fragment, useState } from "react";

interface DataTableProps<TData extends RowData> {
  columns: ColumnDef<DataTableFeatures, TData>[];
  data: TData[];
  paginationPageSize?: number;
}

export function DataTable<TData extends RowData>({
  columns,
  data,
  paginationPageSize = 10,
}: DataTableProps<TData>) {
  const [columnVisibility, setColumnVisibility] =
    useState<ColumnVisibilityState>({});
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: paginationPageSize,
  });

  const table = useTable({
    columns,
    data,
    features,
    globalFilterFn: "includesString",
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    state: {
      columnVisibility,
      globalFilter,
      pagination,
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
                {headerGroup.headers.map((header) => (
                  <Fragment key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </Fragment>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <Fragment key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Fragment>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  className="h-24 text-center"
                  colSpan={columns.length}
                >
                  Es wurden keine Einträge gefunden.
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
