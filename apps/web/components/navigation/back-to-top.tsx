"use client"

import type { ReactElement } from "react"
import { useEffect, useRef } from "react"
import cn from "clsx"
import { CircleArrowUp } from "lucide-react"
import { useTranslations } from "next-intl"

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
  const t = useTranslations("scroll-to-top")
  return (
    <button
      ref={ref}
      onClick={ScrollUp}
      className={cn("flex items-center transition opacity-0 !mt-4", className)}
    >
      <CircleArrowUp className="inline-block w-[18px] h-[18px] mr-1 rtl:ml-1 align-middle" />
      <span>{t("description")}</span>
    </button>
  )
}
