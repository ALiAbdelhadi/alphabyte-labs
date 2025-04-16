"use client"

import Container from "@/components/Container"
import LoadingIcon from "@/components/icons/loading-icon"
import { blockExamples } from "@/registry/blocks-examples"
import "@/styles/globals.css"
import "@/styles/prism-theme.css"
import dynamic from "next/dynamic"
import React, { Suspense } from "react"

const withStyles = (Component: React.ComponentType) => {
    return function StyledComponent(props: any) {
        return (
            <Component {...props} />
        )
    }
}

const BlockComponentMap: Record<string, React.ComponentType> = {}

blockExamples.items.forEach(block => {
    const { name } = block
    BlockComponentMap[name] = dynamic(
        async () => {
            const pathMatch = block.target.match(/\/([^/]+)\/page$/)
            const blockName = pathMatch ? pathMatch[1] : ''
            const mod = await import(`@/registry/view/${blockName}/page`)
            const Component = mod.default
            return await Promise.resolve(withStyles(Component))
        },
        {
            loading: () =>
                <div className="flex w-full min-h-[350px] items-center justify-center text-sm text-muted-foreground gap-2">
                    <LoadingIcon size={14} />
                    Loading {name} component...
                </div>,
            ssr: true
        }
    )
})

interface BlockClientPreviewProps {
    target: string
}

export function BlockClientPreview({ target }: BlockClientPreviewProps) {
    const block = blockExamples.items.find(item => item.target === target)
    const blockName = block?.name || ''

    console.log("Target:", target, "Block name:", blockName)

    const Component = blockName ? BlockComponentMap[blockName] : null

    if (!Component) {
        return <div>Block not found for target: {target}</div>
    }

    return (
        <Container>
            <Suspense fallback={
                <div className="flex w-full min-h-[350px] items-center justify-center text-sm text-muted-foreground gap-2">
                    <LoadingIcon size={14} />
                    Loading block content...
                </div>
            }>
                <Component />
            </Suspense>
        </Container>
    )
}
