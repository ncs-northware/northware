import { MainNav } from "@northware/ui/components/menu/main-nav";
import type { Meta, StoryObj } from "@storybook/react";
import { http, HttpResponse } from "msw";

const meta: Meta<typeof MainNav> = {
  component: MainNav,
};

export default meta;

type Story = StoryObj<typeof MainNav>;

const TestMenu = {
  topLevelItems: [
    {
      itemId: "sample/projects",
      title: "Projekte",
      href: "#",
      childOf: null,
      permissionKey: null,
    },
    {
      itemId: "sample/docs",
      title: "Dokumentation",
      href: "#",
      childOf: null,
      permissionKey: null,
    },
    {
      itemId: "sample/team",
      title: "Team",
      href: "#",
      childOf: null,
      permissionKey: null,
    },
    {
      itemId: "sample/account",
      title: "Account",
      href: "#",
      childOf: null,
      permissionKey: null,
    },
  ],
  childItems: [
    {
      itemId: "sample/docs/about",
      title: "Deshalb Northware",
      href: "#",
      childOf: "sample/docs",
      permissionKey: null,
    },
    {
      itemId: "sample/docs/tutorials",
      title: "Tutorials",
      href: "#",
      childOf: "sample/docs",
      permissionKey: null,
    },
    {
      itemId: "sample/docs/api",
      title: "API Reference",
      href: "#",
      childOf: "sample/docs",
      permissionKey: null,
    },
    {
      itemId: "sample/docs/changelog",
      title: "Changelog",
      href: "#",
      childOf: "sample/docs",
      permissionKey: null,
    },
  ],
};

const MockedMainNav: Story = {
  parameters: {
    msw: {
      handers: [
        http.get("", () => {
          return HttpResponse.json(TestMenu);
        }),
      ],
    },
  },
};
