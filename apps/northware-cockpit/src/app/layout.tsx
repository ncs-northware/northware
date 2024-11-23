import "./globals.css";
import "@northware/ui/css";
import { source_sans } from "@northware/ui/fonts";
import { ThemeProvider } from "@northware/ui/components";

export const metadata = {
  title: {
    template: "%s | Northware Cockpit",
    default: "Northware Cockpit",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html className="theme-cockpit" lang="de" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <main className={`${source_sans.variable} container font-sans`}>
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
