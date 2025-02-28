import type { Paths } from "@/lib/pageRoutes";

export const DocsRouting: Paths[] = [
  {
    title: "Getting Started",
    noLink: true,
    href: "",
    items: [
      {
        href: "/introduction",
        title: "introduction",
      },
      {
        href: "/installation",
        title: "Installation",
      },
    ],
  },
  {
    spacer: true,
  },
  {
    title: "Components",
    noLink: true,
    href: "/components",
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
