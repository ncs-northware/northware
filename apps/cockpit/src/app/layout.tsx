import "@northware/ui/css";
import { GeneralProvider } from "@northware/ui/components/general-provider";
import { fonts } from "@northware/ui/lib/fonts";

export const metadata = {
  title: {
    default: "Northware Cockpit",
    template: "%s | Northware Cockpit",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="theme-cockpit" lang="de" suppressHydrationWarning>
      <body className={fonts}>
        <GeneralProvider>{children}</GeneralProvider>
      </body>
    </html>
  );
}
