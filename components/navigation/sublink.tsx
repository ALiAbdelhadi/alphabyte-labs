"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"

import { Paths } from "@/lib/pageRoutes"
import { cn } from "@/lib/utils"
import { SheetClose } from "@/components/ui/sheet"
import Anchor from "@/components/navigation/anchor"

function isRoute(
  item: Paths
): item is Extract<Paths, { title: string; href: string }> {
  return "title" in item && "href" in item
}

export default function SubLink(
  props: Paths & {
    level: number
    isSheet: boolean
    isNew: (href: string) => boolean
  }
) {
  const { title, href, items, noLink, level, isSheet, isNew } = props

  if (!isRoute(props)) {
    return null
  }

  const isNewComponent = isNew(href)

  const Comp = (
    <Anchor className="text-sm " href={href}>
      <div className="space-x-3">
        <span className="text-[1rem] md:text-sm">{title}</span>
        {isNewComponent && (
          <span className="inline-flex items-center gap-1 bg-teal-200 px-1.5 py-0.5 text-xs font-medium text-teal-900 dark:text-teal-950 rounded-lg select-none">
            New
          </span>
        )}
      </div>
    </Anchor>
  )

  const titleOrLink = !noLink ? (
    isSheet ? (
      <SheetClose asChild>{Comp}</SheetClose>
    ) : (
      Comp
    )
  ) : (
    <h2 className="font-semibold text-primary text-[1rem] md:text-[15px]">
      {title}
    </h2>
  )

  if (!items) {
    return (
      <div className="flex flex-col text-[1rem] md:text-sm transition-all text-foreground font-medium h-8 justify-center hover:md:bg-gray-100 dark:hover:bg-muted-foreground/10 w-full rounded-lg">
        <span className="md:mx-2">{titleOrLink}</span>
      </div>
    )
  }

  return (
    <div className="flex flex-col w-full gap-1">
      <div>
        <div className="flex items-center gap-2 text-[1rem] md:text-sm md:px-2">
          {titleOrLink}
        </div>
        <div className="mt-3">
          <ul
            className={cn(
              "flex flex-col items-start text-sm",
              level > 0 && "ml-1 pl-4"
            )}
          >
            {items.map((innerLink) => {
              if (!isRoute(innerLink)) {
                return null
              }
              return (
                <SubLink
                  key={innerLink.href}
                  {...innerLink}
                  href={`${href}${innerLink.href}`}
                  level={level + 1}
                  isSheet={isSheet}
                  isNew={isNew}
                />
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}
