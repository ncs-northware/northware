import { storybookThemes } from "@northware/service-config";
import type { Preview } from "@storybook/react";
// biome-ignore lint/correctness/noUnusedImports: React has to be imported to use jsx in this file.
import React from "react";
import "@northware/ui/css";
import { source_sans } from "@northware/ui/lib/fonts";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    themes: {
      default: storybookThemes.default,
      values: storybookThemes.items,
    },
  },
  globalTypes: {
    theme: {
      name: "Theme",
      description: "App Theme for Components",
      defaultValue: storybookThemes.default,
      toolbar: {
        icon: "paintbrush",
        items: storybookThemes.items,
        showName: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme =
        context.parameters.themes?.values.find(
          (t) => t.value === context.globals.theme
        )?.value ||
        context.parameters.themes?.default ||
        "theme-cockpit";

      return (
        <div
          className={`bg-background ${theme} ${source_sans.variable} p-2 font-sans`}
        >
          <Story {...context} />
        </div>
      );
    },
  ],
};

export default preview;
