import { Button } from "@northware/ui/components/button";
import { Loader2, Mail } from "@northware/ui/icons/lucide";
import type { Meta, StoryObj } from "@storybook/nextjs";
import Link from "next/link";

/**
 * Zeigt einen Button oder eine Komponente, die wie ein Button aussieht.
 */
const meta = {
  title: "Components/Base/Button",
  component: Button,
  argTypes: {
    children: {
      control: "text",
    },
    variant: {
      control: "select",
      options: ["default", "outline", "secondary", "link", "ghost"],
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "icon"],
    },
  },
  parameters: {
    layout: "centered",
  },
  args: {
    variant: "default",
    size: "default",
    children: "Button",
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "Default / Primary",
};

export const Outline: Story = {
  args: {
    variant: "outline",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
  },
};

/**
 * Die Button-Variante `link` kann genutzt werden, wenn ein Button gerendert werden soll, der wie ein Link aussieht.
 */

export const LinkButton: Story = {
  args: {
    variant: "link",
  },
};

/**
 * Der `ghost` Button ist recht unauffällig und für weniger auffällige AKtionen gedacht.
 */

export const Ghost: Story = {
  args: {
    variant: "ghost",
  },
};

/**
 * Um zu zeigen, das eine Aktion ausgeführt wird und sich etwas im Loading-State befindet. kann ein Loading-Icon
 * in den Button integriert und der `disabled` Property verwendet werden, damit der User während des Loading nicht weiter interagiert.
 */

export const Loading: Story = {
  render: (args) => (
    <Button {...args}>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Button
    </Button>
  ),
  args: {
    ...Outline.args,
    disabled: true,
  },
};

export const WithIcon: Story = {
  render: (args) => (
    <Button {...args}>
      <Mail className="mr-2 h-4 w-4" /> Login with Email Button
    </Button>
  ),
  args: {
    ...Secondary.args,
  },
};

/** Ein etwas kleinerer Button */

export const Small: Story = {
  args: {
    size: "sm",
  },
};

/** Ein etwas größerer Button */

export const Large: Story = {
  args: {
    size: "lg",
  },
};

/** Ein Button, der an ein einzelnes Icon angepasst ist */

export const Icon: Story = {
  args: {
    ...Secondary.args,
    size: "icon",
    children: <Mail />,
  },
};

/** Um Interaktionen mit dem Button zu verhindern kann `disabled` verwendet werden */

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

/**
 * Wenn die `Button` Komponente andere Elemente umschließen soll kann der `asChild` Parameter verwendet werden.
 */

export const AsChild = () => {
  return (
    <Button asChild>
      <Link href="#">Link Child</Link>
    </Button>
  );
};
