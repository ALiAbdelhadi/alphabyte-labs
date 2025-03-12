import type { Paths } from "@/lib/pageRoutes"

export const DocsRouting: Paths[] = [
  {
    title: "Getting Started",
    noLink: true,
    href: "",
    items: [
      {
        href: "/introduction",
        title: "Introduction",
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
        title: "Alert Dialog",
        href: "/alert-dialog",
      },
      {
        title: "Button",
        href: "/button",
      },
      {
        title: "Code Block",
        href: "/code-block",
      },
      {
        title: "Dialog",
        href: "/dialog",
      },
      {
        title: "Diagrams",
        href: "/diagrams",
      },
      {
        title: "Folder structure",
        href: "/folder-structure",
      },
      {
        title: "Input",
        href: "/input",
      },
      {
        title: "Label",
        href: "/label",
      },
      {
        title: "Notes",
        href: "/note",
      },
      {
        title: "Product Card",
        href: "/product-card",
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
]
