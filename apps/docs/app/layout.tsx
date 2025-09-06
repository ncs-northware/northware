import "@/app/global.css";
import { Brand } from "@northware/ui/components/brand";
import { fonts } from "@northware/ui/lib/fonts";
import { DocsLayout } from "fumadocs-ui/layouts/notebook";
import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { RootProvider } from "fumadocs-ui/provider";
import { source } from "@/lib/source";
import { ReactNode } from "react";

const baseOptions: BaseLayoutProps = {
  githubUrl: "https://github.com/ncs-northware/northware",
    nav: {
      title: <Brand service="docs" />,
      
    },
    // see https://fumadocs.dev/docs/ui/navigation/links
    links: [],
}

export default function Layout({ children }: {readonly children: ReactNode}) {
  return (
    <html lang="de" suppressHydrationWarning className="theme-cockpit">
      <body className={`flex min-h-screen flex-col ${fonts}`}>
        <RootProvider>
          <DocsLayout tree={source.pageTree} {...baseOptions} sidebar={{ collapsible: false, tabs: [
            {title: "General", url: "/"},
            {title: "Apps", url: "/apps"},
            {title: "Packages", url: "/packages"},
          ]}}
          tabMode="navbar" nav={{...baseOptions.nav, mode: "top"}}>
            {children}
          </DocsLayout>
        </RootProvider>
      </body>
    </html>
  );
}
