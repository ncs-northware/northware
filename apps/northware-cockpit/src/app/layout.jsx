import "./globals.css";
import "@northware/ui/styles.css";
import { source_sans } from "@northware/ui/fonts";

export const metadata = {
  title: {
    template: "%s | Northware Cockpit",
    default: "Northware Cockpit",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <body>
        <main className={`${source_sans.variable} font-sans container`}>
          {children}
        </main>
      </body>
    </html>
  );
}
