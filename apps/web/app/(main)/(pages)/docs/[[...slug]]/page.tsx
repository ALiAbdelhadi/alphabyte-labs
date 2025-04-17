import { BackToTop } from "@/components/navigation/back-to-top"
import PageBreadcrumb from "@/components/navigation/docs-breadcrumb"
import Feedback from "@/components/navigation/feedback"
import Pagination from "@/components/navigation/Pagination"
import Toc from "@/components/navigation/toc"
import { Typography } from "@/components/typography"
import { Settings } from "@/config/meta"
import { ErrorBoundary } from "@/lib/debug-wrapper"
import { getDocument } from "@/lib/markdown"
import { PageRoutes } from "@/lib/pageRoutes"
import fs from "fs/promises"
import { notFound } from "next/navigation"
import path from "path"

type DocsPageProps = {
  params: Promise<{
    slug: string[]
  }>
}
const ComponentsPage = async (props: DocsPageProps) => {
  try {
    const DocsParams = await props.params
    const { slug = [] } = DocsParams
    const pathName = slug.join("/")
    const res = await getDocument(pathName)
    if (!res) {
      notFound()
    }
    const { frontmatter, content, tocs } = res
    return (
      <div className="flex items-start gap-14 max-w-7xl transition-all">
        <div className="flex-[3] mt-[4.5rem] md:mt-7">
          <PageBreadcrumb paths={slug} />
          <div className="space-y-2">
            <h1 className="scroll-m-20 text-3xl font-bold tracking-tight">
              {frontmatter.title}
            </h1>
            {frontmatter.description && (
              <p className="text-muted-foreground text-base font-normal tracking-wide">
                {frontmatter.description}
              </p>
            )}
          </div>
          <Typography>
            <ErrorBoundary>
              <div>{content}</div>
            </ErrorBoundary>
            <Pagination pathname={pathName} />
          </Typography>
        </div>
        {Settings.rightbar && (
          <div className="hidden xl:flex xl:flex-col sticky top-16 gap-3 py-8 lg:min-w-[230px] min-w-[200px]  h-[94.5vh] toc transition-all ">
            {Settings.toc && <Toc tocs={tocs} />}
            {Settings.feedback && (
              <Feedback slug={pathName} title={frontmatter.title} />
            )}
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
      <div>
        An error occurred while rendering this page. Please check the console
        for more details.
      </div>
    )
  }
}

export default ComponentsPage

export async function generateMetadata(props: DocsPageProps) {
  const DocsParams = await props.params
  const { slug = [] } = DocsParams
  const pathName = slug.join("/")
  const res = await getDocument(pathName)
  if (!res) {
    notFound()
  }
  const { frontmatter, lastUpdated } = res
  return {
    title: `${frontmatter.title} - ${Settings.title}`,
    description: frontmatter.description,
    keywords: frontmatter.keywords,
    ...(lastUpdated && {
      lastModified: new Date(lastUpdated).toISOString(),
    }),
  }
}

export async function generateStaticParams() {
  const validRoutes = await Promise.all(
    PageRoutes.map(async (route) => {
      try {
        const slug = route.href.split("/").slice(1).join("/")
        const lastSegment = slug.split("/").pop() || slug
        const contentPath = path.join(
          process.cwd(),
          "/contents/docs/",
          `${slug}/${lastSegment}.mdx`
        )
        await fs.access(contentPath, fs.constants.F_OK)
        return {
          slug: route.href.split("/").slice(1),
          valid: true
        }
      } catch (error) {
        console.warn(`MDX file not found for route: ${route.href}`)
        return {
          slug: route.href.split("/").slice(1),
          valid: false
        }
      }
    })
  )

  return validRoutes
    .filter(route => route.valid)
    .map(route => ({
      slug: route.slug
    }))
}