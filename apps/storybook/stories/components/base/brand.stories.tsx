import { Brand } from "@northware/ui/components/base/brand";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Base/Brand",
  component: Brand,
  argTypes: {
    service: {
      control: { type: "select" },
      options: ["cockpit", "trader", "finance", "admin"],
    },
  },
  args: {
    service: "cockpit",
  },
} satisfies Meta<typeof Brand>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Cockpit: Story = {
  args: { service: "cockpit" },
};

export const Finance: Story = {
  args: { service: "finance" },
};

export const Trader: Story = {
  args: { service: "trader" },
};
