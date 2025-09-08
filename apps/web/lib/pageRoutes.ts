import { getDocsRouting } from "@/settings/docs-routing"
import type { SidebarItem } from "@/types"

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

export async function getRoutes() {
  const docsConfig = await getDocsRouting()
  return [...docsConfig.sidebarItems]
}

type Page = { title: string; href: string }

function hasNoLink(obj: any): obj is { noLink: boolean } {
  return "noLink" in obj && typeof obj.noLink === "boolean"
}

function isRoute(node: Paths | SidebarItem): node is Extract<Paths, { title: string; href?: string }> | SidebarItem {
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
            href: `/components${subNode.href}`,
          })
        } else {
          pages.push({
            title: subNode.title,
            href: subNode.href,
          })
        }
      }
    })
  }

  return pages
}

export async function getPageRoutes() {
  const routes = await getRoutes()
  return routes.flatMap((route) => getAllLinks(route)).filter((route): route is Page => Boolean(route.href))
}

// Create a static export for client components that need route data
// This should be generated at build time
export async function generateStaticPageRoutes() {
  const pageRoutes = await getPageRoutes()
  return pageRoutes
}

export async function debugRoutes() {
  const pageRoutes = await getPageRoutes()
  console.log("Generated PageRoutes:", pageRoutes)
  pageRoutes.forEach((route, index) => {
    console.log(`${index}: ${route.title} -> ${route.href}`)
  })
  return pageRoutes
}