import { MainNavItem, SidebarItem } from "@/types"

export interface DocsConfig {
  sidebarItems: SidebarItem[]
  mainNav: MainNavItem[]
}
export const DocsRouting: DocsConfig = {
  mainNav: [
    { title: "Docs", href: "/docs/introduction" },
    { title: "Components", href: "/docs/components/accordion" },
    { title: "Blocks", href: "/ui-blocks" },
    { title: "Themes", href: "/themes" },
    { title: "Colors", href: "/colors" },
    { title: "Community", href: "/community" },
  ],
  sidebarItems: [
    {
      title: "Getting Started",
      id: "getting-started",
      items: [
        {
          href: "/introduction",
          title: "Introduction",
        },
        {
          href: "/installation",
          title: "Installation",
        },
        {
          href: "/rtl",
          title: "RTL Direction",
        },
        {
          href: "/themes",
          title: "Themes",
        },
      ],
    },
    {
      title: "Components",
      id: "components",
      href: "components",
      items: [
        {
          title: "Accordion",
          href: "/accordion",
        },
        {
          title: "Alert Dialog",
          href: "/alert-dialog",
        },
        {
          title: "Badge",
          href: "/badge",
        },
        {
          title: "Breadcrumb",
          href: "/breadcrumb",
        },
        {
          title: "Button",
          href: "/button",
        },
        {
          title: "Calendar",
          href: "/calendar",
        },
        {
          title: "Code Block",
          href: "/code-block",
        },
        {
          title: "Collapsible",
          href: "/collapsible",
        },
        {
          title: "Date Picker",
          href: "/data-picker",
        },
        {
          title: "Diagrams",
          href: "/diagrams",
        },
        {
          title: "Dialog",
          href: "/dialog",
        },
        {
          title: "Drawer",
          href: "/drawer",
        },
        {
          title: "Dropdown menu",
          href: "/dropdown-menu",
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
          title: "Popover",
          href: "/popover",
        },
        {
          title: "Product Card",
          href: "/product-card",
        },
        {
          title: "Scroll Area",
          href: "/scroll-area",
        },
        {
          title: "Separator",
          href: "/separator",
        },
        {
          title: "Sheet",
          href: "/sheet",
        },
        {
          title: "Sonner",
          href: "/sonner",
        },
        {
          title: "Steps",
          href: "/steps",
        },
        {
          title: "Tabs",
          href: "/tabs",
        },
        {
          title: "Tooltip",
          href: "/tooltip",
        },
      ],
    },
  ],
}
