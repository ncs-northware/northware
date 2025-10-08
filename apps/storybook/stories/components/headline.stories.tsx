import { Headline } from "@northware/ui/components/headline";
import type { Meta, StoryObj } from "@storybook/nextjs";

/**
 * Die Headline Komponente soll verwendet werden, wenn eine Überschift gebrauch wird. Über den Property `level` kann gesteuert werden, welcher Überschriftstag gerendert wird (`h1` bis `h6`).
 * Hinter jedem `level` steht auch ein entsprechendes Styling.
 */

const meta = {
  title: "Components/Headline",
  component: Headline,
  tags: ["autodocs"],
  args: { children: "The quick brown fox jumps over the lazy dog." },
} satisfies Meta<typeof Headline>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Headline1: Story = {
  args: { level: "h1" },
};

export const Headline2: Story = {
  args: { level: "h2" },
};

export const Headline3: Story = {
  args: { level: "h3" },
};

export const Headline4: Story = {
  args: { level: "h4" },
};

export const Headline5: Story = {
  args: { level: "h5" },
};

export const Headline6: Story = {
  args: { level: "h6" },
};
