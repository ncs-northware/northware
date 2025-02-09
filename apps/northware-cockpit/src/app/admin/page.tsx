import { getUsers } from '@/lib/user-actions';
import { Button, Container, Headline } from '@northware/ui/components';
import Link from 'next/link';

export default async function UsersPage() {
  const userArray = await getUsers();
  return (
    <Container service="cockpit">
      <Headline level="h1">Admin Dashboard</Headline>
      <Button variant="default">
        <Link href="admin/create-user">Benutzer hinzufügen</Link>
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
              <td>Buttons</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
}
