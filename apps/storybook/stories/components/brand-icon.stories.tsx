import { BrandIcon } from "@northware/ui/components/brand";
import type { Meta, StoryObj } from "@storybook/nextjs";

const meta = {
  title: "Components/BrandIcon",
  component: BrandIcon,
  argTypes: {
    service: {
      control: { type: "select" },
      options: ["cockpit", "trader", "finance", "docs"],
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
export const DocsBrand: Story = {
  args: { service: "docs" },
};
