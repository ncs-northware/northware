"use client";

import {
  DataTableColumnHeader,
  DataTableSelectCell,
  DataTableSelectHeader,
} from "@northware/ui/components/data-table";
import { Button } from "@northware/ui/components/ui-registry/button";
import {
  TableCell,
  TableHead,
} from "@northware/ui/components/ui-registry/table";
import { TrashIcon } from "@northware/ui/icons/lucide";
import type { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export type Payment = {
  id: number;
  name: string;
  title: string;
  email: string;
  role: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <TableHead>
        <DataTableSelectHeader table={table} />
      </TableHead>
    ),
    cell: ({ row }) => (
      <TableCell>
        <DataTableSelectCell row={row} />
      </TableCell>
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "name",
    header: ({ column }) => (
      <TableHead>
        <DataTableColumnHeader column={column} title="Name" />
      </TableHead>
    ),
    cell: ({ row }) => (
      <TableCell className="w-full max-w-0 py-4 pr-3.5 pl-4 font-medium text-sm sm:w-auto sm:max-w-none sm:pl-0">
        {row.original.name}
        {/* Diese DL wird nur auf Bildschirmen kleiner als 'lg' (Large) angezeigt */}
        <dl className="font-normal lg:hidden">
          <dt className="sr-only">Title</dt>
          <dd className="mt-1">{row.original.title}</dd>
          <dt className="sr-only">Email</dt>
          {/* Diese DD wird nur auf Bildschirmen kleiner als 'sm' (Small) angezeigt */}
          <dd className="mt-1 sm:hidden">{row.original.email}</dd>
        </dl>
      </TableCell>
    ),
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <TableHead className="hidden lg:table-cell">
        <DataTableColumnHeader column={column} title="Title" />
      </TableHead>
    ),
    cell: ({ row }) => (
      <TableCell className="hidden lg:table-cell">
        {row.original.title}
      </TableCell>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <TableHead className="hidden sm:table-cell">
        <DataTableColumnHeader column={column} title="Email" />
      </TableHead>
    ),
    cell: ({ row }) => (
      <TableCell className="hidden truncate sm:table-cell">
        {row.original.email}
      </TableCell>
    ),
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <TableHead>
        <DataTableColumnHeader column={column} title="Role" />
      </TableHead>
    ),
    cell: ({ row }) => <TableCell>{row.original.role}</TableCell>,
  },

  {
    id: "actions",
    header: () => (
      <TableHead className="relative">
        <span className="sr-only">Edit</span>
      </TableHead>
    ),
    cell: ({ row }) => {
      return (
        <TableCell>
          <Button asChild variant="ghost">
            <Link href={`user/${row.original.id}`}>
              <TrashIcon />
            </Link>
          </Button>
        </TableCell>
      );
    },
  },
];
