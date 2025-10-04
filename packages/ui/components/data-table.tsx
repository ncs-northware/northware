"use client";

import { Button } from "@northware/ui/components/shadcn/button";
import { Checkbox } from "@northware/ui/components/shadcn/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@northware/ui/components/shadcn/dropdown-menu";
import { Input } from "@northware/ui/components/shadcn/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@northware/ui/components/shadcn/select";
import { cn } from "@northware/ui/lib/utils";
import type {
  Column as ColumnType,
  Row as RowType,
  Table as TableType,
} from "@tanstack/react-table";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  ChevronsUpDownIcon,
  EyeOffIcon,
} from "lucide-react";
import type React from "react";

type DataTableViewOptionsProps<TData> = {
  table: TableType<TData>;
};

export function DataTableViewOptions<TData>({
  table,
}: DataTableViewOptionsProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="ml-auto hidden h-8 lg:flex"
          size="sm"
          variant="outline"
        >
          Spalten
          <ChevronDownIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[150px]">
        {table
          .getAllColumns()
          .filter(
            (column) =>
              typeof column.accessorFn !== "undefined" && column.getCanHide()
          )
          .map((column) => (
            <DropdownMenuCheckboxItem
              checked={column.getIsVisible()}
              className="capitalize"
              key={column.id}
              onCheckedChange={(value) => column.toggleVisibility(!!value)}
            >
              {column.id}
            </DropdownMenuCheckboxItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

type DataTablePaginationProps<TData> = {
  table: TableType<TData>;
};

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  return (
    <div className="flex items-center justify-between px-2 py-4">
      <div className="flex items-center space-x-2">
        <p className="font-medium text-sm">Einträge pro Seite</p>
        <Select
          onValueChange={(value) => {
            table.setPageSize(Number(value));
          }}
          value={`${table.getState().pagination.pageSize}`}
        >
          <SelectTrigger className="h-8 w-[70px]">
            <SelectValue placeholder={table.getState().pagination.pageSize} />
          </SelectTrigger>
          <SelectContent side="top">
            {/** biome-ignore lint/style/noMagicNumbers: shadcn internals */}
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <SelectItem key={pageSize} value={`${pageSize}`}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex w-[100px] items-center justify-center font-medium text-sm">
        Seite {table.getState().pagination.pageIndex + 1} von{" "}
        {table.getPageCount()}
      </div>
      <div className="flex items-center space-x-2">
        <Button
          className="hidden h-8 w-8 p-0 lg:flex"
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.setPageIndex(0)}
          variant="outline"
        >
          <span className="sr-only">Zur ersten Seite</span>
          <ChevronsLeftIcon />
        </Button>
        <Button
          className="h-8 w-8 p-0"
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.previousPage()}
          variant="outline"
        >
          <span className="sr-only">Zur vorherigen Seite</span>
          <ChevronLeftIcon />
        </Button>
        <Button
          className="h-8 w-8 p-0"
          disabled={!table.getCanNextPage()}
          onClick={() => table.nextPage()}
          variant="outline"
        >
          <span className="sr-only">Zur nächsten Seite</span>
          <ChevronRightIcon />
        </Button>
        <Button
          className="hidden h-8 w-8 p-0 lg:flex"
          disabled={!table.getCanNextPage()}
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          variant="outline"
        >
          <span className="sr-only">Zur letzen Seite</span>
          <ChevronsRightIcon />
        </Button>
      </div>
    </div>
  );
}

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: ColumnType<TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="-ml-3 h-8 data-[state=open]:bg-accent"
            size="sm"
            variant="ghost"
          >
            <span>{title}</span>
            {column.getIsSorted() === "desc" ? (
              <ArrowDownIcon />
              // biome-ignore lint/style/noNestedTernary: shadcn internal
            ) : column.getIsSorted() === "asc" ? (
              <ArrowUpIcon />
            ) : (
              <ChevronsUpDownIcon />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            <ArrowUpIcon className="h-3.5 w-3.5 text-muted-foreground/70" />
            Aufsteigend sortieren
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <ArrowDownIcon className="h-3.5 w-3.5 text-muted-foreground/70" />
            Absteigend sortieren
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
            <EyeOffIcon className="h-3.5 w-3.5 text-muted-foreground/70" />
            Spalte verstecken
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

type DataTableFilterProps<TData> = {
  table: TableType<TData>;
  globalFilter: string;
};

export function DataTableFilter<TData>({
  table,
  globalFilter,
}: DataTableFilterProps<TData>) {
  return (
    <Input
      onChange={(event) => table.setGlobalFilter(String(event.target.value))}
      placeholder="Tabelle durchsuchen..."
      value={globalFilter}
    />
  );
}

export function DataTableSelectHeader<TData>({
  table,
}: {
  table: TableType<TData>;
}) {
  return (
    <Checkbox
      aria-label="Alle auswählen"
      checked={
        table.getIsAllPageRowsSelected() ||
        (table.getIsSomePageRowsSelected() && "indeterminate")
      }
      onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
    />
  );
}

export function DataTableSelectCell<TData>({ row }: { row: RowType<TData> }) {
  return (
    <Checkbox
      aria-label="Zeile auswählen"
      checked={row.getIsSelected()}
      onCheckedChange={(value) => row.toggleSelected(!!value)}
    />
  );
}

export function TableDescriptionList({
  className,
  ...props
}: React.ComponentProps<"dl">) {
  return <dl className={className} {...props} />;
}

export function TableDescriptionTerm({
  className,
  ...props
}: React.ComponentProps<"dt">) {
  return <dt className={cn("sr-only", className)} {...props} />;
}

export function TableDescriptionElement({
  className,
  ...props
}: React.ComponentProps<"dd">) {
  return <dd className={className} {...props} />;
}
