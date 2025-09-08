import { cn } from "@/lib/utils"
import { GitHubLink } from "@/settings/settings"
import { Link } from "@/i18n/navigation"
import { LuArrowUpRight } from "react-icons/lu"
import { useTranslations } from "next-intl"

type SideBarEdit = {
  title: string
  slug: string
}

export default function RightSideBar({ slug, title }: SideBarEdit) {
  const segments = slug.split("/")
  const lastSegment = segments[segments.length - 1]
  const feedbackUrl = `${GitHubLink.href}/issues/new?title=Feedback for "${title}"&labels=feedback`
  const editUrl = `${GitHubLink.href}/edit/main/apps/web/contents/docs/${slug}/${lastSegment}.mdx`
  const t = useTranslations("feedback")
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-sm font-semibold">{t("title")}</h3>
      <div className="flex flex-col gap-2">
        <Link
          href={feedbackUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "text-sm text-neutral-800 dark:text-neutral-300/85 no-underline flex items-center"
          )}
        >
          <LuArrowUpRight className="mr-1 w-4 h-4 inline-block" /> {t("header-1")}
        </Link>
        <Link
          href={editUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "text-sm text-neutral-800 dark:text-neutral-300/85 no-underline flex items-center"
          )}
        >
          <LuArrowUpRight className="mr-1 w-4 h-4 inline-block" /> {t("header-2")}
        </Link>
      </div>
    </div>
  )
}
