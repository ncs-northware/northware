import "@northware/ui/css";
import { GeneralProvider } from "@northware/ui/components/general-provider";
import { source_sans } from "@northware/ui/lib/fonts";

export const metadata = {
  title: {
    template: "%s | Northware Admin",
    default: "Northware Admin",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="theme-admin" lang="de" suppressHydrationWarning>
      <body className={`${source_sans.variable} font-sans`}>
        <GeneralProvider>{children}</GeneralProvider>
      </body>
    </html>
  );
}
