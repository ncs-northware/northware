import { Headline } from "@northware/ui/components/headline";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@northware/ui/components/shadcn/tabs";
import { SidebarLayout } from "@northware/ui/components/sidebar-layout";
import { getMenuItems } from "./actions";
import { MenuList } from "./menu-list";

export default async function Page() {
  const menu = await getMenuItems();
  console.log(menu);
  return (
    <SidebarLayout
      breadcrumbs={[
        { label: "Admin Panel", href: "/admin" },
        { label: "Menüs bearbeiten", href: "/admin/edit-menus", active: true },
      ]}
      service="cockpit"
    >
      <Headline level="h1">Menüs bearbeiten</Headline>
      <Tabs defaultValue="cockpit">
        <TabsList>
          <TabsTrigger value="cockpit">Northware Cockpit</TabsTrigger>
          <TabsTrigger value="finance">Northware Finance</TabsTrigger>
          <TabsTrigger value="trader">Northware Trader</TabsTrigger>
        </TabsList>
        <TabsContent value="cockpit">
          <MenuList />
        </TabsContent>
      </Tabs>
    </SidebarLayout>
  );
}
