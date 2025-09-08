"use client"

import { Link } from "@/i18n/navigation"
import { cn, convertToArabicNumerals } from "@/lib/utils"
import { GitHubLink } from "@/settings/settings"
import { useLocale, useTranslations } from "next-intl"
import { usePathname } from "next/navigation"

export function Footer() {
  const routeName = usePathname()
  const isDocsRoute = routeName.match("/docs")
  const t = useTranslations("footer")
  const locale = useLocale()
  return (
    <footer
      className={cn("w-full h-16", isDocsRoute && "border-t border-grid")}
    >
      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-0 w-full h-full mx-auto container text-sm text-muted-foreground">
        <p className="text-center text-muted-foreground">
          {locale === "ar" ? convertToArabicNumerals(new Date().getFullYear()) : new Date().getFullYear()}{" "} &copy; { }
          {t("builtBy")}{" "}
          <Link
            className="font-semibold underline"
            target="_blank"
            href={"https://alphabyte-labs.vercel.app"}
          >
            {t("alphabyte")}
          </Link>{" "}
          {t("sourceCode")}{" "}
          <Link href={GitHubLink.href} target="_blank" className="underline">
            {t("github")}
          </Link>
          .
        </p>
      </div>
    </footer>
  )
}
