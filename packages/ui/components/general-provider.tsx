import { AuthProvider } from "@northware/auth/client";
import { ThemeProvider } from "@northware/ui/components/theme-provider";
import { Toaster } from "@northware/ui/components/ui-registry/sonner";
import type { ThemeProviderProps } from "next-themes";

type GeneralProviderProperties = ThemeProviderProps;

export const GeneralProvider = ({
  children,
  ...properties
}: GeneralProviderProperties) => (
  <ThemeProvider {...properties}>
    <AuthProvider>{children}</AuthProvider>
    <Toaster />
  </ThemeProvider>
);
