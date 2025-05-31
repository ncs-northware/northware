import "@northware/ui/css";
import { GeneralProvider } from "@northware/ui/components/general-provider";
import {} from "@northware/ui/lib/fonts";

export const metadata = {
  title: {
    template: "%s | Northware Cockpit",
    default: "Northware Cockpit",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="theme-cockpit" lang="de" suppressHydrationWarning>
      <body>
        <GeneralProvider>{children}</GeneralProvider>
      </body>
    </html>
  );
}
