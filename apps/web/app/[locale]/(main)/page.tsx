import Container from "@/components/Container"
import { Button } from "@/components/ui/button"
import PageTransition from "@/components/ui/page-transition"
import { Link } from "@/i18n/navigation"
import { useTranslations } from "next-intl"
const Home = () => {
  const t = useTranslations("home")

  return (
    <PageTransition>
      <div className="min-h-[81.6vh] py-10 md:py-14">
        <Container>
          <section className="my-10 md:my-12 space-y-6 md:space-y-8">
            <div className="space-y-2 md:space-y-3">
              <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold leading-tight max-w-[43rem] text-balance tracking-tight lg:leading-[1.1] xl:tracking-tighter">
                {t("title")} <br />
                <span className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold leading-tight text-transparent bg-clip-text bg-gradient-to-r w-fit from-[#0898f4] from-[0%] via-[#f34d7a] via-[70%] to-[#f95032]">
                  {t("highlight")}{" "}
                </span>
                {t("subtitle")}
              </h1>
              <p className="text-base md:text-lg lg:text-xl font-normal md:max-w-2xl max-w-xl text-foreground/80 leading-relaxed">
                {t("description")}
              </p>
            </div>
            <div className="space-x-2 md:space-x-3 rtl:space-x-reverse">
              <Link href="/docs/introduction">
                <Button className="h-9 px-4 text-sm font-medium lg:h-10 lg:px-6 lg:text-sm">
                  {t("getStarted")}
                </Button>
              </Link>
              <Link href={"/ui-blocks"}>
                <Button variant={"ghost"} className="h-9 px-4 text-sm font-medium lg:h-10 lg:px-6 lg:text-sm">
                  {t("browseBlocks")}
                </Button>
              </Link>
            </div>
          </section>
        </Container>
      </div>
    </PageTransition>
  )
}

export default Home
