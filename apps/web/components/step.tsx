"use client"

import { cn, convertToArabicNumerals } from "@/lib/utils"
import type { StepItemProps, StepProps } from "@/types/components"
import { useLocale } from "next-intl"
import { Children, type PropsWithChildren } from "react"

export function Step({ children, className }: PropsWithChildren<StepProps>) {
  const length = Children.count(children)
  const locale = useLocale()

  return (
    <div className={cn("flex flex-col w-full relative", className)}>
      {Children.map(children, (child, index) => (
        <div className="relative ltr:pl-10 rtl:pr-10">
          {index < length - 1 && (
            <span className="absolute ltr:left-4 rtl:right-4 top-8 w-px h-full bg-zinc-200 dark:bg-zinc-700" />
          )}
          <span className="absolute ltr:left-0 rtl:right-0 top-1 w-8 h-8 flex items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-sm font-medium">
            {locale === "ar" ? convertToArabicNumerals(index + 1) : (index + 1).toString()}
          </span>
          <div className="pb-8">{child}</div>
        </div>
      ))}
    </div>
  )
}

export function StepItem({ children, title, className }: StepItemProps) {
  return (
    <div className={cn("space-y-3", className)}>
      {title && <h3 className="text-base md:text-lg font-medium text-zinc-900 dark:text-zinc-50">{title}</h3>}
      <div className="text-sm md:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed !-mt-0">
        <div className="space-y-2">{children}</div>
      </div>
    </div>
  )
}
