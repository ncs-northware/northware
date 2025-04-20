import { Button } from "@northware/ui/components/base/button";
import { Input } from "@northware/ui/components/form-parts/input";
import { Label } from "@northware/ui/components/form-parts/label";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Form Parts/Input",
  component: Input,
  argTypes: {},
  args: {
    type: "email",
    placeholder: "Email",
    disabled: false,
    className: "w-96",
  },
  parameters: { layout: "centered" },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Die Standard-Form eines Inputs
 */
export const Default: Story = {};

/**
 * Ein Input-Feld mit dem Dateien von der Festplatte ausgewählt werden können
 */
export const File: Story = {
  args: { type: "file" },
};
/**
 * Das `disabled` Prop kann genutzt werden, um das Eingabefeld nicht interaktiv
 * zu machen und es verblasst erscheinen zu lassen, was darauf hinweist, dass
 * derzeit keine Eingabe akzeptiert wird.
 */
export const Disabled: Story = {
  args: { disabled: true },
};

/**
 * Die `Label` Komponente kann genutzt werden um ein klares beschreibendes Label über
 * oder neben dem Input-Feld anzuzeigen, um den User zu unterstützen.
 */
export const WithLabel: Story = {
  render: (args) => (
    <div className="grid items-center gap-1.5">
      <Label htmlFor="email">{args.placeholder}</Label>
      <Input {...args} id="email" />
    </div>
  ),
};

/**
 * Um weitere Anweisungen oder Informationen an den User zu geben,
 * kann ein Text-Element unter dem Input-Feld genutzt werden.
 */
export const WithHelperText: Story = {
  render: (args) => (
    <div className="grid items-center gap-1.5">
      <label htmlFor="email-2">{args.placeholder}</label>
      <Input {...args} id="email-2" />
      <p className="text-foreground/50 text-sm">Enter your email address.</p>
    </div>
  ),
};

/**
 * Die `Button` Komponente kann genutzt werden, um zu zeigen, dass das Input-Feld
 * als Teil einer Action verwendet werden kann.
 */
export const WithButton: Story = {
  render: (args) => (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input {...args} />
      <Button variant="default" type="submit">
        Subscribe
      </Button>
    </div>
  ),
};
