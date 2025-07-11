import { Headline } from "@northware/ui/components/headline";
import {
  PermissionProvider,
  userHasPermission,
} from "@northware/ui/components/permission-provider";
import {
  UpdatePasswordFormDialog,
  UpdateUserForm,
  UserDeleteButton,
  UserEmailList,
} from "@/components/user-forms";
import { getSingleUser } from "@/lib/user-actions";

export default async function Page({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;
  const user = await getSingleUser(userId);

  if (user instanceof Error) {
    return "Es wurde keine Benutzer gefunden";
    // FIXME: globalError
  }

  return (
    <PermissionProvider permissionKeys={["cockpit::user.update"]}>
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
        <UpdatePasswordFormDialog id={user?.id} />
        {(await userHasPermission(["cockpit::user.delete"])) && (
          <UserDeleteButton mode="page" userId={user?.id || ""} />
        )}
      </div>
      <UpdateUserForm user={user} />
      <Headline level="h2">E-Mail Adressen</Headline>
      <UserEmailList
        data={user?.emailAddresses}
        primaryEmailAddressId={user?.primaryEmailAddressId}
        userId={user?.id}
      />
    </PermissionProvider>
  );
}
