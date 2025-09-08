"use client"

import Pre from "@/components/pre"
import { REGISTRY } from "@/registry"
import { fixImport } from "@/scripts/fixImport.mjs"
import { useTranslations } from "next-intl"
import { useEffect, useState } from "react"
import { toast } from "sonner"
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
  const t = useTranslations("componentSource")
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
  const componentName = (registryComponent && 'baseComponent' in registryComponent) ? registryComponent.baseComponent : undefined
  const componentPath = (registryComponent && 'componentPath' in registryComponent) ? registryComponent.componentPath : undefined
  useEffect(() => {
    if (providedCode || !componentPath) return
    setIsLoadingCode(true)
    const loadSourceMap = async () => {
      try {
        const module = await import("@/registry/component-source-map.json")
        const sourceMap = module.default as Record<string, { content: string; language: string }>
        const code = sourceMap[componentPath]?.content
        if (code) {
          setComponentCode(code)
        } else {
          toast.warning(t("errors.sourceNotFound"))
        }
      } catch (error) {
        toast.error(t("errors.loadingError"))
      } finally {
        setIsLoadingCode(false)
      }
    }
    loadSourceMap()
  }, [providedCode, componentPath])
  const ComponentUtilsText = () => {
    return (
      <p>
        {t("text.description")}{" "}
        <MdxBadge>{t("text.componentFolder")}</MdxBadge>{t("text.inRootDirectory")}<MdxBadge>{componentName}</MdxBadge>{" "}
      </p>
    )
  }
  return (
    <div className="space-y-3">
      <ComponentUtilsText />
      <CodeBlockWrapper>
        {componentCode ? (
          <Pre
            folderPath={fixImport(componentPath ?? '')}
            raw={componentCode}
            className="language-tsx pb-5"
          >
            {componentCode}
          </Pre>
        ) : isLoadingCode ? (
          <div className="flex w-full items-center justify-center text-sm text-muted-foreground p-4 gap-2">
            <LoadingIcon size={14} />
            {t("loading.loadingCode")}
          </div>
        ) : (
          <div className="flex w-full items-center justify-center text-sm text-muted-foreground p-4">
            {t("loading.noCodeAvailable")}
          </div>
        )}
      </CodeBlockWrapper>
    </div>
  )
}
