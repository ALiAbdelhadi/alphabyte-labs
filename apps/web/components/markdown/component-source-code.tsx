"use client"

import Pre from "@/components/pre"
import { REGISTRY } from "@/registry"
import { useEffect, useState } from "react"
import { CodeBlockWrapper } from "../code-block-wrapper"
import LoadingIcon from "../icons/loading-icon"
import MdxBadge from "../markdown/mdx-badge"

export interface ComponentSourceProps {
  code?: string
  name: string
  variant?: string
}

export default function ComponentSource({
  code: providedCode,
  name,
  variant,
}: ComponentSourceProps) {
  const [componentCode, setComponentCode] = useState<string | null>(
    providedCode || null
  )
  const [isLoadingCode, setIsLoadingCode] = useState(false)
  const baseComponentName = name.replace("-demo", "")
  const componentVariant = variant || ""
  const fullComponentName = componentVariant
    ? `${baseComponentName}-${componentVariant}-demo`
    : `${baseComponentName}-demo`
  const registryComponent = REGISTRY.items.find(
    (item) => item.name === fullComponentName
  )
  const componentName = registryComponent?.baseComponent
  const componentPath = registryComponent?.componentPath
  useEffect(() => {
    if (providedCode || !componentPath) return
    setIsLoadingCode(true)
    const loadSourceMap = async () => {
      try {
        const module = await import(
          "@/registry/component-source-map.json"
        )
        const sourceMap = module.default as Record<string, string>
        const code = sourceMap[componentPath]
        if (code) {
          setComponentCode(code)
        } else {
          console.warn(`Source code not found for ${componentPath}`)
        }
      } catch (error) {
        console.error("Error loading source map:", error)
      } finally {
        setIsLoadingCode(false)
      }
    }
    loadSourceMap()
  }, [providedCode, componentPath])
  const ComponentUtilsText = () => {
    return (
      <p>
        Third, you need to create a new folder called{" "}
        <MdxBadge>component</MdxBadge> in you root directory and create a new
        file called <MdxBadge>{componentName}</MdxBadge>{" "}
      </p>
    )
  }
  return (
    <div className="space-y-3">
      <ComponentUtilsText />
      <CodeBlockWrapper>
        {componentCode ? (
          <Pre
            folderPath={componentPath}
            raw={componentCode}
            className="language-tsx pb-5"
          >
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
      </CodeBlockWrapper>
    </div>
  )
}
