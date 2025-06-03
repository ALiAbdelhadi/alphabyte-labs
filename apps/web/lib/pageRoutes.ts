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

function getAllLinks(node: Paths | SidebarItem): Page[] {
  const pages: Page[] = []

  if (isRoute(node) && node.href && (!hasNoLink(node) || !node.noLink)) {
    // For regular docs pages
    pages.push({ title: node.title, href: node.href })
  }

  if (isRoute(node) && node.items) {
    node.items.forEach((subNode) => {
      if (isRoute(subNode) && subNode.href) {
        // Handle components section specially
        if (node.id === "components") {
          pages.push({
            title: subNode.title,
            href: `/components${subNode.href}`
          })
        } else {
          pages.push({
            title: subNode.title,
            href: subNode.href
          })
        }
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
  PageRoutes.forEach((route, index) => {
    console.log(`${index}: ${route.title} -> ${route.href}`)
  })
  return PageRoutes
}