"use client"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/library/tabs"
import Pre from "@/components/pre"
import { cn } from "@/lib/utils"
import { REGISTRY_COMPONENTS } from "@/registry-components"
import React, { useEffect, useState } from "react"
import LoadingIcon from "../icons/loading-icon"


const sourceMapCache: Record<string, string> = {}

export interface ComponentPreviewProps {
  code?: string
  className?: string
  name: string
  variant?: string
}

export default function ComponentPreview({
  code: providedCode,
  className,
  name,
  variant,
}: ComponentPreviewProps) {
  const [componentCode, setComponentCode] = useState<string | null>(providedCode || null)
  const [isLoadingCode, setIsLoadingCode] = useState<boolean>(false)

  const baseComponentName = name.replace("-demo", "")
  const componentVariant = variant || ""
  const fullComponentName = componentVariant
    ? `${baseComponentName}-${componentVariant}-demo`
    : `${baseComponentName}-demo`
  const registryComponent = REGISTRY_COMPONENTS.items.find(
    (item) => item.name === fullComponentName
  )
  const DynamicComponent = registryComponent?.component
  const componentDemoPath = registryComponent?.componentDemoPath

  useEffect(() => {
    if (providedCode || !componentDemoPath) return

    if (sourceMapCache[componentDemoPath]) {
      setComponentCode(sourceMapCache[componentDemoPath])
      return
    }

    setIsLoadingCode(true)
    import("@/registry-components/component-demo-source-map.json")
      .then(module => {
        const sourceMap = module.default
        Object.entries(sourceMap).forEach(([path, code]) => {
          sourceMapCache[path] = code as string
        })
        if (sourceMapCache[componentDemoPath]) {
          setComponentCode(sourceMapCache[componentDemoPath])
        } else {
          console.warn(`Source code not found for ${componentDemoPath}`)
        }
      })
      .catch(error => {
        console.error("Error loading source map:", error)
      })
      .finally(() => {
        setIsLoadingCode(false)
      })
  }, [providedCode, componentDemoPath])

  if (!registryComponent) {
    return <div className={cn("mt-4 w-full", className)}>Component not found</div>
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
        <TabsContent
          value="preview"
          className={cn("border rounded-xl relative", className)}
        >
          <div className="overflow-visible">
            <React.Suspense
              fallback={
                <div className="flex w-full min-h-[350px] items-center justify-center text-sm text-muted-foreground gap-2">
                  <LoadingIcon size={14} />
                  Loading...
                </div>
              }
            >
              {registryComponent ? (
                <div className="preview flex min-h-[350px] w-full justify-center px-5 md:px-10 py-5 items-center">
                  <DynamicComponent />
                </div>
              ) : (
                <div className="flex w-full items-center justify-center text-sm text-muted-foreground">
                  Component not found with name {fullComponentName}
                </div>
              )}
            </React.Suspense>
          </div>
        </TabsContent>
        <TabsContent value="code">
          {componentCode ? (
            <Pre raw={componentCode} className="language-tsx">
              {componentCode}
            </Pre>
          ) : isLoadingCode ? (
            <div className="flex w-full items-center justify-center text-sm text-muted-foreground p-4 gap-2">
              <LoadingIcon size={14} />
              Loading code...
            </div>
          ) : (
            <div className="flex w-full items-center justify-center text-sm text-muted-foreground p-4">
              No code available
            </div>
          )}
        </TabsContent>
      </div>
    </Tabs>
  )
}