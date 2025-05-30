"use client"

import { cn } from "@/lib/utils"
import { languageIcons } from "@/settings/LanguageIcon"
import { Check, Clipboard, FileCode } from "lucide-react"
import Prism from "prismjs"
import "prismjs/components/prism-css"
import "prismjs/components/prism-javascript"
import "prismjs/components/prism-jsx"
import "prismjs/components/prism-tsx"
import "prismjs/components/prism-typescript"
import "prismjs/plugins/line-highlight/prism-line-highlight"
import "prismjs/plugins/line-highlight/prism-line-highlight.css"
import "prismjs/plugins/line-numbers/prism-line-numbers"
import "prismjs/plugins/line-numbers/prism-line-numbers.css"
import { useEffect, useRef, useState } from "react"

interface PreProps {
  children?: React.ReactNode
  raw?: string
  className?: string
  highlightLines?: number[]
  folderPath?: string
  showLineNumbers?: boolean
  contentKey?: string | number
}
function CopyButton({ content }: { content: string }) {
  const [isCopied, setIsCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(content).then(() => {
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    })
  }

  return (
    <button
      onClick={handleCopy}
      className="flex items-center justify-center w-8 h-8 rounded-sm hover:bg-muted-foreground/50 transition-all duration-200"
    >
      {isCopied ? (
        <Check className="w-[18px] h-[18px] text-green-500" />
      ) : (
        <Clipboard className="w-[18px] h-[18px] text-gray-100" />
      )}
    </button>
  )
}

export default function Pre({
  children,
  raw,
  className = "",
  highlightLines = [],
  folderPath,
  showLineNumbers = true,
  contentKey,
}: PreProps) {
  const [isClient, setIsClient] = useState(false)
  const preRef = useRef<HTMLPreElement>(null)
  const codeRef = useRef<HTMLElement>(null)

  const [content, setContent] = useState<string>("")
  const language = className?.includes("language-")
    ? className.split("language-")[1]?.split(" ")[0]
    : "tsx"

  useEffect(() => {
    const newContent =
      typeof children === "string"
        ? children.trim()
        : children?.toString() || ""

    setContent(newContent)
  }, [children, contentKey])

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient || !codeRef.current) return
    codeRef.current.textContent = content
    Prism.highlightElement(codeRef.current)
  }, [content, isClient, contentKey])

  const lineNumbersClass = showLineNumbers ? "line-numbers" : ""

  if (!isClient) {
    return (
      <div className="code-block-container relative group rounded-[6px] custom-scrollbar my-5 w-full">
        <pre
          className={`overflow-x-auto max-h-[650px] hide-scrollbar ${lineNumbersClass}`}
        >
          <code>{content}</code>
        </pre>
      </div>
    )
  }

  return (
    <div className="code-block-container relative group rounded-[6px] w-full">
      <div className="code-block-header code-block-toolbar overflow-x-auto hide-scrollbar flex items-center justify-between h-[35px]">
        <div className="flex items-center justify-between space-x-4">
          <div className="flex space-x-2 items-center">
            <div className="w-3 h-3 rounded-full bg-red-500/30 border border-red-500/40" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/30 border border-yellow-500/40" />
            <div className="w-3 h-3 rounded-full bg-green-500/30 border border-green-500/40" />
          </div>
          {folderPath && (
            <span className="code-block-folder-path font-medium text-gray-400 text-sm text-nowrap max-w-md">
              {folderPath}
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <CopyButton content={raw || content} />
          <div className="w-[18px] h-[18px] rounded-sm">
            {languageIcons[language] || (
              <FileCode className="w-[18px] h-[18px] text-gray-400" />
            )}
          </div>
        </div>
      </div>
      <pre
        ref={preRef}
        className={cn(
          `language-${language}`,
          className,
          "overflow-x-auto",
          "max-h-[650px]",
          "border-none",
          "custom-scrollbar",
          lineNumbersClass
        )}
        data-line={
          highlightLines.length > 0 ? highlightLines.join(",") : undefined
        }
      >
        <code ref={codeRef} className={`language-${language}`}>
          {content}
        </code>
      </pre>
    </div>
  )
}
