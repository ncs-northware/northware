import { auth } from "@northware/auth/server";
import { Headline } from "@northware/ui/components/headline";
import { SidebarLayout } from "@northware/ui/components/sidebar-layout";
export default async function Page() {
  await auth.protect();
  return (
    <SidebarLayout service="cockpit">
      <Headline level="h1">Dashboard Home</Headline>
    </SidebarLayout>
  );
}
