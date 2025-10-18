"use client";

import {
  DataTableFilter,
  DataTablePagination,
} from "@northware/ui/components/data-table";
import {
  Item,
  ItemActions,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from "@northware/ui/components/shadcn/item";
import { ChevronRightIcon } from "@northware/ui/icons/lucide";
import {
  type ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Link from "next/link";
import { useState } from "react";

export default function EmployeeList<TData, TValue>({
  columns,
  data,
}: {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
}) {
  const [globalFilter, setGlobalFilter] = useState("");
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    globalFilterFn: "includesString",
    getPaginationRowModel: getPaginationRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    state: { globalFilter },
  });
  return (
    <div>
      <div className="py-4">
        <DataTableFilter globalFilter={globalFilter} table={table} />
      </div>
      <ItemGroup className="gap-4">
        {table.getRowModel().rows.map((row) => (
          <Item
            asChild
            className="border border-transparent [a]:hover:border-border"
            key={row.id}
            variant="muted"
          >
            <Link href={`/hr/management/${row.getValue("employeeId")}`}>
              <div className="flex flex-1 flex-col gap-1">
                <ItemTitle>
                  {row.getValue("sirName")}, {row.getValue("firstName")}
                </ItemTitle>
                <ItemDescription>#{row.getValue("employeeId")}</ItemDescription>
              </div>
              <div className="flex flex-auto flex-col gap-1">
                <ItemDescription>
                  {new Date(row.getValue("contractSince")).toLocaleDateString(
                    "DE-de",
                    {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    }
                  )}{" "}
                  - 31.12.2099
                </ItemDescription>
                <ItemDescription>
                  {row.getValue("employerId")} / {row.getValue("employer")}
                </ItemDescription>
              </div>
              <ItemActions>
                <ChevronRightIcon className="size-4" />
              </ItemActions>
            </Link>
          </Item>
        ))}
      </ItemGroup>
      <DataTablePagination table={table} />
    </div>
  );
}
