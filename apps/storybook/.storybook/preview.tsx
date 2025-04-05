import type { Preview } from "@storybook/react";
// biome-ignore lint/correctness/noUnusedImports: React has to be imported to use jsx in this file.
import React from "react";
import "@northware/ui/css";
import { StorybookThemeProvider } from "@northware/ui/components/providers/theme-provider";
import { source_sans } from "@northware/ui/lib/fonts";
import { withThemeByClassName } from "@storybook/addon-themes";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },

  decorators: [
    withThemeByClassName({
      themes: {
        cockpitLight: "cockpit-light",
        cockpitDark: "cockpit-dark",
        financeLight: "finance-light",
        financeDark: "finance-dark",
        traderLight: "trader-light",
        traderDark: "trader-dark",
      },
      defaultTheme: "cockpit-light",
    }),
    (Story, context) => {
      return (
        <div className={`bg-background ${source_sans.variable} p-2 font-sans`}>
          <StorybookThemeProvider>
            <Story {...context} />
          </StorybookThemeProvider>
        </div>
      );
    },
  ],
};

export default preview;
