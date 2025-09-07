import Container from "@/components/Container"
import { Button } from "@/components/ui/button"
import { Link } from "@/i18n/navigation"
import { useTranslations } from "next-intl"

const Home = () => {
  const t = useTranslations("home")

  return (
    <div className="min-h-[81.6vh] py-10 md:py-14">
      <Container>
        <section className="my-10 md:my-12 space-y-6 md:space-y-8">
          <div className="space-y-2 md:space-y-3">
            <h1 className="text-[1.4rem] md:text-2xl lg:text-3xl xl:text-4xl font-bold leading-tight max-w-3xl">
              {t("title")} <br />
              <span className="text-[1.4rem] md:text-2xl lg:text-3xl xl:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r w-fit from-[#0898f4] from-[0%] via-[#f34d7a] via-[70%] to-[#f95032]">
                {t("highlight")}{" "}
              </span>
              {t("subtitle")}
            </h1>
            <p className="text-base md:text-lg font-normal md:max-w-2xl max-w-lg text-foreground opacity-80">
              {t("description")}
            </p>
          </div>
          <div className="space-x-2 md:space-x-3 rtl:space-x-reverse">
            <Link href="/docs/introduction">
              <Button className="lg:h-11 lg:px-8 px-4 h-[2.2rem]">
                {t("getStarted")}
              </Button>
            </Link>
            <Link href={"/ui-blocks"}>
              <Button variant={"ghost"} className="lg:h-11 lg:px-8 px-4 h-[2.2rem]">
                {t("browseBlocks")}
              </Button>
            </Link>
          </div>
        </section>
      </Container>
    </div>
  )
}

export default Home
