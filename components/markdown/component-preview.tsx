"use client"

import { REGISTRY_COMPONENTS } from "@/registry-components"
import dynamic from "next/dynamic"
import React, { useCallback, useEffect, useRef, useState } from "react"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/library/tabs"
import Pre from "@/components/pre"
import { cn } from "@/lib/utils"
import LoadingIcon from "../icons/loading-icon"

const codeCache: Record<string, { code: string; timestamp: number }> = {}
const CACHE_TTL = 5 * 60 * 1000

export interface ComponentPreviewProps {
  children?: React.ReactNode
  code?: string
  className?: string
  name: string
  variant?: string
}

export default function ComponentPreview({
  children,
  code: providedCode,
  className,
  name,
  variant,
}: ComponentPreviewProps) {
  const [code, setCode] = useState<string | null>(providedCode || null)
  const [isLoadingCode, setIsLoadingCode] = useState<boolean>(false)
  const abortControllerRef = useRef<AbortController | null>(null)
  const baseComponentName = name.replace("-demo", "")
  const componentVariant = variant || ""
  const fullComponentName = componentVariant
    ? `${baseComponentName}-${componentVariant}-demo`
    : `${baseComponentName}-demo`
  console.log(REGISTRY_COMPONENTS.items)
  const registryComponents = REGISTRY_COMPONENTS.items.find(
    (item) => item.name === fullComponentName
  )
  const fetchComponentCode = useCallback(async () => {
    if (providedCode || !registryComponents) return
    const cacheKey = `${baseComponentName}-${registryComponents.name}`
    const now = Date.now()
    if (
      codeCache[cacheKey] &&
      now - codeCache[cacheKey].timestamp < CACHE_TTL
    ) {
      setCode(codeCache[cacheKey].code)
      return
    }
    setIsLoadingCode(true)
    try {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
      abortControllerRef.current = new AbortController()

      const responseData = await fetch(
        `/api/get-component-code?name=${registryComponents.name}&baseComponent=${baseComponentName}`,
        { signal: abortControllerRef.current.signal }
      )

      const data = await responseData.json()

      if (data.code) {
        codeCache[cacheKey] = {
          code: data.code,
          timestamp: now,
        }

        setCode(data.code)
      }
    } catch (error) {
      if ((error as Error).name !== "AbortError") {
        console.error("Error fetching component code:", error)
      }
    } finally {
      setIsLoadingCode(false)
    }
  }, [providedCode, registryComponents, baseComponentName])

  const DynamicComponent = registryComponents?.name
    ? dynamic(
      async () => {
        const folderName = `${baseComponentName}-demo`
        try {
          return await import(
            `@/registry-components/examples/${folderName}/${registryComponents.name}.tsx`
          )
        } catch {
          try {
            return await import(
              `@/registry-components/examples/${registryComponents.name}.tsx`
            )
          } catch {
            return () => <div>Component not found</div>
          }
        }
      },
      {
        loading: () => (
          <div className="flex w-full items-center justify-center text-sm text-muted-foreground gap-2">
            <LoadingIcon size={14} />
            Loading...
          </div>
        ),
        ssr: false,
      }
    )
    : () => <div>Component not found with name {fullComponentName}</div>

  useEffect(() => {
    fetchComponentCode()
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [fetchComponentCode])

  if (!registryComponents && !children) {
    return <div className={cn("mt-4", className)}>Component not found</div>
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
                <div className="flex w-full items-center justify-center text-sm text-muted-foreground">
                  <LoadingIcon size={14} />
                  Loading...
                </div>
              }
            >
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
                  Component not found with name {fullComponentName}
                </div>
              )}
            </React.Suspense>
          </div>
        </TabsContent>
        <TabsContent value="code">
          {code ? (
            <Pre raw={code} className="language-tsx">
              {code}
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