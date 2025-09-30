"use client"

import { Check, Clipboard } from "lucide-react"
import { cn } from "@/lib/utils"
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard"

export const CopyButton = ({ content }: { content: string }) => {
  const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 })

  return (
    <button
      className="flex items-center bg-muted hover:bg-gray-200/60 dark:hover:bg-muted-foreground/10 shadow-sm py-3 md:py-2.5 px-3 rounded-[7px] space-x-1 transition-colors"
      onClick={() => copyToClipboard(content)}
    >
      <span className="inline-block transition-transform duration-200 ease-in-out">
        {isCopied ? (
          <Check className="w-4 h-4 text-emerald-500" />
        ) : (
          <Clipboard className="w-4 h-4 text-slate-700 dark:text-gray-300" />
        )}
      </span>
      <span className="font-medium text-xs text-nowrap hidden sm:block text-gray-800 dark:text-gray-200">
        <span className={cn("transition-all", isCopied && "mr-2.5")}>
          Cop
          <span className="relative">
            <span
              className={`inline-block transition-opacity duration-300 ${
                isCopied ? "opacity-0" : "opacity-100"
              }`}
            >
              y
            </span>
            <span
              className={`absolute left-0 transition-all duration-300 ${
                isCopied ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-1"
              }`}
            >
              ied{" "}
            </span>
          </span>
        </span>{" "}
        code
      </span>
    </button>
  )
}
