"use client"

import Pre from "@/components/ui/pre"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { Clipboard, Monitor, Smartphone, Tablet, Fullscreen } from "lucide-react"
import { useCallback, useState } from "react"
import { Separator } from "../ui/separator"
export default function BlockPreview({ children, code, className, id, BlockName }: BlockPreview) {
   const [active, setActive] = useState("desktop");
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
         <nav className="flex justify-between mb-4">
            <div className="flex md:items-center items-start gap-4 flex-col md:flex-row w-full ">
               <div className="flex items-center gap-2">
                  <h3 className="text-xl font-medium leading-5 text-gray-900 dark:text-gray-200">
                     {BlockName}
                  </h3>
                  <span className="inline-flex items-center gap-1 bg-teal-200 px-2 py-1 text-xs font-medium text-teal-800 rounded-lg">Free</span>
               </div>
               <Separator orientation="vertical" className="shrink-0 bg-border w-[1.5px] h-5 md:block hidden" />
               <TabsList className="inline-flex h-9 items-center text-muted-foreground max-w-fit justify-start rounded-none bg-transparent ">
                  <div className="bg-muted shadow-sm py-1 px-2 rounded-[7px] space-x-1">
                     <TabsTrigger value="preview" className="active:shadow-none text-sm border-none rounded-[6px] ">
                        Preview
                     </TabsTrigger>
                     <TabsTrigger value="code" className="active:shadow-none text-sm  border-none  rounded-[6px]">
                        Code
                     </TabsTrigger>
                  </div>
               </TabsList>
            </div>
            <div className="flex items-center space-x-3">
               <div className="md:flex hidden items-center bg-muted shadow-sm py-1 px-2 rounded-[7px] space-x-1">
                  {[
                     { id: "desktop", icon: <Monitor className="w-4 h-4" /> },
                     { id: "tablet", icon: <Tablet className="w-4 h-4" /> },
                     { id: "mobile", icon: <Smartphone className="w-4 h-4" /> },
                  ].map((device) => (
                     <div key={device.id}>
                        <button
                           key={device.id}
                           className={`p-1.5 rounded-[6px] transition ${active === device.id ? "bg-gray-200/60" : "hover:bg-gray-100"
                              }`}
                           onClick={() => setActive(device.id)}
                        >
                           {device.icon}
                        </button>
                     </div>
                  ))}
                  <Separator orientation="vertical" className="shrink-0 bg-border w-[1.5px] h-5" />
                  <button className="!ml-[7px]">
                     <Fullscreen className="w-4 h-4" />
                  </button>
               </div>
               {/* Divider */}
               <Separator orientation="vertical" className="shrink-0 bg-border w-[1.5px] h-5 md:block hidden" />
               {/* Copy Code Button */}
               <button className="flex items-center bg-muted shadow-sm py-2.5 px-3 rounded-[7px] space-x-1 w-full">
                  <span className="inline-block">
                     <Clipboard className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                  </span>
                  <span className="font-medium text-xs text-nowrap md:block hidden">Copy Code</span>
               </button>
            </div>
         </nav>
         <div className="not-prose">
            <TabsContent value="preview" className={cn("border rounded-xl", className)}>
               <div className="overflow-hidden " id={id} >
                  <div className="preview flex w-full justify-center p-10 items-center">{children}</div>
               </div>
            </TabsContent>
            <TabsContent value="code" className="rounded-xl">
               <Pre raw={code} className="language-tsx">
                  {code}
               </Pre>
            </TabsContent>
         </div>
      </Tabs >
   )
}

