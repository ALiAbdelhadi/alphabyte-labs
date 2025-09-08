import ContainerWrapper from "@/components/container-wrapper"
import { DocsNavigationOnMobile } from "@/components/navigation/docs-navigation-on-mobile"
import Sidebar from "@/components/navigation/sidebar"
import type React from "react"

type DocsLayoutProps = {
  children: React.ReactNode
  params: {
    locale: string
  }
}

export default function ComponentsLayout({
  children,
  params,
}: DocsLayoutProps) {
  const { locale } = params
  
  return (
    <ContainerWrapper>
      <div className="px-4 container mx-auto">
        <div className="flex items-start gap-6 lg:gap-14 transition-all">
          <Sidebar />
          <div className="flex-1 md:flex-[6] min-w-0 -mb-7 text-left rtl:text-right ">{children}</div>
        </div>
        <DocsNavigationOnMobile />
      </div>
    </ContainerWrapper>
  )
}