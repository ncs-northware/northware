import type { Preview } from "@storybook/react";
// biome-ignore lint/correctness/noUnusedImports: React has to be imported to use jsx in this file.
import React from "react";
import "@northware/ui/css";
import { ThemeProvider } from "@northware/ui/components/theme-provider";
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
    options: {
      storySort: {
        order: [
          "Northware UI",
          [
            "Über das Package",
            "Verwendung in einer App",
            "CSS-Theme",
            "Icons",
            "Utilities und Funktionen",
          ],
          "Components",
        ],
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
          <ThemeProvider
            defaultTheme="CockpitLight"
            enableSystem={false}
            themes={[
              "CockpitLight",
              "CockpitDark",
              "FinanceLight",
              "FinanceDark",
              "TraderLight",
              "TraderDark",
            ]}
          >
            <Story />
          </ThemeProvider>
        </div>
      );
    },
  ],
};

export default preview;
