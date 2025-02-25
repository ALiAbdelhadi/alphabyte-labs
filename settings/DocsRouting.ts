import type { Paths } from "@/lib/pageRoutes";

export const DocsRouting: Paths[] = [
  {
    heading: "Getting started",
    title: "Introduction",
    href: "/introduction",
    items: [
      {
        title: "Installation",
        href: "/installation",
      },
    ],
  },
  {
    spacer: true,
  },
  {
    href: "/components",
    title: "Components",
    items: [
      {
        title: "Button",
        href: "/button",
      },
      {
        title: "Code Block",
        href: "/code-block",
      },
      {
        title: "Diagrams",
        href: "/diagrams",
      },
      {
        title: "Product Card",
        href: "/product-card",
      },
      {
        title: "Folder structure",
        href: "/folder-structure",
      },
      {
        title: "Notes",
        href: "/notes",
      },
      {
        title: "Steps",
        href: "/steps",
      },
      {
        title: "Tabs",
        href: "/tabs",
      },
    ],
  },
];
