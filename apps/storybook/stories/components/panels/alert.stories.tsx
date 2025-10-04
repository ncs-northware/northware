import { AlertIcon, AlertWrapper } from "@northware/ui/components/custom-alert";
import {
  AlertDescription,
  AlertTitle,
} from "@northware/ui/components/shadcn/alert";
import { Terminal } from "@northware/ui/icons/lucide";
import type { Meta, StoryObj } from "@storybook/nextjs";

const meta = {
  title: "Components/Panels/Alert",
  component: AlertWrapper,
  argTypes: {
    variant: {
      options: ["default", "destructive", "info", "success", "warning"],
      control: { type: "select" },
    },
  },
  args: {
    variant: "default",
  },

  render: (args) => (
    <AlertWrapper {...args}>
      <AlertTitle>Übrigens...</AlertTitle>
      <AlertDescription>
        Du kannst Komponenten mit der shadcn CLI hinzufügen.
      </AlertDescription>
    </AlertWrapper>
  ),
} satisfies Meta<typeof AlertWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Die Standard-Variante eines Alerts
 */
export const Default: Story = {};

/**
 * Mit der Variante `info` können informative Alerts angezeigt werden
 */
export const Info: Story = {
  render: (args) => (
    <AlertWrapper {...args}>
      <AlertTitle>Nur zu deiner Information</AlertTitle>
      <AlertDescription>Es wurden 15 Ergebnisse gefunden.</AlertDescription>
    </AlertWrapper>
  ),
  args: {
    variant: "info",
  },
};

/**
 * Mit der Variante `destructive` können Alerts angezeigt werden, die einen Fehler melden
 */
export const Danger: Story = {
  render: (args) => (
    <AlertWrapper {...args}>
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Die Session ist abgelaufen. Bitte melde dich erneut an.
      </AlertDescription>
    </AlertWrapper>
  ),
  args: {
    variant: "destructive",
  },
};

/**
 * Die Variante `success` zeigt, das eine Aktion erfolgreich war.
 */
export const Sucess: Story = {
  render: (args) => (
    <AlertWrapper {...args}>
      <AlertTitle>Super!</AlertTitle>
      <AlertDescription>
        Der Datensatz wurde erfolgreich gespeichert.
      </AlertDescription>
    </AlertWrapper>
  ),
  args: {
    variant: "success",
  },
};

/**
 * Mit der Variante `warning` kann der Nutzer gewarnt werden.
 */
export const Warning: Story = {
  render: (args) => (
    <AlertWrapper {...args}>
      <AlertTitle>Achtung!</AlertTitle>
      <AlertDescription>
        Zu den eingegebenen Suchbegriffen wurden keine Ergebnisse gefunden.
      </AlertDescription>
    </AlertWrapper>
  ),
  args: {
    variant: "warning",
  },
};

export const WithAlertIcon: Story = {
  render: (args) => (
    <AlertWrapper {...args}>
      <AlertIcon variant={args.variant || "default"} />
      <AlertTitle>Übrigens...</AlertTitle>
      <AlertDescription>
        Du kannst Komponenten mit der shadcn CLI hinzufügen.
      </AlertDescription>
    </AlertWrapper>
  ),
  args: {
    variant: "default",
  },
};

export const WithCustomIcon: Story = {
  render: (args) => (
    <AlertWrapper {...args}>
      <Terminal className="size-4" />
      <AlertTitle>Übrigens...</AlertTitle>
      <AlertDescription>
        Du kannst Komponenten mit der shadcn CLI hinzufügen.
      </AlertDescription>
    </AlertWrapper>
  ),
  args: {
    variant: "default",
  },
};
