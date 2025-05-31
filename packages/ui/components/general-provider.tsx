import { AuthProvider } from "@northware/auth/client";
import { Toaster } from "@northware/ui/components/sonner";
import { ThemeProvider } from "@northware/ui/components/theme-provider";
import { fonts } from "@northware/ui/lib/fonts";
import type { ThemeProviderProps } from "next-themes";

type GeneralProviderProperties = ThemeProviderProps;

export const GeneralProvider = ({
  children,
  ...properties
}: GeneralProviderProperties) => (
  <div className={fonts}>
    <ThemeProvider {...properties}>
      <AuthProvider>{children}</AuthProvider>
      <Toaster />
    </ThemeProvider>
  </div>
);
