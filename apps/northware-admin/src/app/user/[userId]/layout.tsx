import {
  type SidebarDataType,
  SidebarLayout,
} from "@northware/ui/components/layouts/sidebar-layout";

const data: SidebarDataType = [
  {
    title: "Benutzer XY",
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

export default function UserLayout({
  children,
}: { children: React.ReactNode }) {
  return <SidebarLayout data={data} service="admin">{children}</SidebarLayout>;
}
