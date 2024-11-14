import "./globals.css";
import "@northware/ui/css";
import { source_sans } from "@northware/ui/fonts";

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
    <html lang="de">
      <body>
        <main className={`${source_sans.variable} container font-sans`}>
          {children}
        </main>
      </body>
    </html>
  );
}
