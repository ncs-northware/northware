import { Checkbox } from "@northware/ui/components/ui-registry/checkbox";
import { Label } from "@northware/ui/components/ui-registry/label";

import type { Meta, StoryObj } from "@storybook/nextjs";

const meta: Meta<typeof Checkbox> = {
  title: "Components/Form Parts/Checkbox",
  component: Checkbox,
  argTypes: {},
  args: {
    id: "terms",
    disabled: false,
  },
  render: (args) => (
    <div className="flex space-x-2">
      <Checkbox {...args} />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  ),
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Die Standard Checkbox mit einem Label
 */
export const Default: Story = {};

/**
 * Mit dem `disabled` Prop lässt sich die Checkbox deaktivieren.
 */
export const Disabled: Story = {
  args: {
    id: "disabled-terms",
    disabled: true,
  },
};
