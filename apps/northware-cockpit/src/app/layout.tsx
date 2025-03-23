import './globals.css';
import '@northware/ui/css';
import { UIProvider } from '@northware/ui/components/providers/ui-provider';
import { source_sans } from '@northware/ui/lib/fonts';
export const metadata = {
  title: {
    template: '%s | Northware Cockpit',
    default: 'Northware Cockpit',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="theme-cockpit" lang="de" suppressHydrationWarning>
      <body className={`${source_sans.variable} font-sans`}>
        <UIProvider>{children}</UIProvider>
      </body>
    </html>
  );
}
