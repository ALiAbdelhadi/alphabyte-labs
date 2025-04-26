"use client"

import { blockExamples } from "@/registry/blocks-examples"
import dynamic from "next/dynamic"
import React from "react"

const BlockComponentMap: Record<string, React.ComponentType> = {}

blockExamples.items.forEach(block => {
    const { name } = block
    BlockComponentMap[name] = dynamic(
        async () => {
            const pathMatch = block.target.match(/\/([^/]+)\/page$/)
            const blockName = pathMatch ? pathMatch[1] : ''
            const mod = await import(`@/registry/view/${blockName}/page`)
            const Component = mod.default
            return await Promise.resolve(Component)
        },
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
        <Component />
    )
}
