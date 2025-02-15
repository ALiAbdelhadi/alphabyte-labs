import { DocsRouting } from "@/settings/DocsRouting"

export type Paths = PathWithItems | PathSpacer

export const Routes: Paths[] = [...DocsRouting]

function isRoute(node: Paths): node is PathWithItems {
  return "href" in node
}

type LinkItem = {
  title: string
  href: string
}

function getAllLinks(node: Paths): LinkItem[] {
  if (!isRoute(node)) {
    return []
  }

  const pages: LinkItem[] = []

  if (node.title) {
    pages.push({ title: node.title, href: node.href })
  }

  if (node.items) {
    node.items.forEach((subNode) => {
      if (isRoute(subNode)) {
        const temp = { ...subNode, href: `${node.href}${subNode.href}` }
        pages.push(...getAllLinks(temp))
      }
    })
  }

  return pages
}

export const PageRoutes = Routes.flatMap(getAllLinks)

