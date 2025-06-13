"use client"

import { cn } from "@/lib/utils"
import type { CodeBlockWrapperProps } from "@/types/components"
import gsap from "gsap"
import * as React from "react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible"

export function CodeBlockWrapper({
  expandButtonTitle = "View Code",
  className,
  children,
  ...props
}: CodeBlockWrapperProps) {
  const [isOpened, setIsOpened] = React.useState(false)
  const contentRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (contentRef.current) {
      if (isOpened) {
        gsap.to(contentRef.current, {
          height: "auto",
          duration: 0.3,
          ease: "power2.out",
        })
      } else {
        gsap.to(contentRef.current, {
          height: "180px",
          duration: 0.3,
          ease: "power2.out",
        })
      }
    }
  }, [isOpened])

  return (
    <Collapsible open={isOpened} onOpenChange={setIsOpened}>
      <div
        className={cn("relative overflow-hidden rounded-xl border border-border/50 shadow-sm", className)}
        {...props}
      >
        <CollapsibleContent forceMount className="overflow-hidden">
          <div ref={contentRef} className="overflow-hidden max-h-[650px] transition-all duration-300 ease-out">
            {children}
          </div>
        </CollapsibleContent>
        <div
          className={cn(
            "absolute flex items-center justify-center p-2 z-10 rounded-xl transition-all duration-300 ease-out",
            isOpened
              ? "inset-x-0 bottom-5 h-12 bg-transparent"
              : "inset-0 bg-gradient-to-t from-background/95 via-background/60 to-transparent dark:from-background/98 dark:via-background/70",
          )}
        >
          <CollapsibleTrigger asChild>
            <span
              className={cn(
                "z-40 text-xs bg-[radial-gradient(rgba(0,0,0,0.14)_0%,rgba(255,255,255,0.12)_100%)] backdrop-blur-[5px] backdrop-brightness-125 backdrop-saturate-[1.8] text-foreground px-4 py-2 rounded-full shadow-md transition duration-300 ease-in-out relative cursor-pointer",
                isOpened ? "top-[-18px]" : "top-[27px]"
              )}
            >
              {isOpened ? "Collapse" : expandButtonTitle}
            </span>
          </CollapsibleTrigger>
        </div>
      </div>
    </Collapsible>
  )
}
