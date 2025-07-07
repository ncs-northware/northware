import { Headline } from "@northware/ui/components/headline";
import type { Meta, StoryObj } from "@storybook/nextjs";

/**
 * Die Headline Komponente soll verwendet werden, wenn eine Überschift gebrauch wird. Über den Property `level` kann gesteuert werden, welcher Überschriftstag gerendert wird (`h1` bis `h6`).
 * Hinter jedem `level` steht auch ein entsprechendes Styling.
 */

const meta = {
  title: "Components/Base/Headline",
  component: Headline,
  tags: ["autodocs"],
  args: { children: "The quick brown fox jumps over the lazy dog." },
} satisfies Meta<typeof Headline>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Überschrift1: Story = {
  args: { level: "h1" },
};

export const Überschrift2: Story = {
  args: { level: "h2" },
};

export const Überschrift3: Story = {
  args: { level: "h3" },
};

export const Überschrift4: Story = {
  args: { level: "h4" },
};

export const Überschrift5: Story = {
  args: { level: "h5" },
};

export const Überschrift6: Story = {
  args: { level: "h6" },
};
