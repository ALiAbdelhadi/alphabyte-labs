"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/library/Tab"
import Pre from "@/components/ui/pre"
import { cn } from "@/lib/utils"
import { ComponentPreviewProps } from "@/types"

export default function ComponentPreview({ children, code, className }: ComponentPreviewProps) {
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
               <div className="overflow-hidden">
                  <div className="preview flex min-h-[350px] w-full justify-center px-5 md:px-10 py-5 items-center">
                     {children}
                  </div>
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

