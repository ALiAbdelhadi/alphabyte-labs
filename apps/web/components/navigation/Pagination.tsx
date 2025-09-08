import { Link } from "@/i18n/navigation";
import { getPreviousNext } from "@/lib/markdown";
import { getLocale, getTranslations } from "next-intl/server";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
function formatDocPath(path: string | undefined): string {
  if (!path) return "/docs";
  const cleanPath = path.replace(/^\//, '');
  if (!cleanPath.startsWith('docs/')) {
    return `/docs/${cleanPath}`.replace(/\/+/g, '/');
  }

  return `/${cleanPath}`.replace(/\/+/g, '/');
}

const Pagination = async ({ pathname }: { pathname: string }) => {
  const locale = await getLocale();
  const t = await getTranslations("pagination");
  const res = await getPreviousNext(pathname, locale);
  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between my-12 gap-4 ">
        <div className="w-full sm:w-1/2">
          {res.prev && (
            <Link
              className="group w-full border border-gray-200 rounded-lg flex flex-col !py-4 !px-4 !items-start font-medium not-prose hover:bg-gray-50 dark:hover:bg-gray-500/30 transition-colors"
              href={formatDocPath(res.prev.href)}
            >
              <div>
                <span className="text-muted-foreground text-xs sm:text-[13px] group-hover:text-primary">
                  {t("previous")}
                </span>
                <span className="flex no-underline items-center justify-center text-gray-900 hover:text-gray-950 dark:text-gray-200 hover:dark:text-gray-100 transition-colors text-base md:text-lg mt-2">
                  <ChevronLeftIcon className="w-6 h-6 text-muted-foreground mt-[1px] mr-[6px] group-hover:text-primary rtl:rotate-180" />
                  {res.prev.title}
                </span>
              </div>
            </Link>
          )}
        </div>
        <div className="w-full sm:w-1/2 flex justify-end">
          {res.next && (
            <Link
              className="group w-full border border-gray-200 rounded-lg flex flex-col !py-4 !px-4 !items-end text-right font-medium not-prose hover:bg-gray-50 dark:hover:bg-gray-500/30 transition-colors"
              href={formatDocPath(res.next.href)}
            >
              <span className="text-muted-foreground text-xs sm:text-[13px] group-hover:text-primary">
                {t("next")}
              </span>
              <span className="flex no-underline items-center justify-center text-gray-900 hover:text-gray-950 dark:text-gray-200 hover:dark:text-gray-100 transition-colors text-base md:text-lg mt-2">
                {res.next.title}
                <ChevronRightIcon className=" rtl:rotate-180 w-6 h-6 text-muted-foreground mt-[1px] ml-[6px] group-hover:text-primary" />
              </span>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default Pagination