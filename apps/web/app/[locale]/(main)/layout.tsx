import { Footer } from "@/components/navigation/footer"
import { Header } from "@/components/navigation/Header"
import OneShotTransition from "@/components/ui/oneshot-transition"
import { getDocsRouting } from "@/settings/docs-routing"
import { ReactNode, Suspense } from "react"

const MainLayout = async ({ children }: { children: ReactNode }) => {
  const docsConfig = await getDocsRouting()
  return (
    <div>
      <Header docsConfig={docsConfig} />
      <main role="main">
        <Suspense>
          {children}
        </Suspense>
      </main>
      <OneShotTransition from={{ opacity: 0, y: 8 }} to={{ opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }}>
        <Footer />
      </OneShotTransition>
    </div>
  )
}

export default MainLayout
