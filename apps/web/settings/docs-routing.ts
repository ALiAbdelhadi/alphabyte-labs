import type { MainNavItem, SidebarItem } from "@/types"
import { getTranslations } from "next-intl/server"

export interface DocsConfig {
  sidebarItems: SidebarItem[]
  mainNav: MainNavItem[]
}

export async function getDocsRouting(): Promise<DocsConfig> {
  const t = await getTranslations("docs-sidebar")
  return {
    mainNav: [
      { title: t("main.docs"), href: "/docs/introduction" },
      { title: t("main.components"), href: "/docs/components" },
      { title: t("main.blocks"), href: "/ui-blocks" },
      { title: t("main.themes"), href: "/themes" },
      { title: t("main.colors"), href: "/colors" },
      { title: t("main.community"), href: "/community" },
    ],
    sidebarItems: [
      {
        title: t("sidebar.gettingStarted.title"),
        id: "getting-started",
        items: [
          {
            href: "/introduction",
            title: t("sidebar.gettingStarted.introduction"),
          },
          {
            href: "/installation",
            title: t("sidebar.gettingStarted.installation"),
          },
          {
            href: "/rtl",
            title: t("sidebar.gettingStarted.rtlDirection"),
          },
          {
            href: "/themes",
            title: t("sidebar.gettingStarted.themes"),
          },
        ],
      },
      {
        title: t("sidebar.components.title"),
        id: "components",
        href: "/components",
        items: [
          {
            title: t("sidebar.components.accordion"),
            href: "/accordion",
          },
          {
            title: t("sidebar.components.alertDialog"),
            href: "/alert-dialog",
          },
          {
            title: t("sidebar.components.badge"),
            href: "/badge",
          },
          {
            title: t("sidebar.components.breadcrumb"),
            href: "/breadcrumb",
          },
          {
            title: t("sidebar.components.button"),
            href: "/button",
          },
          {
            title: t("sidebar.components.calendar"),
            href: "/calendar",
          },
          {
            title: t("sidebar.components.collapsible"),
            href: "/collapsible",
          },
          {
            title: t("sidebar.components.datePicker"),
            href: "/data-picker",
          },
          {
            title: t("sidebar.components.diagrams"),
            href: "/diagrams",
          },
          {
            title: t("sidebar.components.dialog"),
            href: "/dialog",
          },
          {
            title: t("sidebar.components.drawer"),
            href: "/drawer",
          },
          {
            title: t("sidebar.components.dropdownMenu"),
            href: "/dropdown-menu",
          },
          {
            title: t("sidebar.components.folderStructure"),
            href: "/folder-structure",
          },
          {
            title: t("sidebar.components.input"),
            href: "/input",
          },
          {
            title: t("sidebar.components.label"),
            href: "/label",
          },
          {
            title: t("sidebar.components.notes"),
            href: "/note",
          },
          {
            title: t("sidebar.components.popover"),
            href: "/popover",
          },
          {
            title: t("sidebar.components.preCodeBlock"),
            href: "/pre",
          },
          {
            title: t("sidebar.components.productCard"),
            href: "/product-card",
          },
          {
            title: t("sidebar.components.scrollArea"),
            href: "/scroll-area",
          },
          {
            title: t("sidebar.components.separator"),
            href: "/separator",
          },
          {
            title: t("sidebar.components.sheet"),
            href: "/sheet",
          },
          {
            title: t("sidebar.components.sonner"),
            href: "/sonner",
          },
          {
            title: t("sidebar.components.step"),
            href: "/step",
          },
          {
            title: t("sidebar.components.switch"),
            href: "/switch",
          },
          {
            title: t("sidebar.components.tabs"),
            href: "/tabs",
          },
          {
            title: t("sidebar.components.tooltip"),
            href: "/tooltip",
          },
        ],
      },
    ],
  }
}