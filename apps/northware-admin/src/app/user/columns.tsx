"use client";

import { Button } from "@northware/ui/components/base/button";
import { DataTableColumnHeader } from "@northware/ui/components/panels/data-table";
import { EditIcon, TrashIcon } from "@northware/ui/icons/lucide";
import type { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export type UserRow = {
  id: string;
  fullName: string | null;
  email: string;
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
          <Button variant="ghost" asChild>
            <Link href={`user/${row.original.id}`}>
              <EditIcon />
            </Link>
          </Button>
          <Button
            variant="ghost"
            className="text-danger hover:bg-danger/30 hover:text-danger"
          >
            <TrashIcon />
          </Button>
        </div>
      );
    },
  },
];
