import { ReactNode } from "react"

import { Footer } from "@/components/navigation/footer"
import { Header } from "@/components/navigation/Header"
import { getDocsRouting } from "@/settings/docs-routing"

const MainLayout = async ({ children }: { children: ReactNode }) => {
  const docsConfig = await getDocsRouting()
  return (
    <div>
      <Header docsConfig={docsConfig} />
      <main role="main">{children}</main>
      <Footer />
    </div>
  )
}

export default MainLayout
