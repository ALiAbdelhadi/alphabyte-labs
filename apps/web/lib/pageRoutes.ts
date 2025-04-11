import { DocsRouting } from "@/settings/docs-routing"

export type Paths =
    | {
        title?: string
        href?: string
        noLink?: true
        heading?: string
        items?: Paths[]
    }
    | {
        spacer: true
    }

// هنا نستخدم الخاصية sidebarItems من DocsRouting
export const Routes: Paths[] = [...DocsRouting.sidebarItems]

type Page = { title: string; href: string }

function isRoute(
    node: Paths
): node is Extract<Paths, { title: string; href: string }> {
    return "title" in node && "href" in node
}

function normalizePath(path: string): string {
    return path.startsWith('/') ? path : `/${path}`
}

function joinPaths(parent: string, child: string): string {
    const normalizedParent = parent.endsWith('/') ? parent.slice(0, -1) : parent
    const normalizedChild = child.startsWith('/') ? child : `/${child}`
    return `${normalizedParent}${normalizedChild}`
}

function getAllLinks(node: Paths): Page[] {
    const pages: Page[] = []

    // نتأكد من أن node يحتوي على href وأنه لا يحتوي على noLink
    if (isRoute(node) && node.href && !node.noLink) {
        pages.push({ title: node.title!, href: normalizePath(node.href) })
    }

    if (isRoute(node) && node.items) {
        node.items.forEach((subNode) => {
            if (isRoute(subNode) && subNode.href) {
                // دمج مسار العنصر الحالي مع مسار العنصر الفرعي
                const combinedHref = joinPaths(node.href || '', subNode.href)
                const temp = { ...subNode, href: combinedHref }

                if (!temp.noLink) {
                    pages.push({ title: temp.title!, href: temp.href! })
                }

                if (temp.items) {
                    const subPages = getAllLinks(temp)
                    pages.push(...subPages)
                }
            }
        })
    }

    return pages
}

export const PageRoutes = Routes.flatMap(route => getAllLinks(route))
