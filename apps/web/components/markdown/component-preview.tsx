"use client"

import Pre from "@/components/pre"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/custom-tabs"
import { cn } from "@/lib/utils"
import { REGISTRY } from "@/registry"
import React, { useEffect, useState } from "react"
import LoadingIcon from "../icons/loading-icon"

export interface ComponentPreviewProps {
  code?: string
  className?: string
  name: string
  variant?: string
  showLineNumbers?: boolean
  maxHeight?: number
  highlightLines?: number[]
}

export default function ComponentPreview({
  code: providedCode,
  className,
  name,
  variant,
  showLineNumbers = true,
  maxHeight = 500,
  highlightLines = []
}: ComponentPreviewProps) {
  const [componentCode, setComponentCode] = useState<string | null>(providedCode || null)
  const [isLoadingCode, setIsLoadingCode] = useState<boolean>(false)

  const baseComponentName = name.replace("-demo", "")
  const componentVariant = variant || ""
  const fullComponentName = componentVariant
    ? `${baseComponentName}-${componentVariant}-demo`
    : `${baseComponentName}-demo`

  const registryComponent = REGISTRY.items.find((item) => item.name === fullComponentName)

  const DynamicComponent = (registryComponent && 'component' in registryComponent) ? registryComponent.component : undefined
  const componentDemoPath = (registryComponent && 'componentDemoPath' in registryComponent) ? registryComponent.componentDemoPath : undefined

  useEffect(() => {
    if (providedCode || !componentDemoPath) return

    setIsLoadingCode(true)

    async function loadSourceCode() {
      try {
        const module = await import("@/registry/component-demo-source-map.json")
        const sourceMap = module.default as Record<string, { content: string; language: string }>

        if (componentDemoPath && sourceMap[componentDemoPath]) {
          setComponentCode(sourceMap[componentDemoPath].content)
        } else {
          console.warn(`Source code not found for ${componentDemoPath}`)
        }
      } catch (error) {
        console.error("Error loading source map:", error)
      } finally {
        setIsLoadingCode(false)
      }
    }

    loadSourceCode()
  }, [providedCode, componentDemoPath])

  if (!registryComponent) {
    return (
      <div className={cn("mt-4 w-full", className)}>
        <div className="flex items-center justify-center p-8 border rounded-lg bg-muted/20">
          <p className="text-sm text-muted-foreground">Component "{fullComponentName}" not found</p>
        </div>
      </div>
    )
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
        <TabsContent value="preview" className={cn("border rounded-xl relative", className)}>
          <div className="overflow-visible">
            <React.Suspense
              fallback={
                <div className="flex w-full min-h-[350px] items-center justify-center text-sm text-muted-foreground gap-2">
                  <LoadingIcon size={16} />
                  Loading component...
                </div>
              }
            >
              {DynamicComponent ? (
                <div className="preview flex min-h-[350px] w-full justify-center px-5 md:px-10 py-5 items-center">
                  <DynamicComponent className="" />
                </div>
              ) : (
                <div className="flex w-full min-h-[350px] items-center justify-center text-sm text-muted-foreground">
                  <div className="text-center">
                    <p>Component not found</p>
                    <p className="text-xs mt-1 opacity-70">{fullComponentName}</p>
                  </div>
                </div>
              )}
            </React.Suspense>
          </div>
        </TabsContent>

        <TabsContent value="code" className="mt-0">
          {componentCode ? (
            <Pre
              raw={componentCode}
              className="language-tsx"
              showLineNumbers={showLineNumbers}
              folderPath={componentDemoPath}
              title={`${fullComponentName}.tsx`}
              maxHeight={maxHeight}
              showHeader={true}
              highlightLines={highlightLines}
              enableSearch={true}
            >
              {componentCode}
            </Pre>
          ) : isLoadingCode ? (
            <div className="flex w-full items-center justify-center text-sm text-muted-foreground p-12 gap-2 border rounded-lg bg-muted/10 dark:bg-muted/5">
              <LoadingIcon size={16} />
              Loading source code...
            </div>
          ) : (
            <div className="flex w-full items-center justify-center text-sm text-muted-foreground p-12 border rounded-lg bg-muted/10 dark:bg-muted/5">
              <div className="text-center">
                <p>No source code available</p>
                <p className="text-xs mt-1 opacity-70">for {fullComponentName}</p>
              </div>
            </div>
          )}
        </TabsContent>
      </div>
    </Tabs>
  )
}
