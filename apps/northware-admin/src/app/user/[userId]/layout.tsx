import { getSingleUser } from "@/lib/user-actions";
import {
  type SidebarDataType,
  SidebarLayout,
} from "@northware/ui/components/layouts/sidebar-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@northware/ui/components/menu/breadcrumb";

export default async function UserLayout({
  children,
  params,
}: { children: React.ReactNode; params: Promise<{ userId: string }> }) {
  const { userId } = await params;
  const user = await getSingleUser(userId);

  const data: SidebarDataType = [
    {
      title: `${user?.fullName}`,
      items: [
        {
          title: "Benutzerdaten",
          url: "#",
        },
        {
          title: "Rollen",
          url: "#/roles",
        },
      ],
    },
  ];

  return (
    <SidebarLayout data={data} service="admin">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/user">Benutzerverwaltung</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{user?.fullName}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="pt-3">{children}</div>
    </SidebarLayout>
  );
}
