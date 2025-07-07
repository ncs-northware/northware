import { navigationMenuButtonStyle } from "@northware/ui/components/navigation-menu";
import { ThemeSwitch } from "@northware/ui/components/theme-switch";
import type { Meta, StoryObj } from "@storybook/nextjs";

const meta = {
  title: "Components/Menu/ThemeSwitch",
  component: ThemeSwitch,
  parameters: { layout: "centered" },

  args: {
    className: "group storybook-lightTheme",
  },
} satisfies Meta<typeof ThemeSwitch>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Der `ThemeSwitch` im Light-Theme zeigt ein `MoonIcon` um anzuzeigen, das zum Dark-Theme gewechselt werden kann.
 */

export const Light: Story = {
  argTypes: {
    className: {
      control: {
        type: "radio",
        labels: {
          "group storybook-lightTheme": "Light Theme",
          "group storybook-darkTheme": "Dark Theme",
        },
      },
      options: ["group storybook-lightTheme", "group storybook-darkTheme"],
    },
  },
};

/**
 * Der `ThemeSwitch` im Dark-Theme zeigt ein `SunIcon` um anzuzeigen, das zum Light-Theme gewechselt werden kann.
 */

export const Dark: Story = {
  argTypes: { ...Light.argTypes },
  args: { className: "group storybook-darkTheme" },
};

/**
 * Der Property `variant` kann neben `ghost` auch `outline` lauten.
 * Dieses Property wird an den Button vererbt, sodass ein Button der Variante `outline` gezeigt wird.
 */

export const Outline: Story = {
  args: { variant: "outline" },
};

/**
 * Auf den `ThemeSwitch` kann auch das Property `withDescriptionText` angewendet werden.
 * So wird neben dem zugehörigen Theme angezeigt, was ein Klick auf den Button auslöst.
 */

export const WithDescriptionText: Story = {
  args: { withDescriptionText: true },
};

/**
 * Der `ThemeSwitch` lässt sich mit dem Property `className` weiter anpassen, da dieses Property an den Button weitergegeben wird.
 * In der Hauptnavigation auf dem Desktop wird `navigationMenuButtonStyle()` als `className` auf den `ThemeSwitch` angewendet.
 */

export const AsMainNavItem: Story = {
  args: {
    className: `${navigationMenuButtonStyle()} group storybook-lightTheme`,
  },
};
