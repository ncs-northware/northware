import { BrandIcon } from "@northware/ui/components/base/brand";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Base/BrandIcon",
  component: BrandIcon,
  argTypes: {
    service: {
      control: { type: "select" },
      options: ["cockpit", "trader", "finance"],
    },
  },
  args: {
    service: "cockpit",
    className: "h-20",
  },
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof BrandIcon>;

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

export const Admin: Story = {
  args: { service: "admin" },
};
