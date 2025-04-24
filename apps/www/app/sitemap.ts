import { Settings } from "@/config/meta";
import { PageRoutes } from "@/lib/pageRoutes";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = Settings.metadataBase;

  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/components`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/introduction`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/installation`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/example-page`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }
  ];


  const dynamicPages = PageRoutes.map((page) => ({
    url: `${baseUrl}${page.href}`,
    lastModified: new Date().toISOString(),
    changeFrequency: page.href.startsWith("/components") 
      ? "weekly" as const 
      : "monthly" as const,
    priority: page.href === "/" 
      ? 1.0 
      : page.href.startsWith("/components")
        ? 0.9
        : 0.8,
  }));
  

  const allPages = [...staticPages, ...dynamicPages];
  const uniquePages = allPages.filter((page, index, self) => 
    index === self.findIndex((p) => p.url === page.url)
  );
  
  return uniquePages;
}
