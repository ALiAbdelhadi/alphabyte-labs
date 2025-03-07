"use client"

import { usePathname } from "next/navigation"

import SubLink from "@/components/navigation/sublink"
import { Routes } from "@/lib/pageRoutes"

const NEW_COMPONENTS = ["diagrams", "steps", "product-card"]

export default function DocsMenu({ isSheet = false }) {
  const pathname = usePathname()
  if (!pathname.startsWith("/docs")) return null

  return (
    <div className="flex flex-col gap-2.5 md:mt-0 mt-6 mb-14 md:mb-0">
      {Routes.map((item, index) => {
        if ("spacer" in item) {
          return (
            <div key={`spacer-${index}`} className="my-2 mr-3">
              <hr className="border-t border-border" />
            </div>
          )
        }
        return (
          <div key={item?.title + index} className="mb-2">
            <SubLink
              {...item}
              href={`/docs${item.href}`}
              level={0}
              isSheet={isSheet}
              isNew={(componentPath) => {
                const componentName = componentPath.split("/").pop() || ""
                return NEW_COMPONENTS.includes(componentName)
              }}
            />
          </div>
        )
      })}
    </div>
  )
}
