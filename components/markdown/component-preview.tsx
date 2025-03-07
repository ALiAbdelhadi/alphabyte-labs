"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/library/tabs"
import Pre from "@/components/ui/pre"
import { cn } from "@/lib/utils"
import { REGISTRY_COMPONENTS } from "@/registry-components"
import { Loader2 } from "lucide-react"
import dynamic from "next/dynamic"
import React from "react"
export default function ComponentPreview({ children, code, className, name }: ComponentPreviewProps) {
   if (!code) {
      return <div className={cn("mt-4", className)}>{children}</div>
   }
   const registryComponents = REGISTRY_COMPONENTS.items.find(item => item.name === name)
   const DynamicComponent = registryComponents
      ? dynamic(() => import(`@/registry-components/examples/${registryComponents.name}.tsx`), {
         loading: () => (
            <div className="flex w-full items-center justify-center text-sm text-muted-foreground gap-2">
               <Loader2 className="h-4 w-4 animate-spin" />
               Loading...
            </div>
         ),
      })
      : () => <div>Can't find component with name {name}</div>
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
                  <React.Suspense fallback={
                     <div className="flex w-full items-center justify-center text-sm text-muted-foreground">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Loading...
                     </div>
                  }>
                     {children ? (
                        <div className="preview flex min-h-[350px] w-full justify-center px-5 md:px-10 py-5 items-center">
                           {children}
                        </div>
                     ) : registryComponents ? (
                        <div className="preview flex min-h-[350px] w-full justify-center px-5 md:px-10 py-5 items-center">
                           <DynamicComponent />
                        </div>
                     ) : (
                        <div className="flex w-full items-center justify-center text-sm text-muted-foreground">
                           Can't find component with name {name}
                        </div>
                     )}
                  </React.Suspense>
               </div>
            </TabsContent>
            <TabsContent value="code">
               <Pre raw={code} className="language-tsx">
                  {code}
               </Pre>
            </TabsContent>
         </div>
      </Tabs>
   )
}