"use client"

import cn from "clsx"
import { CircleArrowUp } from "lucide-react"
import { useTranslations } from "next-intl"
import type { ReactElement } from "react"
import { useEffect, useRef } from "react"

function ScrollUp() {
  if (typeof window !== "undefined") {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }
}

export function BackToTop({ className }: { className?: string }): ReactElement {
  const ref = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    function toggleVisible() {
      const { scrollTop } = document.documentElement
      if (ref.current) {
        ref.current.classList.toggle("opacity-0", scrollTop < 200)
      }
    }

    window.addEventListener("scroll", toggleVisible)
    return () => {
      window.removeEventListener("scroll", toggleVisible)
    }
  }, [])
  const translate = useTranslations("scroll")
  return (
    <button
      ref={ref}
      onClick={ScrollUp}
      className={cn("flex items-center gap-1 transition opacity-0", className)}
    >
      <CircleArrowUp className="inline-block w-[16px] h-[16px] mr-1 align-middle" />
      <span>{translate("heading")}</span>
    </button>
  )
}
