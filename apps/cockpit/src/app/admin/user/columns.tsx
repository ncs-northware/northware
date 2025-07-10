"use client";

import { DataTableColumnHeader } from "@northware/ui/components/data-table";
import { Button } from "@northware/ui/components/ui-registry/button";
import { EditIcon } from "@northware/ui/icons/lucide";
import type { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { UserDeleteButton } from "@/components/user-forms";

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
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="E-Mail" />
    ),
  },
  {
    accessorKey: "username",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Benutzername" />
    ),
  },

  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <div className="flex justify-end">
          <Button asChild variant="ghost">
            {/* TODO: Nur mit Berechtigung update User aber nicht wenn User all-access hat */}
            <Link href={`user/${row.original.id}`}>
              <EditIcon />
            </Link>
          </Button>
          {/* TODO Nur mit Berechtigung delete User aber nicht wenn User all-access hat */}
          <UserDeleteButton userId={row.original.id} />
        </div>
      );
    },
  },
];
