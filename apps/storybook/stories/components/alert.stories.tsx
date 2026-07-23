import { AlertIcon, AlertWrapper } from "@northware/ui/components/custom-alert";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@northware/ui/components/shadcn/alert";
import { CheckCircle2Icon, Terminal } from "@northware/ui/icons/lucide";
import type { Meta, StoryObj } from "@storybook/nextjs";

const meta = {
  args: {
    variant: "default",
  },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "destructive", "info", "success", "warning"],
    },
  },
  component: AlertWrapper,

  render: (args) => (
    <AlertWrapper {...args}>
      <AlertTitle>Übrigens...</AlertTitle>
      <AlertDescription>
        Du kannst Komponenten mit der shadcn CLI hinzufügen.
      </AlertDescription>
    </AlertWrapper>
  ),
  title: "Components/Alert",
} satisfies Meta<typeof AlertWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Die Standard-Variante eines Alerts ohne Icon
 */
export const Default: Story = {};

/**
 * Mit der Variante `info` können informative Alerts angezeigt werden
 */
export const Info: Story = {
  args: {
    variant: "info",
  },
  render: (args) => (
    <AlertWrapper {...args}>
      <AlertTitle>Nur zu deiner Information</AlertTitle>
      <AlertDescription>Es wurden 15 Ergebnisse gefunden.</AlertDescription>
    </AlertWrapper>
  ),
};

/**
 * Mit der Variante `destructive` können Alerts angezeigt werden, die einen Fehler melden
 */
export const Destructive: Story = {
  args: {
    variant: "destructive",
  },
  render: (args) => (
    <AlertWrapper {...args}>
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Die Session ist abgelaufen. Bitte melde dich erneut an.
      </AlertDescription>
    </AlertWrapper>
  ),
};

/**
 * Die Variante `success` zeigt, das eine Aktion erfolgreich war.
 */
export const Success: Story = {
  args: {
    variant: "success",
  },
  render: (args) => (
    <AlertWrapper {...args}>
      <AlertIcon variant="success" />
      <AlertTitle>Super!</AlertTitle>
      <AlertDescription>
        Der Datensatz wurde erfolgreich gespeichert.
      </AlertDescription>
    </AlertWrapper>
  ),
};

/**
 * Mit der Variante `warning` kann der Nutzer gewarnt werden.
 */
export const Warning: Story = {
  args: {
    variant: "warning",
  },
  render: (args) => (
    <AlertWrapper {...args}>
      <AlertTitle>Achtung!</AlertTitle>
      <AlertDescription>
        Zu den eingegebenen Suchbegriffen wurden keine Ergebnisse gefunden.
      </AlertDescription>
    </AlertWrapper>
  ),
};

/**
 * Dieser Alert nutzt die Komponente `AlertIcon`
 */

export const WithAlertIcon: Story = {
  args: {
    variant: "default",
  },
  render: (args) => (
    <AlertWrapper {...args}>
      <AlertIcon variant={args.variant || "default"} />
      <AlertTitle>Übrigens...</AlertTitle>
      <AlertDescription>
        Du kannst Komponenten mit der shadcn CLI hinzufügen.
      </AlertDescription>
    </AlertWrapper>
  ),
};

/**
 * Dieser Alert nutzt die ein anderes Icon von Lucide.
 */

export const WithCustomIcon: Story = {
  args: {
    variant: "default",
  },
  render: (args) => (
    <AlertWrapper {...args}>
      <Terminal className="size-4" />
      <AlertTitle>Übrigens...</AlertTitle>
      <AlertDescription>
        Du kannst Komponenten mit der shadcn CLI hinzufügen.
      </AlertDescription>
    </AlertWrapper>
  ),
};

/**
 * Dieser Alert nutzt die `Alert` Komponente von shadcn
 */

export const ShadcnDefault: Story = {
  render: () => (
    <Alert>
      <CheckCircle2Icon />
      <AlertTitle>Super!</AlertTitle>
      <AlertDescription>
        Der Datensatz wurde erfolgreich gespeichert.
      </AlertDescription>
    </Alert>
  ),
};
