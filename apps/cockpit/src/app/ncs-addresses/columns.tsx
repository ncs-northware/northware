"use client";

import {
  DataTableColumnHeader,
  TableDescriptionElement,
  TableDescriptionList,
} from "@northware/ui/components/data-table";
import { TableCell, TableHead } from "@northware/ui/components/shadcn/table";
import { MailIcon, PhoneIcon } from "@northware/ui/icons/lucide";
import type { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export interface EmployeeAddress {
  department: string | null;
  firstName: string;
  mailWork: string | null;
  phoneWork: string | null;
  position: string | null;
  sirName: string;
}

export const employeeColumns: ColumnDef<EmployeeAddress>[] = [
  {
    accessorKey: "sirName",
    cell: ({ row }) => (
      <TableCell>
        <div className="hidden md:table-cell">{row.getValue("sirName")}</div>
        <TableDescriptionList className="md:hidden">
          <TableDescriptionElement className="font-semibold">
            {row.getValue("sirName")}, {row.getValue("firstName")}
          </TableDescriptionElement>
          <TableDescriptionElement className="flex flex-row items-center gap-2">
            <PhoneIcon className="size-4" />
            {row.getValue("phoneWork")}
          </TableDescriptionElement>
          <TableDescriptionElement className="flex flex-row items-center gap-2">
            <MailIcon className="size-4 text-primary" />
            <Link
              className="text-primary hover:underline hover:underline-offset-4"
              href={`mailto:${row.getValue("mailWork")}`}
            >
              {row.getValue("mailWork")}
            </Link>
          </TableDescriptionElement>
          <TableDescriptionElement className="text-muted-foreground">
            {row.getValue("position")}
          </TableDescriptionElement>
          <TableDescriptionElement className="text-muted-foreground">
            {row.getValue("department")}
          </TableDescriptionElement>
        </TableDescriptionList>
      </TableCell>
    ),
    header: ({ column }) => (
      <TableHead>
        <DataTableColumnHeader column={column} title="Nachname" />
      </TableHead>
    ),
  },
  {
    accessorKey: "firstName",
    cell: ({ row }) => (
      <TableCell className="hidden md:table-cell">
        {row.getValue("firstName")}
      </TableCell>
    ),
    header: ({ column }) => (
      <TableHead className="hidden md:table-cell">
        <DataTableColumnHeader column={column} title="Vorname" />
      </TableHead>
    ),
  },
  {
    accessorKey: "phoneWork",
    cell: ({ row }) => (
      <TableCell className="hidden md:table-cell">
        <TableDescriptionList>
          <TableDescriptionElement className="flex flex-row items-center gap-2">
            <PhoneIcon className="size-4 lg:hidden" />
            {row.getValue("phoneWork")}
          </TableDescriptionElement>
          <TableDescriptionElement className="flex flex-row items-center gap-2 lg:hidden">
            <MailIcon className="size-4 text-primary" />
            <Link
              className="text-primary hover:underline hover:underline-offset-4"
              href={`mailto:${row.getValue("mailWork")}`}
            >
              {row.getValue("mailWork")}
            </Link>
          </TableDescriptionElement>
        </TableDescriptionList>
      </TableCell>
    ),
    header: ({ column }) => (
      <TableHead className="hidden md:table-cell">
        <DataTableColumnHeader column={column} title="Telefonnummer" />
      </TableHead>
    ),
  },
  {
    accessorKey: "mailWork",
    cell: ({ row }) => (
      <TableCell className="hidden lg:table-cell">
        <Link
          className="text-primary hover:underline hover:underline-offset-4"
          href={`mailto:${row.getValue("mailWork")}`}
        >
          {row.getValue("mailWork")}
        </Link>
      </TableCell>
    ),
    header: ({ column }) => (
      <TableHead className="hidden lg:table-cell">
        <DataTableColumnHeader column={column} title="E-Mail-Adresse" />
      </TableHead>
    ),
  },
  {
    accessorKey: "position",
    cell: ({ row }) => (
      <TableCell className="hidden md:table-cell">
        <TableDescriptionList>
          <TableDescriptionElement>
            {row.getValue("position")}
          </TableDescriptionElement>
          <TableDescriptionElement className="text-muted-foreground lg:hidden">
            {row.getValue("department")}
          </TableDescriptionElement>
        </TableDescriptionList>
      </TableCell>
    ),
    header: ({ column }) => (
      <TableHead className="hidden md:table-cell">
        <DataTableColumnHeader column={column} title="Position" />
      </TableHead>
    ),
  },
  {
    accessorKey: "department",
    cell: ({ row }) => (
      <TableCell className="hidden lg:table-cell">
        {row.getValue("department")}
      </TableCell>
    ),
    header: ({ column }) => (
      <TableHead className="hidden lg:table-cell">
        <DataTableColumnHeader column={column} title="Abteilung" />
      </TableHead>
    ),
  },
];

export interface DepartmentAddress {
  company: string | null;
  departmentName: string;
  mail: string;
  phone: string;
}

export const departmentColumns: ColumnDef<DepartmentAddress>[] = [
  {
    accessorKey: "departmentName",
    cell: ({ row }) => (
      <TableCell>
        <TableDescriptionList>
          <TableDescriptionElement>
            {row.getValue("departmentName")}
          </TableDescriptionElement>
          <TableDescriptionElement className="text-muted-foreground lg:hidden">
            {row.getValue("company")}
          </TableDescriptionElement>
        </TableDescriptionList>
      </TableCell>
    ),
    header: ({ column }) => (
      <TableHead>
        <DataTableColumnHeader column={column} title="Abteilung" />
      </TableHead>
    ),
  },
  {
    accessorKey: "company",
    cell: ({ row }) => (
      <TableCell className="hidden lg:table-cell">
        {row.getValue("company")}
      </TableCell>
    ),
    header: ({ column }) => (
      <TableHead className="hidden lg:table-cell">
        <DataTableColumnHeader column={column} title="Firma" />
      </TableHead>
    ),
  },
  {
    accessorKey: "phone",
    cell: ({ row }) => (
      <TableCell>
        <TableDescriptionList>
          <TableDescriptionElement className="flex flex-row items-center gap-2">
            <PhoneIcon className="size-4" />
            {row.getValue("phone")}
          </TableDescriptionElement>
          <TableDescriptionElement className="flex flex-row items-center gap-2 md:hidden">
            <MailIcon className="size-4 text-primary" />
            <Link
              className="text-primary hover:underline hover:underline-offset-4"
              href={`mailto:${row.getValue("mail")}`}
            >
              {row.getValue("mail")}
            </Link>
          </TableDescriptionElement>
        </TableDescriptionList>
      </TableCell>
    ),
    header: ({ column }) => (
      <TableHead>
        <DataTableColumnHeader column={column} title="Telefonnummer" />
      </TableHead>
    ),
  },
  {
    accessorKey: "mail",
    cell: ({ row }) => (
      <TableCell className="hidden md:table-cell">
        <Link
          className="text-primary hover:underline hover:underline-offset-4"
          href={`mailto:${row.getValue("mail")}`}
        >
          {row.getValue("mail")}
        </Link>
      </TableCell>
    ),
    header: ({ column }) => (
      <TableHead className="hidden md:table-cell">
        <DataTableColumnHeader column={column} title="E-Mail-Adresse" />
      </TableHead>
    ),
  },
];
