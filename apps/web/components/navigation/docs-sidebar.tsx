"use client"

import { usePathname } from "next/navigation"
import { DocsConfig, DocsRouting } from "@/settings/docs-routing"
import DocsSidebarItem from "./docs-sidebar-item"

const NEW_COMPONENTS = ["diagrams", "steps", "product-card"]

export function DocsSidebar({
  isSheet = false,
  config,
}: {
  config: DocsConfig
  isSheet?: boolean
}) {
  const pathname = usePathname()
  if (!pathname.includes("/docs")) return null
  const isNewComponent = (href: string) => {
    const componentName = href.split("/").pop() || ""
    return NEW_COMPONENTS.includes(componentName)
  }

  return (
    <div className="flex flex-col gap-2.5 md:mt-0 my-6 md:mb-0 transition-all">
      <div>
        {DocsRouting.sidebarItems.map((section, sectionIndex) => {
          if ("spacer" in section) {
            return (
              <div
                key={`spacer-${sectionIndex}`}
                className="my-2 mr-3 rtl:mr-0 rtl:ml-3"
              >
                <hr className="border-t border-border" />
              </div>
            )
          }
          const sectionTitle = section.title
          return (
            <div key={`section-${sectionIndex}`} className="mb-4">
              <div className="font-semibold text-foreground/70 text-[1rem] md:text-[15px] mb-2 rtl:text-right px-2">
                {sectionTitle}
              </div>
              <ul className="space-y-[2px]">
                {section.items?.map((item, itemIndex) => (
                  <li
                    key={`item-${sectionIndex}-${itemIndex}`}
                    className="rtl:text-right"
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
