import { PasswordInput } from "@northware/ui/components/password-input";
import type { Meta, StoryObj } from "@storybook/nextjs";

const meta = {
  title: "Components/PasswordInput",
  component: PasswordInput,
} satisfies Meta<typeof PasswordInput>;
export default meta;

type Story = StoryObj<typeof PasswordInput>;

export const Default: Story = {};
