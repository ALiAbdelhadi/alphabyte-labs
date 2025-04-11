import { DocsRouting } from "@/settings/docs-routing"
import { SidebarItem } from "@/types"
import { useTranslations } from "next-intl"

export function TransDocsRouting(): SidebarItem[] {
    const t = useTranslations("docs-routing")
    const sections = DocsRouting.sidebarItems
    return sections.map((section) => {
        if ("spacer" in section) return { spacer: true, title: "", items: [] }
        return {
            ...section,
            title: t(section?.id),
            items: section.items?.map((item) => ({
                ...item,
                title: t(item.title || ""),
                href: item.href
            })) || [],
        }
    }) as SidebarItem[]
}