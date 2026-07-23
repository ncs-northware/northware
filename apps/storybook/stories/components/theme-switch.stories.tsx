import { ThemeSwitch } from "@northware/ui/components/theme-switch";
import type { Meta, StoryObj } from "@storybook/nextjs";

const meta = {
  args: {
    className: "group storybook-lightTheme",
  },
  component: ThemeSwitch,
  parameters: { layout: "centered" },
  title: "Components/ThemeSwitch",
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
        labels: {
          "group storybook-darkTheme": "Dark Theme",
          "group storybook-lightTheme": "Light Theme",
        },
        type: "radio",
      },
      options: ["group storybook-lightTheme", "group storybook-darkTheme"],
    },
  },
};

/**
 * Der `ThemeSwitch` im Dark-Theme zeigt ein `SunIcon` um anzuzeigen, das zum Light-Theme gewechselt werden kann.
 */

export const Dark: Story = {
  args: { className: "group storybook-darkTheme" },
  argTypes: { ...Light.argTypes },
};
