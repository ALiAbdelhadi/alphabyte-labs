"use client"

import { cn } from "@/lib/utils"

import type React from "react"
import { SheetProvider, useSheet } from "@/hooks/SheetContext"
import { useEffect } from "react"

const BodyWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
   const { isOpen } = useSheet()
   useEffect(() => {
      if (isOpen) {
         document.body.classList.add("bg-black", "dark:border-gray-50")
      } else {
         document.body.classList.add("transition-transform")
         document.body.classList.remove("bg-black")
      }
   }, [isOpen])
   return <div
      className={cn(
         "transition-all duration-500 ease-in-out origin-top",
         isOpen &&
         "lg:scale-[0.963276836158192] md:scale-[0.94] scale-[0.91] translate-y-[calc(env(safe-area-inset-top)+14px)] rounded-lg overflow-hidden",
      )}
      style={{
         transitionProperty: "transform, border-radius",
         transitionTimingFunction: "cubic-bezier(0.32, 0.72, 0, 1)",
      }}
   >
      {children}
   </div>
}

export const SheetWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
   return (
      <SheetProvider>
         <BodyWrapper>{children}</BodyWrapper>
      </SheetProvider>
   )
}

