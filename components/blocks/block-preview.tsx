"use client"

import Pre from "@/components/ui/pre"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { blocksWebsite } from "@/settings/settings"
import { Check, Clipboard, Fullscreen, Monitor, Smartphone, Tablet } from "lucide-react"
import { useCallback, useEffect, useState } from "react"
import { Separator } from "../ui/separator"

interface screenWidthProps {
   desktop: string,
   tablet: string,
   smartphone: string,
}
const CopyButton = ({ content }: { content: string }) => {
   const [isCopied, setIsCopied] = useState(false)
   const copyToClipboard = async () => {
      try {
         await navigator.clipboard.writeText(content)
         setIsCopied(true)
         setTimeout(() => setIsCopied(false), 20000)
      } catch (error) {
         console.error("Failed to copy:", error)
      }
   }
   return (
      <button className="flex items-center bg-muted shadow-sm py-3 md:py-2.5 px-3 rounded-[7px] space-x-1" onClick={copyToClipboard}>
         <span className="inline-block">
            {isCopied ?
               <Check className="w-4 h-4 text-green-500" />
               :
               <Clipboard className="w-4 h-4 text-gray-700 dark:text-gray-300" />
            }
         </span>
         <span className="font-medium text-xs text-nowrap hidden sm:block">Copy Code</span>
      </button>
   )
}

export default function BlockPreview({ children, code, className, id, BlockName, BlockId }: BlockPreview) {
   const [active, setActive] = useState("desktop")
   const [isFullScreen, setIsFullScreen] = useState(false)
   const [previewWidth, setPreviewWidth] = useState("100%")
   const [isLoaded, setIsLoaded] = useState(false)
   const screensWidth: screenWidthProps = {
      desktop: "100%",
      tablet: "768px",
      smartphone: "480px",
   }

   useEffect(() => {
      const updatePreviewWidth = () => {
         const windowWidth = window.innerWidth
         if (active === "desktop") {
            setPreviewWidth("100%")
         } else {
            const targetWidth = parseInt(screensWidth[active])
            setPreviewWidth(windowWidth < targetWidth ? "100%" : screensWidth[active])
         }
      }

      updatePreviewWidth()
      window.addEventListener("resize", updatePreviewWidth)
      return () => window.removeEventListener("resize", updatePreviewWidth)
   }, [active])

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
   useEffect(() => {
      const handleFullscreenChange = () => {
         setIsFullScreen(!!document.fullscreenElement);
      };
      document.addEventListener("fullscreenchange", handleFullscreenChange);
      return () => {
         document.removeEventListener("fullscreenchange", handleFullscreenChange);
      };
   }, []);
   if (!code) {
      return <div className={cn("mt-4", className)}>{children}</div>
   }
   const iframeSource = `${blocksWebsite}/blocks/${BlockId}`
   return (
      <Tabs defaultValue="preview" className="mt-4">
         <nav className="flex flex-row justify-between  md:gap-4 gap-2  items-center mb-4">
            <div className="flex items-center md:gap-4 gap-1 justify-start flex-row w-full">
               <div className="flex items-center md:gap-2 gap-1">
                  <h3 className="text-lg md:text-xl font-medium text-wrap text-gray-900 dark:text-gray-100">
                     {BlockName}
                  </h3>
                  <span className="inline-flex items-center gap-1 bg-teal-200 px-2 py-1 text-xs font-medium text-teal-800 rounded-lg select-none">Free</span>
               </div>
               <Separator orientation="vertical" className="shrink-0 bg-border w-[1.5px] h-5 md:block hidden" />
               <TabsList className="inline-flex h-9 items-center text-muted-foreground max-w-fit justify-start rounded-none bg-transparent">
                  <div className="bg-muted shadow-sm py-1 px-1 rounded-[7px] space-x-2 flex">
                     <TabsTrigger value="preview" className="active:shadow-none text-sm border-none rounded-[6px] sm:px-3 px-1">
                        Preview
                     </TabsTrigger>
                     <TabsTrigger value="code" className="active:shadow-none text-sm border-none rounded-[6px] sm:px-3 px-1">
                        Code
                     </TabsTrigger>
                  </div>
               </TabsList>
            </div>
            <div className="flex items-center md:flex-row flex-col gap-4">
               <div className="items-center bg-muted shadow-sm py-1 px-2 rounded-[7px] space-x-1 md:flex hidden">
                  {[
                     { id: "desktop", icon: <Monitor className="w-4 h-4" /> },
                     { id: "tablet", icon: <Tablet className="w-4 h-4" /> },
                     { id: "smartphone", icon: <Smartphone className="w-4 h-4" /> },
                  ].map((device) => (
                     <div key={device.id}>
                        <button
                           className={`p-1.5 rounded-[6px] transition ${active === device.id ? "bg-gray-200/60 dark:bg-muted-foreground/30" : "hover:bg-gray-100 dark:hover:bg-muted-foreground/10 "}`}
                           onClick={() => setActive(device.id)}
                        >
                           {device.icon}
                        </button>
                     </div>
                  ))}
                  <Separator orientation="vertical" className="shrink-0 bg-border w-[1.5px] h-5" />
                  <button
                     className="!ml-[7px]"
                     onClick={toggleFullScreen}
                     aria-label={isFullScreen ? "Exit full screen" : "Enter full screen"}
                  >
                     <Fullscreen className="w-4 h-4" />
                  </button>
               </div>
               <Separator orientation="vertical" className="shrink-0 bg-border w-[1.5px] h-5 md:block hidden" />
               <CopyButton content={code} />
            </div>
         </nav>
         <div className="not-prose">
            <TabsContent
               value="preview"
               className={cn("border rounded-xl transition-all duration-300", className, {
                  "mr-auto": active !== "desktop"
               })}
               style={{
                  width: previewWidth,
                  maxWidth: "100%",
                  overflowX: "auto"
               }}
            >
               <iframe className={"overflow-hidden preview min-h-[86.5vh] transition-all w-full"} id={id} src={iframeSource} sandbox="allow-scripts allow-same-origin " onLoad={() => setIsLoaded(true)} />
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