"use client";

import { DataTableColumnHeader } from "@northware/ui/components/data-table";
import { Button } from "@northware/ui/components/ui-registry/button";
import { EditIcon } from "@northware/ui/icons/lucide";
import type { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { RoleDeleteButton } from "@/components/role-forms";
import type { TRoleWithPermissions } from "@/lib/rbac-types";

export const columns: ColumnDef<TRoleWithPermissions>[] = [
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
          <Button asChild size="icon" variant="ghost">
            {/* TODO: Nur mit Berechtigung update Role */}
            <Link href={`role/${row.original.recordId}`}>
              <EditIcon />
            </Link>
          </Button>
          <RoleDeleteButton mode="list" recordId={row.original.recordId} />
        </div>
      );
    },
  },
];
