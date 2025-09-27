/** biome-ignore-all lint/style/useNamingConvention: JSX Components */
import type { Meta, StoryObj } from "@storybook/nextjs";
import {
  DataTableColumnHeaderDemo,
  DataTableDemo,
  DataTableFilterDemo,
  DataTablePaginationDemo,
  DataTableSelectDemo,
  DataTableViewOptionsDemo,
} from "./data-table-demo";

const meta = {
  title: "Components/Panels/DataTable",
  component: DataTableDemo,
  subcomponents: {
    DataTablePaginationDemo,
    DataTableFilterDemo,
    DataTableViewOptionsDemo,
    DataTableColumnHeaderDemo,
    DataTableSelectDemo,
  },
} satisfies Meta<typeof DataTableDemo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Pagination: Story = {
  render: () => <DataTablePaginationDemo />,
};

export const Filter: Story = {
  render: () => <DataTableFilterDemo />,
};

export const ViewOptions: Story = {
  parameters: { layout: "centered" },
  render: () => <DataTableViewOptionsDemo />,
};

export const ColumnHeader: Story = {
  parameters: { layout: "centered" },
  render: () => <DataTableColumnHeaderDemo />,
};

export const RowSelect: Story = {
  render: () => <DataTableSelectDemo />,
};
