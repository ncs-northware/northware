import { EditUserForm, UserEmailList } from "@/components/update-user-form";
import { getSingleUser } from "@/lib/user-actions";
import { Headline } from "@northware/ui/components/base/headline";

export default async function EditUserPage({
  params,
}: { params: Promise<{ userId: string }> }) {
  const { userId } = await params;
  const user = await getSingleUser(userId);

  return (
    <>
      <Headline level="h1">Benutzerdaten</Headline>
      <EditUserForm user={user} />
      <Headline level="h2">E-Mail Adressen</Headline>
      <UserEmailList
        data={user?.emailAddresses}
        primaryEmailAddressId={user?.primaryEmaiAddressId}
      />
    </>
  );
}
