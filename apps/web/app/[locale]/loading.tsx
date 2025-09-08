import PageLoader from "@/components/ui/page-loader"
import { getTranslations } from "next-intl/server"

export default async function Loading() {
  const t = await getTranslations("loading")
  return <PageLoader fullscreen label={t("loading")} />
}


