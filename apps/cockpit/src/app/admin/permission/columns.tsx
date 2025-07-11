"use client";

import { DataTableColumnHeader } from "@northware/ui/components/data-table";
import type { ColumnDef } from "@tanstack/react-table";
import {
  PermissionDeleteButton,
  UpdatePermissionDetails,
} from "@/components/role-forms";
import type { TPermissionType } from "@/lib/rbac-types";

export const columns: ColumnDef<TPermissionType>[] = [
  {
    accessorKey: "permissionKey",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Berechtigungsschlüssel" />
    ),
    cell: ({ row }) => (
      <span className="font-mono">{row.original.permissionKey}</span>
    ),
  },
  {
    accessorKey: "permissionName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Bezeichnung" />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <div className="flex justify-end">
          {/* TODO: Nur mit entsprechenden Berechtigungen */}
          <UpdatePermissionDetails permissionDetails={row.original} />
          <PermissionDeleteButton recordId={row.original.recordId} />
        </div>
      );
    },
  },
];
