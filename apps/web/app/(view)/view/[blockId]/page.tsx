import LoadingIcon from "@/components/icons/loading-icon"
import { blockExamples } from "@/registry/blocks-examples"
import { notFound } from "next/navigation"
import React from "react"
import { BlockClientPreview } from "./block-client-preview"

async function BlockPageContent({ blockId }: { blockId: string }) {
  const registryBlocks = blockExamples.items.find(
    (block) => block.name === blockId
  )
  if (!blockId) {
    return <div>No block ID provided</div>
  }
  if (!registryBlocks) {
    return <div>Block not found: {blockId}</div>
  }
  const { target } = registryBlocks
  console.log(
    "Block page content rendering with blockId:",
    blockId,
    "target:",
    target
  )

  return <BlockClientPreview target={target} />
}

export default async function BlockPage({ params }: { params: { blockId: string } }) {
  const blockId = params?.blockId
  if (!blockId) {
    return notFound()
  }

  return (
    <React.Suspense
      fallback={
        <div className="flex w-full h-screen items-center justify-center text-sm text-muted-foreground gap-2">
          <LoadingIcon size={14} />
          Loading block content...
        </div>
      }
    >
      <BlockPageContent blockId={blockId} />
    </React.Suspense>
  )
}