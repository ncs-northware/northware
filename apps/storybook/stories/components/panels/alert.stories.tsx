import type { Meta, StoryObj } from "@storybook/react";

import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@northware/ui/components/panels/alert";
import { Terminal } from "@northware/ui/icons/lucide";

const meta = {
  title: "Components/Panels/Alert",
  component: Alert,
  argTypes: {
    variant: {
      options: ["default", "danger", "info", "success", "warning"],
      control: { type: "select" },
    },
  },
  args: {
    variant: "default",
  },

  render: (args) => (
    <Alert {...args}>
      <AlertTitle>Übrigens...</AlertTitle>
      <AlertDescription>
        Du kannst Komponenten mit der shadcn CLI hinzufügen.
      </AlertDescription>
    </Alert>
  ),
} satisfies Meta<typeof Alert>;

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
    <Alert {...args}>
      <AlertTitle>Nur zu deiner Information</AlertTitle>
      <AlertDescription>Es wurden 15 Ergebnisse gefunden.</AlertDescription>
    </Alert>
  ),
  args: {
    variant: "info",
  },
};

/**
 * Mit der Variante `danger` können Alerts angezeigt werden, die einen Fehler melden
 */
export const Danger: Story = {
  render: (args) => (
    <Alert {...args}>
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Die Session ist abgelaufen. Bitte melde dich erneut an.
      </AlertDescription>
    </Alert>
  ),
  args: {
    variant: "danger",
  },
};

/**
 * Die Variante `success` zeigt, das eine Aktion erfolgreich war.
 */
export const Sucess: Story = {
  render: (args) => (
    <Alert {...args}>
      <AlertTitle>Super!</AlertTitle>
      <AlertDescription>
        Der Datensatz wurde erfolgreich gespeichert.
      </AlertDescription>
    </Alert>
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
    <Alert {...args}>
      <AlertTitle>Achtung!</AlertTitle>
      <AlertDescription>
        Zu den eingegebenen Suchbegriffen wurden keine Ergebnisse gefunden.
      </AlertDescription>
    </Alert>
  ),
  args: {
    variant: "warning",
  },
};

export const WithAlertIcon: Story = {
  render: (args) => (
    <Alert {...args}>
      <AlertIcon variant={args.variant || "default"} />
      <AlertTitle>Übrigens...</AlertTitle>
      <AlertDescription>
        Du kannst Komponenten mit der shadcn CLI hinzufügen.
      </AlertDescription>
    </Alert>
  ),
  args: {
    variant: "default",
  },
};

export const WithCustomIcon: Story = {
  render: (args) => (
    <Alert {...args}>
      <Terminal className="size-4" />
      <AlertTitle>Übrigens...</AlertTitle>
      <AlertDescription>
        Du kannst Komponenten mit der shadcn CLI hinzufügen.
      </AlertDescription>
    </Alert>
  ),
  args: {
    variant: "default",
  },
};
