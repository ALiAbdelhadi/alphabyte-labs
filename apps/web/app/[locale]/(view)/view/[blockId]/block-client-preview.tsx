"use client"

import LoadingIcon from "@/components/icons/loading-icon"
import { blockExamples } from "@/registry/blocks-examples"
import dynamic from "next/dynamic"

interface BlockClientPreviewProps {
  target: string
}

export function BlockClientPreview({ target }: BlockClientPreviewProps) {
  const block = blockExamples.items.find((item) => item.target === target)
  const blockName = block?.name || ""

  console.log("Target:", target, "Block name:", blockName)

  if (!blockName) {
    return <div>Block not found for target: {target}</div>
  }

  const DynamicComponent = dynamic(() => {
    const pathMatch = block?.target.match(/\/([^/]+)\/page$/)
    const dynamicBlockName = pathMatch ? pathMatch[1] : ""

    return import(`@/registry/view/${dynamicBlockName}/page`).then(
      (mod) => mod.default
    )
  }, {
    ssr: false,
    loading: () => (
      <div className="flex w-full h-screen items-center justify-center text-sm text-muted-foreground gap-2">
        <LoadingIcon size={14} />
        Loading block content...
      </div>
    ),
  })

  return (
    <div className="custom-scrollbar">
      <DynamicComponent />
    </div>
  )
}
