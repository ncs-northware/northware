import { ThemeSwitch } from "@northware/ui/components/theme-switch";
import type { Meta, StoryObj } from "@storybook/nextjs";

const meta = {
  title: "Components/ThemeSwitch",
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
