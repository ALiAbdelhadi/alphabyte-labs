import type { MetadataRoute } from "next"

import { Settings } from "@/config/meta"
import { PageRoutes } from "@/lib/pageRoutes"

export default function sitemap(): MetadataRoute.Sitemap {
  return PageRoutes.map((page) => ({
    url: `${Settings.metadataBase}${page.href}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly",
    priority: 0.8,
  }))
}
