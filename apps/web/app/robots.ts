import type { MetadataRoute } from "next"
import { Settings } from "@/config/meta"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/components/",
          "/introduction",
          "/installation",
          "/getting-started/",
        ],
        disallow: [
          "/api/",
          "/admin/",
          "/_next/",
          "/private/",
          "/*.json$",
          "/drafts/",
          "/preview/",
        ],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: [
          "/api/",
          "/admin/",
          "/_next/",
          "/private/",
          "/drafts/",
        ],
      },
    ],
    sitemap: `${Settings.metadataBase}/sitemap.xml`,
    host: Settings.metadataBase,
  }
}
