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
        CockpitLight: "CockpitLight",
        CockpitDark: "CockpitDark",
        FinanceLight: "FinanceLight",
        FinanceDark: "FinanceDark",
        TraderLight: "TraderLight",
        TraderDark: "TraderDark",
      },
      defaultTheme: "CockpitLight",
    }),
    (Story) => {
      return (
        <div className={`bg-background ${source_sans.variable} p-2 font-sans`}>
          <StorybookThemeProvider>
            <Story />
          </StorybookThemeProvider>
        </div>
      );
    },
  ],
};

export default preview;
