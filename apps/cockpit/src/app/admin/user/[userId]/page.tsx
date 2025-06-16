import {
  EditPasswordFormDialog,
  EditUserForm,
  UserEmailList,
} from "@/components/user-forms";
import { getSingleUser } from "@/lib/user-actions";
import { Headline } from "@northware/ui/components/headline";

export default async function EditUserPage({
  params,
}: { params: Promise<{ userId: string }> }) {
  const { userId } = await params;
  const user = await getSingleUser(userId);

  return (
    <>
      <div className="flex justify-between gap-4">
        <div>
          <Headline level="h1">Benutzerdaten</Headline>
          <p className="mb-4 text-justify font-medium text-muted-foreground">
            Ein Benutzerkonto ist eine digitale Identität, mit der sich eine
            Person in den Northware Apps authentifizieren können.
          </p>
          <p className="mb-4 text-justify font-medium text-muted-foreground">
            Jedes Benutzerkonto besteht aus einem Butzernamen und einem
            Passwort. Die Benutzer sind mit einer E-Mail Adresse registriert und
            es sind ebenfalls Vor- und Nachname bzw. öffentliche Bezeichnungen
            der Benutzer gespeichert.
          </p>
        </div>
        <EditPasswordFormDialog id={user?.id} />
      </div>
      <EditUserForm user={user} />
      <Headline level="h2">E-Mail Adressen</Headline>
      <UserEmailList
        userId={user?.id}
        data={user?.emailAddresses}
        primaryEmailAddressId={user?.primaryEmailAddressId}
      />
    </>
  );
}
