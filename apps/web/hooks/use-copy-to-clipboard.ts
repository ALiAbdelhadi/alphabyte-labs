"use client"

import { useState, useCallback } from "react"

interface UseCopyToClipboardOptions {
  timeout?: number
  onCopy?: () => void
  onError?: (error: Error) => void
}

interface UseCopyToClipboardReturn {
  isCopied: boolean
  copyToClipboard: (text: string) => Promise<void>
  error: Error | null
}

export const useCopyToClipboard = (options: UseCopyToClipboardOptions = {}): UseCopyToClipboardReturn => {
  const { timeout = 2000, onCopy, onError } = options
  const [isCopied, setIsCopied] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const copyToClipboard = useCallback(
    async (text: string) => {
      try {
        // Modern clipboard API
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(text)
        } else {
          // Fallback for older browsers
          const textArea = document.createElement("textarea")
          textArea.value = text
          textArea.style.position = "fixed"
          textArea.style.left = "-999999px"
          textArea.style.top = "-999999px"
          document.body.appendChild(textArea)
          textArea.focus()
          textArea.select()

          const successful = document.execCommand("copy")
          document.body.removeChild(textArea)

          if (!successful) {
            throw new Error("Failed to copy text")
          }
        }

        setIsCopied(true)
        setError(null)
        onCopy?.()

        // Reset copied state after timeout
        setTimeout(() => {
          setIsCopied(false)
        }, timeout)
      } catch (err) {
        const error = err instanceof Error ? err : new Error("Failed to copy")
        setError(error)
        setIsCopied(false)
        onError?.(error)
        throw error
      }
    },
    [timeout, onCopy, onError],
  )

  return {
    isCopied,
    copyToClipboard,
    error,
  }
}
