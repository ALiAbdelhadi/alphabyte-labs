import {
  branding,
  companyLink,
  companyName,
  description,
  feedbackEdit,
  gtm,
  gtmConnected,
  imageAlt,
  keywords,
  loadFromGithub,
  rightSidebar,
  siteIcon,
  siteName,
  tableOfContent,
  toTopScroll,
  twitterHandle,
  url,
  urlImage,
} from "@/settings/settings"

import { OpenGraph, TwitterCard } from "@/config/metadata"

// Extended OpenGraph type to support article metadata
type ExtendedOpenGraph = OpenGraph & {
  publishedTime?: string
  authors?: string[]
  section?: string
  locale?: string
}

export const Company = {
  name: companyName,
  link: companyLink,
  branding: branding,
}

export const Settings = {
  gtm: gtm,
  gtmConnected: gtmConnected,
  rightbar: rightSidebar,
  toc: tableOfContent,
  feedback: feedbackEdit,
  toTop: toTopScroll,
  gitload: loadFromGithub,
  title: siteName,
  metadataBase: url,
  description: description,
  siteIcon: siteIcon,
  keywords: keywords,
  openGraph: {
    type: "website",
    title: siteName,
    description: description,
    siteName: siteName,
    images: [
      {
        url: urlImage,
        width: 1200,
        height: 630,
        alt: imageAlt,
      },
    ],
  } as OpenGraph,
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: description,
    site: twitterHandle,
    images: [
      {
        url: urlImage,
        alt: imageAlt,
      },
    ],
  } as TwitterCard,
  canonical: url,
}

type MetadataProps = {
  title?: string
  description?: string
  keywords?: string[]
  image?: {
    url: string
    width?: number
    height?: number
    alt?: string
  }
  noIndex?: boolean
  locale?: string
  type?: "website" | "article"
  canonical?: string
  publishedTime?: string
  authors?: string[]
  category?: string
}

/**
 * Generate metadata for a page with SEO optimization
 *
 * @param props - Page-specific metadata properties to override defaults
 * @returns Metadata object compatible with Next.js metadata API
 */
export function constructMetadata(props?: MetadataProps) {
  const title = props?.title
    ? `${props.title} | ${Settings.title}`
    : Settings.title

  const description = props?.description || Settings.description
  const currentKeywords = props?.keywords
    ? [...Settings.keywords, ...props.keywords]
    : Settings.keywords

  const image = props?.image
    ? {
        url: props.image.url,
        width: props.image.width || 1200,
        height: props.image.height || 630,
        alt: props.image.alt || imageAlt,
      }
    : Settings.openGraph.images[0]

  const type = props?.type || Settings.openGraph.type
  const canonicalUrl = props?.canonical || Settings.canonical
  const locale = props?.locale || "en"

  // Default metadata
  const metadata = {
    title,
    metadataBase: new URL(Settings.metadataBase),
    description,
    keywords: currentKeywords,
    openGraph: {
      type,
      url: canonicalUrl,
      title,
      description,
      siteName: Settings.openGraph.siteName,
      locale,
      images: [
        {
          ...image,
          url: image.url.startsWith("http")
            ? image.url
            : `${Settings.metadataBase}${image.url}`,
        },
      ],
    } as ExtendedOpenGraph,
    twitter: {
      card: Settings.twitter.card,
      title,
      description,
      site: Settings.twitter.site,
      images: [
        {
          url: image.url.startsWith("http")
            ? image.url
            : `${Settings.metadataBase}${image.url}`,
          alt: image.alt,
        },
      ],
    },
    robots: {
      index: !props?.noIndex,
      follow: !props?.noIndex,
      googleBot: {
        index: !props?.noIndex,
        follow: !props?.noIndex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: canonicalUrl,
    },
  }

  // Add article-specific metadata if type is article
  if (type === "article" && props) {
    metadata.openGraph = {
      ...metadata.openGraph,
      publishedTime: props.publishedTime,
      authors: props.authors,
      section: props.category,
    }
  }

  return metadata
}
