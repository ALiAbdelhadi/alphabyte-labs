"use client"

import type React from "react"
import { MDXProvider } from "@mdx-js/react"

import ContainerWrapper from "@/components/container-wrapper"
import { DocsNavigationOnMobile } from "@/components/navigation/docs-navigation-on-mobile"
import Sidebar from "@/components/navigation/sidebar"

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
          <div className="flex-1 md:flex-[6] min-w-0 -mb-7">
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
