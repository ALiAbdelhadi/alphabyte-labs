import { ReactNode, Suspense } from "react"

import { Footer } from "@/components/navigation/footer"
import { Header } from "@/components/navigation/Header"
import OneShotTransition from "@/components/ui/oneshot-transition"
import PageTransition from "@/components/ui/page-transition"
import { getDocsRouting } from "@/settings/docs-routing"

const MainLayout = async ({ children }: { children: ReactNode }) => {
  const docsConfig = await getDocsRouting()
  return (
    <div>
        <Header docsConfig={docsConfig} />
      <main role="main">
        <PageTransition>
          <Suspense>
            {children}
          </Suspense>
        </PageTransition>
      </main>
      <OneShotTransition from={{ opacity: 0, y: 8 }} to={{ opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }}>
        <Footer />
      </OneShotTransition>
    </div>
  )
}

export default MainLayout
