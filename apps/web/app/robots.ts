import type { MetadataRoute } from "next"

import { Settings } from "@/config/meta"
import { routing } from "@/i18n/routing"
import { getPageRoutes } from "@/lib/pageRoutes"
import { blockExamples } from "@/registry/blocks-examples"

export default async function robots(): Promise<MetadataRoute.Robots> {
  const locales = routing.locales

  // Build all component paths from routes
  const pageRoutes = await getPageRoutes()
  const componentHrefs = pageRoutes
    .map((r) => r.href)
    .filter((href) => href.includes("/components"))
    .map((href) => (href.startsWith("/docs") ? href : `/docs${href}`))

  // Allow locale-prefixed public routes
  const allowPaths = locales.flatMap((locale) => [
    `/${locale}/`,
    `/${locale}/docs/`,
    `/${locale}/docs/introduction`,
    `/${locale}/docs/installation`,
    `/${locale}/docs/components`,
    `/${locale}/themes`,
    `/${locale}/colors`,
    `/${locale}/ui-blocks`,
    `/${locale}/community`,
    // All ui-blocks detail pages
    ...blockExamples.items.map(({ name }) => `/${locale}/ui-blocks/${name}`),
    // All components detail pages
    ...componentHrefs.map((href) => `/${locale}${href}`),
  ])

  const disallowPaths = [
    "/api/",
    "/admin/",
    "/_next/",
    "/private/",
    "/*.json$",
    "/drafts/",
    "/preview/",
  ]

  return {
    rules: [
      {
        userAgent: "*",
        allow: allowPaths,
        disallow: disallowPaths,
      },
      {
        userAgent: "Googlebot",
        allow: allowPaths,
        disallow: disallowPaths,
      },
    ],
    sitemap: `${Settings.metadataBase}/sitemap.xml`,
    host: Settings.metadataBase,
  }
}
