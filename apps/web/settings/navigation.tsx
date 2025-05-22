import { PageRoutes } from "@/lib/pageRoutes"

function getFirstDocsRoute() {
  return PageRoutes.find(route =>
    !route.href.startsWith('/components') && route.href !== '/components'
  )?.href || '/introduction'
}

function getFirstComponentRoute() {
  return PageRoutes.find(route =>
    route.href.startsWith('/components/')
  )?.href || '/components/accordion'
}

export const Navigations = [
  {
    title: "Docs",
    href: `/docs${getFirstDocsRoute()}`,
  },
  {
    title: "Components",
    href: `/docs${getFirstComponentRoute()}`,
  },
]