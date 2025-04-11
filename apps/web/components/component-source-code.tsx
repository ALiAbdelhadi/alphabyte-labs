"use client"

import Pre from "@/components/pre"
import {REGISTRY_COMPONENTS} from "@/registry-components"
import {useEffect, useState} from "react"
import {CodeBlockWrapper} from "./code-block-wrapper"
import LoadingIcon from "./icons/loading-icon"
import MdxBadge from "./markdown/mdx-badge"
import {useTranslations} from "next-intl";

const sourceMapCache: Record<string, string> = {}

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
    const [componentCode, setComponentCode] = useState<string | null>(providedCode || null)
    const [isLoadingCode, setIsLoadingCode] = useState(false)
    const baseComponentName = name.replace("-demo", "")
    const componentVariant = variant || ""
    const fullComponentName = componentVariant
        ? `${baseComponentName}-${componentVariant}-demo`
        : `${baseComponentName}-demo`
    const registryComponent = REGISTRY_COMPONENTS.items.find(
        (item) => item.name === fullComponentName
    )
    const componentName = registryComponent?.baseComponent
    const componentPath = registryComponent?.componentPath
    useEffect(() => {
        if (providedCode || !componentPath) return

        if (sourceMapCache[componentPath]) {
            setComponentCode(sourceMapCache[componentPath])
            return
        }
        setIsLoadingCode(true)
        import("@/registry-components/component-source-map.json")
            .then(module => {
                const sourceMap = module.default
                Object.entries(sourceMap).forEach(([path, code]) => {
                    sourceMapCache[path] = code as string
                })
                if (sourceMapCache[componentPath]) {
                    setComponentCode(sourceMapCache[componentPath])
                } else {
                    console.warn(`Source code not found for ${componentPath}`)
                }
            })
            .catch(error => {
                console.error("Error loading source map:", error)
            })
            .finally(() => {
                setIsLoadingCode(false)
            })
    }, [providedCode, componentPath])
    const tComponentSource = useTranslations("component-source-1")
    const ComponentUtilsText = () => {
        return (
            <span>
                {tComponentSource("des-1")} <MdxBadge>components</MdxBadge>{"  "}
                {tComponentSource("des-2")}{" "}
                <MdxBadge>{componentName}.tsx</MdxBadge> {tComponentSource("des-3")}:
            </span>
        )
    }
    console.log(componentName)
    return (
        <div className="space-y-3">
            <ComponentUtilsText/>
            <CodeBlockWrapper>
                {componentCode ? (
                    <Pre folderPath={componentPath} raw={componentCode} className="language-tsx ">
                        {componentCode}
                    </Pre>
                ) : isLoadingCode ? (
                    <div className="flex w-full items-center justify-center text-sm text-muted-foreground p-4 gap-2">
                        <LoadingIcon size={14}/>
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
