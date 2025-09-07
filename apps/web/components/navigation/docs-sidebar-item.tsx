"use client"

import { SheetClose } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { SidebarItem } from "@/types"
import { Link } from "@/i18n/navigation"
import { usePathname } from "next/navigation"

interface DocsSidebarItemProps extends SidebarItem {
  level: number
  isSheet?: boolean
  isNew: (href: string) => boolean
  sectionHref?: string
  activeClassName?: string
}

export default function DocsSidebarItem(props: DocsSidebarItemProps) {
  const {
    title,
    href,
    items,
    id,
    level,
    isSheet = false,
    isNew,
    sectionHref,
  } = props
  const pathname = usePathname()
  const fullHref = sectionHref ? `/docs/${sectionHref}${href}` : `/docs${href}`
  const isActive = pathname.endsWith(href || "") || pathname === fullHref
  const isNewComponent = href ? isNew(href) : false
  const itemKey = title?.replace(/^\//, "") || ""

  const content = (
    <div className={cn("space-x-3 flex")}>
      <span className="text-[1rem] md:text-sm text-primary capitalize">
        {itemKey}
      </span>
      {isNewComponent && (
        <span className="inline-flex items-center gap-1 bg-teal-200 px-1.5 py-0.5 text-xs font-medium text-teal-900 dark:text-teal-950 rounded-lg select-none">
          New
        </span>
      )}
    </div>
  )

  const linkContent = (
    <Link href={fullHref} className="block text-sm">
      {content}
    </Link>
  )

  const finalContent = isSheet ? (
    <SheetClose asChild>{linkContent}</SheetClose>
  ) : (
    linkContent
  )

  if (!items || items.length === 0) {
    return (
      <div
        className={cn(
          "flex flex-col text-[1rem] md:text-sm transition-all text-foreground font-medium h-8 justify-center hover:bg-accent/80  w-full rounded-lg",
          isActive
            ? "!text-primary bg-accent"
            : "text-foreground hover:text-primary"
        )}
      >
        <span className="mx-2">{finalContent}</span>
      </div>
    )
  }
  return (
    <div className="flex flex-col w-full gap-1">
      <div>
        <div className="flex items-center gap-2 text-[1rem] md:text-sm px-2 text-foreground">
          {finalContent}
        </div>
        <div className="mt-3">
          <ul>
            {items.map((childItem, index) => {
              return (
                <DocsSidebarItem
                  key={childItem.href || `${title}-${index}`}
                  {...childItem}
                  level={level + 1}
                  isSheet={isSheet}
                  isNew={isNew}
                  sectionHref={sectionHref}
                />
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}
