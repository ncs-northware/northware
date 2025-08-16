"use client";

import {
  DataTableColumnHeader,
  TableDescriptionElement,
  TableDescriptionList,
  TableDescriptionTerm,
} from "@northware/ui/components/data-table";
import {
  TableCell,
  TableHead,
} from "@northware/ui/components/ui-registry/table";
import type { ColumnDef } from "@tanstack/react-table";

export type UserRow = {
  id: string;
  fullName: string | null;
  email: string | undefined;
  username: string | null;
};

export const columns: ColumnDef<UserRow>[] = [
  {
    accessorKey: "fullName",
    header: ({ column }) => (
      <TableHead>
        <DataTableColumnHeader column={column} title="Name" />
      </TableHead>
    ),
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
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <TableHead className="hidden lg:table-cell">
        <DataTableColumnHeader column={column} title="E-Mail Adresse" />
      </TableHead>
    ),
    cell: ({ row }) => (
      <TableCell className="hidden truncate lg:table-cell">
        {row.original.email}
      </TableCell>
    ),
  },
  {
    accessorKey: "username",
    header: ({ column }) => (
      <TableHead className="hidden sm:table-cell">
        <DataTableColumnHeader column={column} title="Benutzername" />
      </TableHead>
    ),
    cell: ({ row }) => (
      <TableCell className="hidden sm:table-cell">
        {row.original.username}
      </TableCell>
    ),
  },
];
