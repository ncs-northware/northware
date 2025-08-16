"use client";

import { DataTableColumnHeader } from "@northware/ui/components/data-table";
import {
  TableCell,
  TableHead,
} from "@northware/ui/components/ui-registry/table";
import type { ColumnDef } from "@tanstack/react-table";
import type { TPermissionType } from "@/lib/rbac-types";

export const columns: ColumnDef<TPermissionType>[] = [
  {
    accessorKey: "permissionKey",
    header: ({ column }) => (
      <TableHead>
        <DataTableColumnHeader column={column} title="Berechtigungsschlüssel" />
      </TableHead>
    ),
    cell: ({ row }) => (
      <TableCell>
        <span className="font-mono">{row.original.permissionKey}</span>
      </TableCell>
    ),
  },
  {
    accessorKey: "permissionName",
    header: ({ column }) => (
      <TableHead>
        <DataTableColumnHeader column={column} title="Bezeichnung" />
      </TableHead>
    ),
    cell: ({ row }) => <TableCell>{row.original.permissionName}</TableCell>,
  },
];
