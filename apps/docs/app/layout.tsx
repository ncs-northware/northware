import "@/app/global.css";
import { Brand } from "@northware/ui/components/brand";
import { fonts } from "@northware/ui/lib/fonts";
import { DocsLayout } from "fumadocs-ui/layouts/notebook";
import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { RootProvider } from "fumadocs-ui/provider";
import type { ReactNode } from "react";
import { source } from "@/lib/source";

const baseOptions: BaseLayoutProps = {
  githubUrl: "https://github.com/ncs-northware/northware",
  nav: {
    title: <Brand service="docs" />,
  },
  // see https://fumadocs.dev/docs/ui/navigation/links
  links: [],
};

export default function Layout({ children }: { readonly children: ReactNode }) {
  return (
    <html className="theme-cockpit" lang="de" suppressHydrationWarning>
      <body className={`flex min-h-screen flex-col ${fonts}`}>
        <RootProvider>
          <DocsLayout
            tree={source.pageTree}
            {...baseOptions}
            nav={{ ...baseOptions.nav, mode: "top" }}
            sidebar={{
              collapsible: false,
              tabs: [
                { title: "Home", url: "/" },
                { title: "Apps", url: "/apps" },
                { title: "Packages", url: "/packages" },
              ],
            }}
            tabMode="navbar"
          >
            {children}
          </DocsLayout>
        </RootProvider>
      </body>
    </html>
  );
}
