
import { notFound } from "next/navigation"
import { BackToTop } from "@/components/navigation/backToTop"
import PageBreadcrumb from "@/components/navigation/DocsBreadcrumb"
import Feedback from "@/components/navigation/feedback"
import Pagination from "@/components/navigation/Pagination"
import Toc from "@/components/navigation/toc"
import { Typography } from "@/components/typography"
import { ErrorBoundary } from "@/lib/debug-wrapper"
import { getDocument } from "@/lib/markdown"
import { Settings } from "@/lib/meta"
import { PageRoutes } from "@/lib/pageRoutes"
type DocsPageProps = {
  params: Promise<{
    slug: string[]
  }>
}
const page = async (props: DocsPageProps) => {
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

export default page
export async function generateMetadata(props: DocsPageProps) {
  const DocsParams = await props.params
  const { slug = [] } = DocsParams
  const pathName = slug.join("/")
  const res = await getDocument(pathName)

  if (!res) return null

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

export function generateStaticParams() {
  return PageRoutes.map((item) => ({
    slug: item.href.split("/").slice(1),
  }))
}
