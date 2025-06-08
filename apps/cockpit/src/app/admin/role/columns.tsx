"use client";

import { RoleDeleteButton } from "@/components/role-forms";
import type { RoleWithPermissions } from "@/lib/user-actions";
import { Button } from "@northware/ui/components/button";
import { DataTableColumnHeader } from "@northware/ui/components/data-table";
import { EditIcon } from "@northware/ui/icons/lucide";
import type { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const columns: ColumnDef<RoleWithPermissions>[] = [
  {
    accessorKey: "roleKey",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Schlüsselbezeichnung" />
    ),
    cell: ({ row }) => (
      <span className="font-mono">{row.original.roleKey}</span>
    ),
  },
  {
    accessorKey: "roleName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Rollenbezeichnung" />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <div className="flex justify-end">
          <Button variant="ghost" asChild>
            {/* TODO: Nur mit Berechtigung update User */}
            <Link href={`role/${row.original.recordId}`}>
              <EditIcon />
            </Link>
          </Button>
          <RoleDeleteButton recordId={row.original.recordId} mode="list" />
        </div>
      );
    },
  },
];
