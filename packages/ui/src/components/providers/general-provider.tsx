import { AuthProvider } from '@northware/auth/client';
import { ThemeProvider } from '@northware/ui/components/providers/theme-provider';
import type { ThemeProviderProps } from 'next-themes';

type GeneralProviderProperties = ThemeProviderProps;

export const GeneralProvider = ({
  children,
  ...properties
}: GeneralProviderProperties) => (
  <ThemeProvider {...properties}>
    <AuthProvider>{children}</AuthProvider>
  </ThemeProvider>
);
