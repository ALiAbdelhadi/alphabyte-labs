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
  return "noLink" in obj && typeof obj.noLink === "boolean"
}

function isRoute(
  node: Paths | SidebarItem
): node is Extract<Paths, { title: string; href?: string }> | SidebarItem {
  return "title" in node && typeof node.title === "string"
}

function getAllLinks(node: Paths | SidebarItem, parentHref: string = ""): Page[] {
  const pages: Page[] = []

  if (isRoute(node) && node.href && (!hasNoLink(node) || !node.noLink)) {
    // For components section, we need special handling
    if (node.id === "components" && node.items) {
      // Add the parent component route if it has items
      node.items.forEach((subNode) => {
        if (isRoute(subNode) && subNode.href) {
          pages.push({
            title: subNode.title,
            href: `/components${subNode.href}`
          })
        }
      })
    } else if (parentHref === "components") {
      // For component items, use the parent href structure
      pages.push({ title: node.title, href: `/components${node.href}` })
    } else {
      // For regular docs
      pages.push({ title: node.title, href: node.href })
    }
  }

  if (isRoute(node) && node.items && node.id !== "components") {
    node.items.forEach((subNode) => {
      if (isRoute(subNode)) {
        pages.push(...getAllLinks(subNode, node.id || ""))
      }
    })
  }

  return pages
}

export const PageRoutes = Routes.map((route) => getAllLinks(route))
  .flat()
  .filter((route): route is Page => Boolean(route.href))

// Debug function to check generated routes
export function debugRoutes() {
  console.log("Generated PageRoutes:", PageRoutes)
  return PageRoutes
}
