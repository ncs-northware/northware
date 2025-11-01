"use client";

import {
  DataTableFilter,
  DataTablePagination,
} from "@northware/ui/components/data-table";
import { Badge } from "@northware/ui/components/shadcn/badge";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyTitle,
} from "@northware/ui/components/shadcn/empty";
import {
  Item,
  ItemActions,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from "@northware/ui/components/shadcn/item";
import { ChevronRightIcon } from "@northware/ui/icons/lucide";
import { cn, formattedDate, localDateDE } from "@northware/ui/lib/utils";
import {
  type ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Link from "next/link";
import { useState } from "react";

export function EmployeeList<TData, TValue>({
  columns,
  data,
}: {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
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
        {table.getRowModel().rows.length > 0 ? (
          table.getRowModel().rows.map((row) => (
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
                  <ItemDescription>
                    #{row.getValue("employeeId")}
                  </ItemDescription>
                </div>
                <div className="flex flex-auto flex-col gap-1">
                  <ItemDescription className="flex gap-1">
                    {(row.getValue("activeContracts") as number) > 0 ? (
                      <Badge
                        className="bg-success text-success-foreground"
                        variant="secondary"
                      >
                        {row.getValue("activeContracts")} laufende Verträge
                      </Badge>
                    ) : (
                      ""
                    )}
                    {(row.getValue("terminatedContracts") as number) > 0 ? (
                      <Badge variant="secondary">
                        {row.getValue("terminatedContracts")} beendete Verträge
                      </Badge>
                    ) : (
                      ""
                    )}
                  </ItemDescription>
                </div>
                <ItemActions>
                  <ChevronRightIcon className="size-4" />
                </ItemActions>
              </Link>
            </Item>
          ))
        ) : (
          <Empty className="bg-muted/50">
            <EmptyContent>
              <EmptyTitle>Es wurden keine Mitarbeiter gefunden.</EmptyTitle>
              <EmptyDescription>
                Zu diesen Suchkriterien konnten keine Ergebnisse gefunden
                werden. Versuche es mit einem anderen Suchbegriff.
              </EmptyDescription>
            </EmptyContent>
          </Empty>
        )}
      </ItemGroup>
      <DataTablePagination table={table} />
    </div>
  );
}

export function EmploymentsList<TData, TValue>({
  columns,
  data,
  employeeId,
}: {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  employeeId: number;
}) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  return (
    <div>
      <ItemGroup className="gap-4">
        {table.getCoreRowModel().rows.length > 0 ? (
          table.getRowModel().rows.map((row) => (
            <Item
              asChild
              className={cn(
                "border border-transparent [a]:hover:border-border",
                row.getValue("contractEnd") != null &&
                  (row.getValue("contractEnd") as Date) < new Date()
                  ? "text-muted-foreground"
                  : ""
              )}
              key={row.id}
              variant="muted"
            >
              <Link
                href={`/hr/management/${employeeId}/employment/${row.getValue("recordId")}`}
              >
                <div className="flex flex-1 flex-col gap-1">
                  <ItemTitle>
                    {row.getValue("position")}
                    {row.getValue("contractEnd") != null &&
                    (row.getValue("contractEnd") as Date) < new Date() ? (
                      <Badge variant="secondary">
                        Arbeitsverhältnis beendet
                      </Badge>
                    ) : (
                      ""
                    )}
                  </ItemTitle>
                  <ItemDescription>
                    {row.getValue("departmentName")}
                  </ItemDescription>
                </div>
                <div className="flex flex-1 flex-col gap-1">
                  <ItemTitle className="flex gap-1">
                    {formattedDate(row.getValue("contractStart"), "PPP", {
                      locale: localDateDE,
                    })}{" "}
                    -{" "}
                    {row.getValue("contractEnd") != null
                      ? formattedDate(row.getValue("contractEnd"), "PPP", {
                          locale: localDateDE,
                        })
                      : ""}
                  </ItemTitle>
                  <ItemDescription>{row.getValue("employer")}</ItemDescription>
                </div>
                <ItemActions>
                  <ChevronRightIcon className="size-4" />
                </ItemActions>
              </Link>
            </Item>
          ))
        ) : (
          <Empty className="bg-muted/50">
            <EmptyContent>
              <EmptyTitle>
                Anscheinend sind zu diesem Mitarbeiter keine Arbeitsverhältnisse
                gespeichert.
              </EmptyTitle>
              <EmptyDescription>
                Legen Sie bitte ein neues Arbeitsverhältnis an.
              </EmptyDescription>
            </EmptyContent>
          </Empty>
        )}
      </ItemGroup>
      <DataTablePagination table={table} />
    </div>
  );
}
