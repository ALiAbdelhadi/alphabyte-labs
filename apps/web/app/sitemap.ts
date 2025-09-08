import type { MetadataRoute } from "next"

import { Settings } from "@/config/meta"
import { getPageRoutes } from "@/lib/pageRoutes"
import { routing } from "@/i18n/routing"
import { blockExamples } from "@/registry/blocks-examples"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = Settings.metadataBase
  const locales = routing.locales

  const now = new Date().toISOString()

  // Top-level localized static pages (non-docs)
  const staticNonDocsPaths = ["", "/themes", "/colors", "/ui-blocks", "/community"]

  const staticPages = locales.flatMap((locale) =>
    staticNonDocsPaths.map((path) => ({
      url: `${baseUrl}/${locale}${path}`.replace(/\/+$/g, ""),
      lastModified: now,
      changeFrequency: path === "" ? ("weekly" as const) : ("monthly" as const),
      priority: path === "" ? 1.0 : 0.6,
    }))
  )

  // Docs routes (including components pages)
  const pageRoutes = await getPageRoutes()
  const docsPages = locales.flatMap((locale) =>
    pageRoutes.map((page) => {
      const href = page.href.startsWith("/docs") ? page.href : `/docs${page.href}`
      const url = `${baseUrl}/${locale}${href}`
      const isComponents = href.startsWith("/docs/components")
      return {
        url,
        lastModified: now,
        changeFrequency: isComponents ? ("weekly" as const) : ("monthly" as const),
        priority: isComponents ? 0.75 : 0.7,
      }
    })
  )

  // UI Blocks detail pages
  const blocksPages = locales.flatMap((locale) =>
    blockExamples.items.map(({ name }) => ({
      url: `${baseUrl}/${locale}/ui-blocks/${name}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }))
  )

  // De-duplicate
  const allPages = [...staticPages, ...docsPages, ...blocksPages]
  const seen = new Set<string>()
  const uniquePages = allPages.filter((p) => {
    if (seen.has(p.url)) return false
    seen.add(p.url)
    return true
  })

  return uniquePages
}
