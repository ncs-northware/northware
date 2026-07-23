import { BrandIcon } from "@northware/ui/components/brand";
import type { Meta, StoryObj } from "@storybook/nextjs";

const meta = {
  args: {
    className: "h-20",
    service: "cockpit",
  },
  argTypes: {
    service: {
      control: { type: "select" },
      options: ["cockpit", "trader", "finance", "docs"],
    },
  },
  component: BrandIcon,
  parameters: {
    layout: "centered",
  },
  title: "Components/BrandIcon",
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
