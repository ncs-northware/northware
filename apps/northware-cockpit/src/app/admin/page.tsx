import { getUsers } from "@/lib/user-actions";
import { Button } from "@northware/ui/components/base/button";
import { Headline } from "@northware/ui/components/base/headline";
import { Container } from "@northware/ui/components/layouts/container";
import { PencilIcon } from "lucide-react";
import Link from "next/link";
export default async function AdminDashboard() {
  const userArray = await getUsers();
  return (
    <Container service="cockpit">
      <Headline level="h1">Admin Dashboard</Headline>
      <Button variant="default">
        <Link href="admin/user/create">Benutzer hinzufügen</Link>
      </Button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Nutzername</th>
            <th>E-Mail</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {userArray?.data.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>
                {user.firstName} {user.lastName}
              </td>
              <td>{user.username}</td>
              <td>{user.emailAddresses[0].emailAddress}</td>
              <td>
                <Button variant="link" size="icon">
                  <Link href={`/admin/user/${user.id}`}>
                    <PencilIcon />
                  </Link>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
}
