import { Card } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function TocCtaCard() {
    const t = useTranslations("tocCtaCard");
    return (
        <Card className="bg-muted/50 dark:bg-muted/70 p-4 rounded-xl transition hover:shadow-md group block">
            <Link
                target="_blank"
                href="https://alphabytes.vercel.app/contact"
                className="block"
            >
                <h3 className="text-[15px] font-semibold text-foreground group-hover:underline underline-offset-2 text-balance">
                    <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r w-fit from-[#0898f4] from-[0%] via-[#f34d7a] via-[70%] to-[#f95032]">
                        {t("companyName")}:{" "}
                    </span>
                    {t("title")}
                </h3>
                <p className="text-[13px] text-muted-foreground mt-2 leading-snug">
                    {t("descriptionStart")} <span className="font-medium">{t("siteName")}</span>{t("descriptionMiddle")} <span className="font-semibold text-foreground">Next.js</span> {t("descriptionEnd")}.
                </p>
                <span className="underline font-medium text-[13px] mt-2 inline-block text-primary cursor-pointer hover:opacity-80">
                    {t("ctaButton")}
                </span>
            </Link>
        </Card>
    )
}
