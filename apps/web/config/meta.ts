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
