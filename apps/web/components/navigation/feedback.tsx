import { Link } from "@/i18n/routing"
import { GitHubLink } from "@/settings/navigation"
import { LuArrowUpRight } from "react-icons/lu"

import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"

type SideBarEdit = {
  title: string
  slug: string
}

export default function RightSideBar({ slug, title }: SideBarEdit) {
  const segments = slug.split("/")
  const lastSegment = segments[segments.length - 1]
  const feedbackUrl = `${GitHubLink.href}/issues/new?title=Feedback for "${title}"&labels=feedback`
  const editUrl = `${GitHubLink.href}/edit/main/contents/docs/${slug}/${lastSegment}.mdx`
  const translate = useTranslations("feedback")
  return (
    <div className="flex flex-col gap-3 pl-2 rtl:text-right">
      <h3 className="text-sm font-semibold">{translate("heading")}</h3>
      <div className="flex flex-col gap-2">
        <Link
          href={feedbackUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "text-sm text-neutral-800 dark:text-neutral-300/85 no-underline flex items-center "
          )}
        >
          <LuArrowUpRight className="mr-1 w-4 h-4 inline-block" /> {translate("feedback")}
        </Link>
        <Link
          href={editUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "text-sm text-neutral-800 dark:text-neutral-300/85 no-underline flex items-center "
          )}
        >
          <LuArrowUpRight className="mr-1 w-4 h-4 inline-block" /> {translate("edit-page")}
        </Link>
      </div>
    </div>
  )
}
