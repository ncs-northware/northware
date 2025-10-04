import { AuthProvider } from "@northware/auth/client";
import { Toaster } from "@northware/ui/components/shadcn/sonner";
import { ThemeProvider } from "@northware/ui/components/theme-provider";
import type { ThemeProviderProps } from "next-themes";

type GeneralProviderProperties = ThemeProviderProps;

export const GeneralProvider = ({
  children,
  ...properties
}: GeneralProviderProperties) => (
  <ThemeProvider {...properties}>
    <AuthProvider>{children}</AuthProvider>
    <Toaster richColors />
  </ThemeProvider>
);
