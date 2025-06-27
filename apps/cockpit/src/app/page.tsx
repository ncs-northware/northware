import { Headline } from "@northware/ui/components/headline";
import { SidebarLayout } from "@northware/ui/components/sidebar-layout";
export default function Page() {
  return (
    <SidebarLayout service="cockpit">
      <Headline level="h1">Dashboard Home</Headline>
    </SidebarLayout>
  );
}
