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
  const [componentCode, setComponentCode] = useState<string | null>(
    providedCode || null
  )
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

    setIsLoadingCode(true)

    async function loadSourceCode() {
      try {
        const module = await import(
          "@/registry-components/component-demo-source-map.json"
        )
        const sourceMap = module.default as Record<string, string>
        const code = sourceMap[componentDemoPath]
        if (code) {
          setComponentCode(code)
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
      <div className={cn("mt-4 w-full", className)}>Component not found</div>
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
              {DynamicComponent ? (
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
