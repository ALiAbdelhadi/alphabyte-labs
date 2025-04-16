import { DocsRouting } from "@/settings/docs-routing"
import { SidebarItem } from "@/types"

export type Paths =
  | {
    title: string
    href?: string
    noLink?: true
    heading?: string
    items?: Paths[]
  }
  | {
    spacer: true
  }

export const Routes = [...DocsRouting.sidebarItems]

type Page = { title: string; href: string }

function hasNoLink(obj: any): obj is { noLink: boolean } {
  return 'noLink' in obj && typeof obj.noLink === 'boolean';
}

function isRoute(
  node: Paths | SidebarItem
): node is Extract<Paths, { title: string; href?: string }> | SidebarItem {
  return "title" in node && typeof node.title === "string"
}

function getAllLinks(node: Paths | SidebarItem): Page[] {
  const pages: Page[] = []

  if (isRoute(node) && node.href && (!hasNoLink(node) || !node.noLink)) {
    pages.push({ title: node.title, href: node.href })
  }

  if (isRoute(node) && node.items) {
    node.items.forEach((subNode) => {
      if (isRoute(subNode)) {
        if (node.href && subNode.href) {
          const temp = { ...subNode, href: `${node.href}${subNode.href}` }
          pages.push(...getAllLinks(temp))
        } else if (subNode.href) {
          pages.push(...getAllLinks(subNode))
        }
      }
    })
  }

  return pages
}

export const PageRoutes = Routes.map((it) => getAllLinks(it))
  .flat()
  .filter((route): route is Page => Boolean(route.href))
