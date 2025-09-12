import ContainerWrapper from "@/components/container-wrapper"
import { DocsNavigationOnMobile } from "@/components/navigation/docs-navigation-on-mobile"
import Sidebar from "@/components/navigation/sidebar"
import { getDocsRouting } from "@/settings/docs-routing"
import type React from "react"

type DocsLayoutProps = {
  children: React.ReactNode
  params: Promise<{
    locale: string
  }>
}

export default async function ComponentsLayout({
  children,
  params,
}: DocsLayoutProps) {
  const { locale } = await params
  const docsConfig = await getDocsRouting()

  return (
    <ContainerWrapper>
      <DocsNavigationOnMobile config={docsConfig.sidebarItems} />
      <div className="px-4 container mx-auto">
        <div className="flex items-start gap-6 lg:gap-14 transition-all">
          <Sidebar />
          <div className="flex-1 md:flex-[6] min-w-0 -mb-7 text-left rtl:text-right ">{children}</div>
        </div>
      </div>
    </ContainerWrapper>
  )
}