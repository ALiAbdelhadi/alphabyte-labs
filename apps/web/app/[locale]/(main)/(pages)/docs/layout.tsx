"use client"

import ContainerWrapper from "@/components/container-wrapper"
import { DocsNavigationOnMobile } from "@/components/navigation/docs-navigation-mobile"
import Sidebar from "@/components/navigation/sidebar"
import { MDXProvider } from "@mdx-js/react"
import type React from "react"

export default function Documents({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ContainerWrapper>
      <div className="px-4 container mx-auto ">
        <div className="flex items-start gap-6 lg:gap-14 transition-all">
          <Sidebar />
          <div className="flex-1 md:flex-[5] min-w-0 ">
            <MDXProvider>
              <div>{children}</div>
            </MDXProvider>
          </div>
        </div>
        <DocsNavigationOnMobile />
      </div>
    </ContainerWrapper>
  )
}
