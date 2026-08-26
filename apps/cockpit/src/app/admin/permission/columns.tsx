"use client";

import {
  DataTableColumnHeader,
  type DataTableFeatures,
  TableDescriptionElement,
  TableDescriptionList,
  TableDescriptionTerm,
} from "@northware/ui/components/data-table";
import { TableCell, TableHead } from "@northware/ui/components/shadcn/table";
import { createColumnHelper } from "@tanstack/react-table";
import type { TPermissionType } from "@/lib/rbac-types";

const columnHelper = createColumnHelper<DataTableFeatures, TPermissionType>();

export const columns = columnHelper.columns([
  columnHelper.accessor("permissionKey", {
    cell: ({ row }) => (
      <TableCell>
        <span className="font-mono text-muted-foreground sm:text-foreground">
          {row.original.permissionKey}
        </span>
        <TableDescriptionList className="sm:hidden">
          <TableDescriptionTerm>Bezeichnung</TableDescriptionTerm>
          <TableDescriptionElement>
            {row.original.permissionName}
          </TableDescriptionElement>
        </TableDescriptionList>
      </TableCell>
    ),
    header: ({ column }) => (
      <TableHead>
        <DataTableColumnHeader column={column} title="Berechtigungsschlüssel" />
      </TableHead>
    ),
  }),
  columnHelper.accessor("permissionName", {
    cell: ({ row }) => (
      <TableCell className="hidden sm:table-cell">
        {row.original.permissionName}
      </TableCell>
    ),
    header: ({ column }) => (
      <TableHead className="hidden sm:table-cell">
        <DataTableColumnHeader column={column} title="Bezeichnung" />
      </TableHead>
    ),
  }),
]);
