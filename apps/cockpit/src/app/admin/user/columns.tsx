"use client";

import {
  DataTableColumnHeader,
  TableDescriptionElement,
  TableDescriptionList,
  TableDescriptionTerm,
} from "@northware/ui/components/data-table";
import { TableCell, TableHead } from "@northware/ui/components/shadcn/table";
import type { ColumnDef } from "@tanstack/react-table";

export interface UserRow {
  email: string | undefined;
  fullName: string | null;
  id: string;
  username: string | null;
}

export const columns: ColumnDef<UserRow>[] = [
  {
    accessorKey: "fullName",
    cell: ({ row }) => (
      <TableCell className="w-full max-w-0 font-medium sm:w-auto sm:max-w-none">
        {row.original.fullName}
        <TableDescriptionList className="lg:hidden">
          <TableDescriptionTerm>E-Mail Adresse</TableDescriptionTerm>
          <TableDescriptionElement className="text-muted-foreground">
            {row.original.email}
          </TableDescriptionElement>
          <TableDescriptionTerm>Benutzername</TableDescriptionTerm>
          <TableDescriptionElement className="text-muted-foreground sm:hidden">
            {row.original.username}
          </TableDescriptionElement>
        </TableDescriptionList>
      </TableCell>
    ),
    header: ({ column }) => (
      <TableHead>
        <DataTableColumnHeader column={column} title="Name" />
      </TableHead>
    ),
  },
  {
    accessorKey: "email",
    cell: ({ row }) => (
      <TableCell className="hidden truncate lg:table-cell">
        {row.original.email}
      </TableCell>
    ),
    header: ({ column }) => (
      <TableHead className="hidden lg:table-cell">
        <DataTableColumnHeader column={column} title="E-Mail Adresse" />
      </TableHead>
    ),
  },
  {
    accessorKey: "username",
    cell: ({ row }) => (
      <TableCell className="hidden sm:table-cell">
        {row.original.username}
      </TableCell>
    ),
    header: ({ column }) => (
      <TableHead className="hidden sm:table-cell">
        <DataTableColumnHeader column={column} title="Benutzername" />
      </TableHead>
    ),
  },
];
