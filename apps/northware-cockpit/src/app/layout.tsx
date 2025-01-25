import './globals.css';
import '@northware/ui/css';
import { ClerkProvider } from '@clerk/nextjs';
import { ThemeProvider } from '@northware/ui/components';
import { source_sans } from '@northware/ui/lib';

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
    <ClerkProvider>
      <html className="theme-cockpit" lang="de" suppressHydrationWarning>
        <body className={`${source_sans.variable} font-sans`}>
          <ThemeProvider>{children}</ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
