import { cn } from "@/lib/utils"
import { GitHubLink } from "@/settings/settings"
import Link from "next/link"
import { LuArrowUpRight } from "react-icons/lu"

type SideBarEdit = {
  title: string
  slug: string
}

export default function RightSideBar({ slug, title }: SideBarEdit) {
  const segments = slug.split("/")
  const lastSegment = segments[segments.length - 1]
  const feedbackUrl = `${GitHubLink.href}/issues/new?title=Feedback for "${title}"&labels=feedback`
  const editUrl = `${GitHubLink.href}/edit/main/apps/web/contents/docs/${slug}/${lastSegment}.mdx`

  return (
    <div className="flex flex-col gap-3 pl-2">
      <h3 className="text-sm font-semibold">This content</h3>
      <div className="flex flex-col gap-2">
        <Link
          href={feedbackUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "text-sm text-neutral-800 dark:text-neutral-300/85 no-underline flex items-center"
          )}
        >
          <LuArrowUpRight className="mr-1 w-4 h-4 inline-block" /> Feedback
        </Link>
        <Link
          href={editUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "text-sm text-neutral-800 dark:text-neutral-300/85 no-underline flex items-center"
          )}
        >
          <LuArrowUpRight className="mr-1 w-4 h-4 inline-block" /> Edit this
          page on Github
        </Link>
      </div>
    </div>
  )
}
