import { AuthProvider } from '@northware/auth/clerk';
import { ThemeProvider } from '@northware/ui/components/providers/theme-provider';
import type { ThemeProviderProps } from 'next-themes';

type UIProviderProperties = ThemeProviderProps;

export const UIProvider = ({
  children,
  ...properties
}: UIProviderProperties) => (
  <ThemeProvider {...properties}>
    <AuthProvider>{children}</AuthProvider>
  </ThemeProvider>
);
