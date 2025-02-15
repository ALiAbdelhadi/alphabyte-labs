import type { Paths } from "@/lib/pageRoutes"

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
        title: "Diagrams",
        href: "/diagrams",
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
    ],
  },
]

