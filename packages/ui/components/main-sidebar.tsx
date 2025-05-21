import { currentUser } from "@northware/auth/server";
import { type ServiceType, suiteApps } from "@northware/service-config";
import { AppSwitch, type MenuApps } from "@northware/ui/components/app-switch";
import { NavMain } from "@northware/ui/components/nav-main";
import { NavUser } from "@northware/ui/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@northware/ui/components/sidebar";
import { menuData } from "@northware/ui/lib/menu-data";

interface MainSidebarType extends React.ComponentProps<typeof Sidebar> {
  service: ServiceType;
}

export async function MainSidebar({ service, ...props }: MainSidebarType) {
  const user = await currentUser();
  const menuItems = await menuData(service, user?.id);
  const apps: MenuApps[] = suiteApps.map((app) => {
    const envKey = `NEXT_PUBLIC_${app.slug.toUpperCase()}_URL`;
    const url = process.env[envKey as keyof typeof process.env];

    return {
      slug: app.slug,
      url: url,
    };
  });

  return (
    <Sidebar {...props} variant="inset" collapsible="offcanvas">
      <SidebarHeader>
        <AppSwitch service={service} apps={apps} />
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
