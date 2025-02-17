"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { CodeBlockWrapperProps } from "@/types/components"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible"


export function CodeBlockWrapper({
   expandButtonTitle = "View Code",
   className,
   children,
   ...props
}: CodeBlockWrapperProps) {
   const [isOpened, setIsOpened] = React.useState(false)
   return (
      <Collapsible open={isOpened} onOpenChange={setIsOpened}>
         <div className={cn("relative overflow-hidden", className)} {...props}>
            <CollapsibleContent
               forceMount
               className={cn("overflow-hidden", !isOpened && "max-h-40 ")}
            >
               <div
                  className={cn(
                     "[&_pre]:my-0 [&_pre]:max-h-[650px] [&_pre]:pb-[100px] transition-colors",
                     !isOpened ? "[&_pre]:overflow-hidden" : "[&_pre]:overflow-auto]"
                  )}
               >
                  {children}
               </div>
            </CollapsibleContent>
            <div
               className={cn(
                  " absolute flex items-center justify-center p-2 z-10 rounded-md ",
                  isOpened ? "inset-x-0 bottom-5 h-12 bg-transparent" : "inset-0 top-[20px]  bg-gradient-to-t from-zinc-950/90 to-zinc-700/20"
               )}
            >
               <CollapsibleTrigger asChild>
                  <span className={cn("z-40 text-xs bg-[radial-gradient(rgba(0,0,0,0.14)_0%,rgba(255,255,255,0.12)_100%)] backdrop-blur-[5px] backdrop-brightness-125 backdrop-saturate-[1.8] text-gray-100 px-4 py-2 rounded-full shadow-md transition duration-300 ease-in-out relative cursor-pointer", isOpened ? "top-[-18px]" : "top-[27px]")}>
                     {isOpened ? "Collapse" : expandButtonTitle}
                  </span>
               </CollapsibleTrigger>
            </div>
         </div>
      </Collapsible>
   )
}