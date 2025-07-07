import { Label } from "@northware/ui/components/label";
import { Switch } from "@northware/ui/components/switch";
import type { Meta, StoryObj } from "@storybook/nextjs";

const meta = {
  title: "Components/Form Parts/Switch",
  component: Switch,
  parameters: { layout: "centered" },
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Switch {...args} />
      <Label className="peer-disabled:text-foreground/50" htmlFor={args.id}>
        Airplane Mode
      </Label>
    </div>
  ),
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Die Standard-Fom des Switch
 */
export const Default: Story = {
  args: {
    id: "default-switch",
  },
};

/**
 * Um den Switch zu deaktivieren kann der `disabled` Prop verwendet werden.
 */
export const Disabled: Story = {
  args: {
    id: "disabled-switch",
    disabled: true,
  },
};
