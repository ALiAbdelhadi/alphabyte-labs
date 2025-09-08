import ContributorsList from "@/components/contributors-list"
import { BackToTop } from "@/components/navigation/back-to-top"
import PageBreadcrumb from "@/components/navigation/docs-breadcrumb"
import Feedback from "@/components/navigation/feedback"
import Pagination from "@/components/navigation/Pagination"
import Toc from "@/components/navigation/toc"
import { Typography } from "@/components/typography"
import { badgeVariants } from "@/components/ui/badge"
import { Settings } from "@/config/meta"
import { ContributorsComponents } from "@/constant"
import { Link } from "@/i18n/navigation"
import { ErrorBoundary } from "@/lib/debug-wrapper"
import { getDocument } from "@/lib/markdown"
import { getPageRoutes } from "@/lib/pageRoutes"
import { cn } from "@/lib/utils"
import fs from "fs/promises"
import { ExternalLink } from "lucide-react"
import { notFound } from "next/navigation"
import path from "path"
import { routing } from "@/i18n/routing"
import { getTranslations } from "next-intl/server"

type DocsPageProps = {
  params: Promise<{
    locale: string
    slug?: string[]
  }>
}

const ComponentsPage = async (props: DocsPageProps) => {
  try {
    const DocsParams = await props.params
    const { locale, slug = [] } = DocsParams
    const pathName = slug.join("/")

    console.log("Locale:", locale)
    console.log("Original slug:", slug)
    console.log("PathName:", pathName)
    console.log("Looking for document at:", pathName)

    // Handle empty slug case (docs root)
    const documentPath = pathName || "introduction"

    const res = await getDocument(documentPath, locale)
    if (!res) {
      console.error(`Document not found for path: ${documentPath}`)
      notFound()
    }

    const { docs, content, tocs } = res
    const t = await getTranslations("component-page")
    return (
      <div className="flex items-start gap-14 max-w-7xl transition-all">
        <div className="flex-[3] mt-[4.5rem] md:mt-7">
          <PageBreadcrumb paths={slug} />
          <div className="space-y-2">
            <h1 className="scroll-m-20 text-3xl font-bold tracking-tight">{docs.title}</h1>
            {docs.description && (
              <p className="text-muted-foreground text-base font-normal tracking-wide">{docs.description}</p>
            )}
          </div>
          {docs.links ? (
            <div className="flex items-center space-x-2 rtl:space-x-reverse pt-4">
              {docs.links?.doc && (
                <Link
                  href={docs.links.doc}
                  target="_blank"
                  rel="noreferrer"
                  className={cn("!rounded-lg", badgeVariants({ variant: "secondary" }), "gap-1")}
                >
                  {t("docs-links.docs")}
                  <ExternalLink className="h-3 w-3" />
                </Link>
              )}
              {docs.links?.api && (
                <Link
                  href={docs.links.api}
                  target="_blank"
                  rel="noreferrer"
                  className={cn("!rounded-lg", badgeVariants({ variant: "secondary" }), "gap-1")}
                >
                  {t("docs-links.api-reference")}
                  <ExternalLink className="h-3 w-3" />
                </Link>
              )}
            </div>
          ) : null}
          <Typography>
            <ErrorBoundary>{content}</ErrorBoundary>
            <Pagination pathname={pathName} />
            <div className="my-6 pb-10 border-t not-prose pt-3">
              <h3 className="text-lg font-semibold text-primary mb-2">Contributors</h3>
              <div className="bg-muted p-6 rounded-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-foreground">Button Component</h3>
                    <p className="text-sm text-muted-foreground mt-1">Last updated 2 days ago</p>
                  </div>
                  <ContributorsList contributors={ContributorsComponents} maxDisplay={3} size={32} />
                </div>
              </div>
            </div>
          </Typography>
        </div>
        {Settings.rightbar && (
          <div className="hidden xl:flex xl:flex-col sticky top-16 gap-3 py-8 lg:min-w-[230px] min-w-[200px] h-[94.5vh] toc transition-all">
            {Settings.toc && <Toc tocs={tocs} />}
            {Settings.feedback && <Feedback slug={pathName} title={docs.title} />}
            {Settings.toTop && (
              <BackToTop className="mt-6 self-start text-sm text-neutral-800 dark:text-neutral-300/85" />
            )}
          </div>
        )}
      </div>
    )
  } catch (error) {
    console.error("Error in Pages component:", error)
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Page</h1>
        <p className="text-gray-600">
          An error occurred while rendering this page. Please check the console for more details.
        </p>
        <pre className="mt-4 p-4 bg-gray-100 rounded text-sm overflow-auto">
          {error instanceof Error ? error.message : "Unknown error"}
        </pre>
      </div>
    )
  }
}

export default ComponentsPage

export async function generateMetadata(props: DocsPageProps) {
  const DocsParams = await props.params
  const { locale, slug = [] } = DocsParams
  const pathName = slug.join("/") || "introduction"

  try {
    const res = await getDocument(pathName, locale)
    if (!res) return { title: "Page Not Found" }

    const { docs, lastUpdated } = res

    return {
      title: `${docs.title} - ${Settings.title}`,
      description: docs.description,
      keywords: docs.keywords,
      ...(lastUpdated && {
        lastModified: new Date(lastUpdated).toISOString(),
      }),
    }
  } catch (error) {
    console.error("Error generating metadata:", error)
    return { title: "Error - Page Not Found" }
  }
}

export async function generateStaticParams() {
  console.log("Generating static params with locale support...")

  const pageRoutes = await getPageRoutes()
  console.log("Available PageRoutes:", pageRoutes)

  // For each route and each locale, check localized file first then fallback
  const localizedParams = await Promise.all(
    routing.locales.flatMap((locale) =>
      pageRoutes.map(async (route) => {
        const cleanHref = route.href.startsWith("/") ? route.href.slice(1) : route.href
        const segments = cleanHref.split("/").filter(Boolean)

        // Determine last segment and candidate file paths
        const lastSegment = segments.length === 0 ? "introduction" : segments[segments.length - 1]
        const baseLocalized = path.join(process.cwd(), "contents", locale, "docs")
        const baseDefault = path.join(process.cwd(), "contents", "docs")

        const candidates =
          segments.length === 0
            ? [
                path.join(baseLocalized, "introduction", "introduction.mdx"),
                path.join(baseDefault, "introduction", "introduction.mdx"),
              ]
            : [
                path.join(baseLocalized, cleanHref, `${lastSegment}.mdx`),
                path.join(baseDefault, cleanHref, `${lastSegment}.mdx`),
              ]

        for (const filePath of candidates) {
          try {
            console.log(`Checking file: ${filePath}`)
            await fs.access(filePath, fs.constants.F_OK)
            return {
              locale,
              slug: segments.length === 0 ? [] : segments,
              valid: true,
            }
          } catch {}
        }

        console.warn(`MDX file not found for route: ${route.href} (locale: ${locale})`)
        return { locale, slug: segments, valid: false }
      }),
    ),
  )

  const routesForAllLocales = localizedParams
    .filter((p) => p.valid)
    .map((p) => ({
      locale: p.locale,
      slug: p.slug,
    }))

  console.log("Valid static params (with locales):", routesForAllLocales)
  return routesForAllLocales
}
