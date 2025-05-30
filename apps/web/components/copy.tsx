"use client"

import { useState } from "react"
import { CheckIcon, CopyIcon } from "lucide-react"

import { Button } from "./ui/button"

export default function Copy({ content }: { content: string }) {
  const [isCopied, setIsCopied] = useState(false)
  async function handleCopy() {
    await navigator.clipboard.writeText(content)
    setIsCopied(true)
    setTimeout(() => {
      setIsCopied(false)
    }, 2000)
  }
  return (
    <Button
      variant="secondary"
      className="border"
      size="icon"
      onClick={handleCopy}
    >
      {isCopied ? (
        <CheckIcon className="w-3 h-3" />
      ) : (
        <CopyIcon className="w-3 h-3" />
      )}
    </Button>
  )
}
