"use client"

import type { ReactElement } from "react"
import { useEffect, useRef } from "react"
import cn from "clsx"
import { CircleArrowUp } from "lucide-react"

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

  return (
    <button
      ref={ref}
      onClick={ScrollUp}
      className={cn("flex items-center ml-2 transition opacity-0", className)}
    >
      <CircleArrowUp className="inline-block w-[18px] h-[18px] mr-1 align-middle" />
      <span>Scroll to top</span>
    </button>
  )
}
