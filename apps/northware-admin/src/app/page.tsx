import { Headline } from "@northware/ui/components/headline";
import { SidebarLayout } from "@northware/ui/components/sidebar-layout";
export default function DashboardPage() {
  return (
    <SidebarLayout service="admin">
      <Headline level="h1">Dashboard Home</Headline>
    </SidebarLayout>
  );
}
