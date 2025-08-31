import "@/app/global.css";
import { Brand } from "@northware/ui/components/brand";
import { fonts } from "@northware/ui/lib/fonts";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { RootProvider } from "fumadocs-ui/provider";
import { source } from "@/lib/source";

function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: <Brand service="docs" />,
    },
    // see https://fumadocs.dev/docs/ui/navigation/links
    links: [],
  };
}

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body className={`flex min-h-screen flex-col ${fonts}`}>
        <RootProvider>
          <DocsLayout tree={source.pageTree} {...baseOptions()}>
            {children}
          </DocsLayout>
        </RootProvider>
      </body>
    </html>
  );
}
