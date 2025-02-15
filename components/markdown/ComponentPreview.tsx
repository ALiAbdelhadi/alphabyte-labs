"use client"

import Pre from "@/components/ui/pre"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { Maximize2, Minimize2 } from "lucide-react"
import { useCallback, useState } from "react"

export default function ComponentPreview({ children, code, className, id }: ComponentPreviewProps) {
   const [isFullScreen, setIsFullScreen] = useState(false)
   const toggleFullScreen = useCallback(() => {
      const element = document.getElementById(id)
      if (!element) return
      if (!isFullScreen) {
         if (element.requestFullscreen) {
            element
               .requestFullscreen()
               .then(() => {
                  setIsFullScreen(true)
                  element.style.overflowY = "auto"
               })
               .catch(console.error)
         }
      } else {
         if (document.fullscreenElement) {
            document
               .exitFullscreen()
               .then(() => {
                  setIsFullScreen(false)
                  element.style.overflowY = ""
               })
               .catch(console.error)
         }
      }
   }, [id, isFullScreen])

   if (!code) {
      return <div className={cn("mt-4", className)}>{children}</div>
   }

   return (
      <Tabs defaultValue="preview" className="mt-4">
         <TabsList className="inline-flex h-9 items-center text-muted-foreground w-full justify-start rounded-none border-b bg-transparent p-0 mb-2">
            <TabsTrigger value="preview" className="active:shadow-none text-base">
               Preview
            </TabsTrigger>
            <TabsTrigger value="code" className="active:shadow-none text-base">
               Code
            </TabsTrigger>
         </TabsList>
         <div className="not-prose">
            <TabsContent value="preview" className={cn("border rounded-xl", className)}>
               <div className="overflow-hidden " id={id} >
                  <div className="py-2 px-4 bg-gray-100 dark:bg-gray-800 rounded-t-xl flex justify-end items-center">
                     <button
                        className="p-1.5 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
                        onClick={toggleFullScreen}
                        aria-label={isFullScreen ? "Exit full screen" : "Enter full screen"}
                     >
                        {isFullScreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
                     </button>
                  </div>
                  <div className="preview flex min-h-[350px] w-full justify-center p-10 items-center">{children}</div>
               </div>
            </TabsContent>
            <TabsContent value="code" className="rounded-xl">
               <Pre raw={code} className="language-tsx">
                  {code}
               </Pre>
            </TabsContent>
         </div>
      </Tabs>
   )
}

