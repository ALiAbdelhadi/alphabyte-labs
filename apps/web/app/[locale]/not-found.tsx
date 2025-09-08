import { Link } from "@/i18n/navigation"
import { Button } from "@/components/ui/button"
import { getTranslations } from "next-intl/server"

export default async function NotFound() {
  const t = await getTranslations("notFound")
  return (
    <div className="min-h-[86.5vh] flex flex-col justify-center items-center text-center px-2 py-8">
      <h1 className="text-4xl font-bold mb-4 sm:text-7xl">404</h1>
      <p className="max-w-[600px] text-foreground mb-8 sm:text-base">{t("description")}</p>
      <div className="flex items-center">
        <Button variant={"outline"}>
          <Link href="/">{t("returnHome")}</Link>
        </Button>
      </div>
    </div>
  )
}
