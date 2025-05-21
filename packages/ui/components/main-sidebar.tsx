import { currentUser } from "@northware/auth/server";
import type { ServiceType } from "@northware/service-config";
import { NavMain } from "@northware/ui/components/nav-main";
import { NavUser } from "@northware/ui/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@northware/ui/components/sidebar";
import { TeamSwitcher } from "@northware/ui/components/team-switcher";
import { menuData } from "@northware/ui/lib/menu-data";

interface MainSidebarType extends React.ComponentProps<typeof Sidebar> {
  service: ServiceType;
}

export async function MainSidebar({ service, ...props }: MainSidebarType) {
  const user = await currentUser();
  const menuItems = await menuData(service, user?.id);
  return (
    <Sidebar {...props} variant="inset" collapsible="offcanvas">
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain menuItems={menuItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          fullName={user?.fullName}
          emailAddress={user?.emailAddresses[0].emailAddress}
          avatar={user?.imageUrl}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
