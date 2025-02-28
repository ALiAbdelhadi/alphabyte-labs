import Container from "@/components/Container"
import ContainerWrapper from "@/components/container-wrapper"
import { DocsNavigationOnMobile } from "@/components/navigation/DocsNavigationOnMobile"
import Sidebar from "@/components/navigation/sidebar"
import type React from "react"

export default function Documents({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ContainerWrapper>
      <Container>
        <div className="flex items-start gap-14">
          <Sidebar />
          <div className="flex-1 md:flex-[6] min-w-0">{children}</div>
        </div>
        <DocsNavigationOnMobile />
      </Container>
    </ContainerWrapper>
  )
}

