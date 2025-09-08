"use client"

import { usePathname } from "next/navigation"
import DocsSidebarItem from "./docs-sidebar-item"
import type { SidebarItem } from "@/types"

const NEW_COMPONENTS = ["diagrams", "steps", "product-card"]

interface DocsSidebarProps {
  config: SidebarItem[]
  isSheet?: boolean
}

export function DocsSidebar({ config, isSheet = false }: DocsSidebarProps) {
  const pathname = usePathname()
  if (!pathname.includes("/docs")) return null

  const isNewComponent = (href: string) => {
    const componentName = href.split("/").pop() || ""
    return NEW_COMPONENTS.includes(componentName)
  }

  return (
    <div className="flex flex-col gap-2.5 md:mt-0 my-6 md:mb-0 transition-all">
      <div>
        {config.map((section, sectionIndex) => {
          if ("spacer" in section) {
            return (
              <div
                key={`spacer-${sectionIndex}`}
                className="my-2 ltr:mr-3 rtl:ml-3"
              >
                <hr className="border-t border-border" />
              </div>
            )
          }
          const sectionTitle = section.title
          return (
            <div key={`section-${sectionIndex}`} className="mb-4">
              <div className="font-semibold text-foreground/70 text-[1rem] md:text-[15px] mb-2 px-2 rtl:text-right ltr:text-left flex items-end rtl:flex-row-reverse">
                {sectionTitle}
              </div>
              <ul className="space-y-[2px]">
                {section.items?.map((item, itemIndex) => (
                  <li
                    key={`item-${sectionIndex}-${itemIndex}`}
                    className="rtl:text-right ltr:text-left"
                  >
                    <DocsSidebarItem
                      {...item}
                      level={0}
                      isSheet={isSheet}
                      isNew={isNewComponent}
                      sectionHref={section.href}
                    />
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default DocsSidebar