import { getUsers } from "@/lib/user-actions";
import { Button } from "@northware/ui/components/base/button";
import { Headline } from "@northware/ui/components/base/headline";
import { Container } from "@northware/ui/components/layouts/container";
import { DataTable } from "@northware/ui/components/panels/data-table";
import type { Metadata } from "next";
import Link from "next/link";
import { columns } from "./columns";

export const metadata: Metadata = { title: "Benutzerverwaltung" };

export default async function UserDashboard() {
  const userArray = (await getUsers()) || [];
  return (
    <Container service="admin">
      <div className="flex items-center justify-between">
        <Headline level="h1">Benutzerverwaltung</Headline>
        <Button variant="default">
          <Link href="user/create">Benutzer hinzufügen</Link>
        </Button>
      </div>
      <DataTable columns={columns} data={userArray} withRowSelect={false} />
    </Container>
  );
}
