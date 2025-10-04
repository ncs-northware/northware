import { Label } from "@northware/ui/components/shadcn/label";
import type { Meta, StoryObj } from "@storybook/nextjs";

const meta = {
  title: "Components/Form Parts/Label",
  component: Label,
  argTypes: {
    children: {
      control: { type: "text" },
    },
  },
  args: {
    children: "Your email address",
    htmlFor: "email",
  },
} satisfies Meta<typeof Label>;

export default meta;

type Story = StoryObj<typeof Label>;

export const Default: Story = {};
