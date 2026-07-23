"use client";

import {
  DataTableColumnHeader,
  TableDescriptionElement,
  TableDescriptionList,
  TableDescriptionTerm,
} from "@northware/ui/components/data-table";
import { TableCell, TableHead } from "@northware/ui/components/shadcn/table";
import type { ColumnDef } from "@tanstack/react-table";
import type { TRoleWithPermissions } from "@/lib/rbac-types";

export const columns: ColumnDef<TRoleWithPermissions>[] = [
  {
    accessorKey: "roleKey",
    cell: ({ row }) => (
      <TableCell>
        <span className="font-mono text-muted-foreground sm:text-foreground">
          {row.original.roleKey}
        </span>
        <TableDescriptionList className="sm:hidden">
          <TableDescriptionTerm>Rollenbezeichnung</TableDescriptionTerm>
          <TableDescriptionElement>
            {row.original.roleName}
          </TableDescriptionElement>
        </TableDescriptionList>
      </TableCell>
    ),
    header: ({ column }) => (
      <TableHead>
        <DataTableColumnHeader column={column} title="Schlüsselbezeichnung" />
      </TableHead>
    ),
  },
  {
    accessorKey: "roleName",
    cell: ({ row }) => (
      <TableCell className="hidden sm:table-cell">
        {row.original.roleName}
      </TableCell>
    ),
    header: ({ column }) => (
      <TableHead className="hidden sm:table-cell">
        <DataTableColumnHeader column={column} title="Rollenbezeichnung" />
      </TableHead>
    ),
  },
];
