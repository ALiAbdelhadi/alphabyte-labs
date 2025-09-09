"use client"

import { cn } from "@/lib/utils"
import { languageIcons } from "@/settings/LanguageIcon"
import { Check, Clipboard, FileCode, RotateCcw, Search, X } from "lucide-react"
import Prism from "prismjs"
import "prismjs/components/prism-bash"
import "prismjs/components/prism-css"
import "prismjs/components/prism-javascript"
import "prismjs/components/prism-json"
import "prismjs/components/prism-jsx"
import "prismjs/components/prism-markdown"
import "prismjs/components/prism-tsx"
import "prismjs/components/prism-typescript"
import "prismjs/plugins/line-highlight/prism-line-highlight"
import "prismjs/plugins/line-highlight/prism-line-highlight.css"
import "prismjs/plugins/line-numbers/prism-line-numbers"
import "prismjs/plugins/line-numbers/prism-line-numbers.css"
import type React from "react"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"

interface PreProps {
  children?: React.ReactNode
  raw?: string
  className?: string
  highlightLines?: number[]
  folderPath?: string
  showLineNumbers?: boolean
  contentKey?: string | number
  title?: string
  description?: string
  maxHeight?: number
  showHeader?: boolean
  enableSearch?: boolean
  wordWrap?: boolean
  autoFormat?: boolean
  onContentChange?: (content: string) => void
  customActions?: React.ReactNode
}

interface CopyButtonProps {
  content: string
  className?: string
}

const DEFAULT_LANGUAGE = "tsx"
const COPY_FEEDBACK_DURATION = 2000
const DEFAULT_MAX_HEIGHT = 650

const extractLanguageFromClassName = (className?: string): string => {
  if (!className?.includes("language-")) return DEFAULT_LANGUAGE
  return className.split("language-")[1]?.split(" ")[0] || DEFAULT_LANGUAGE
}

const processContent = (children?: React.ReactNode, raw?: string): string => {
  if (raw) return raw.trim()
  if (typeof children === "string") return children.trim()
  if (children) return children.toString().trim()
  return ""
}

// Sub-components
const CopyButton: React.FC<CopyButtonProps> = ({ content, className }) => {
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle")

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(content)
      setCopyState("copied")
      setTimeout(() => setCopyState("idle"), COPY_FEEDBACK_DURATION)
    } catch {
      setCopyState("error")
      setTimeout(() => setCopyState("idle"), COPY_FEEDBACK_DURATION)
    }
  }, [content])

  const buttonConfig = {
    idle: {
      icon: <Clipboard className="w-[18px] h-[18px] text-muted-foreground hover:text-foreground transition-colors" />,
      title: "Copy to clipboard",
    },
    copied: {
      icon: <Check className="w-[18px] h-[18px] text-green-500" />,
      title: "Copied!",
    },
    error: {
      icon: <RotateCcw className="w-[18px] h-[18px] text-red-500" />,
      title: "Failed to copy",
    },
  }

  const currentConfig = buttonConfig[copyState]

  return (
    <button
      onClick={handleCopy}
      className={cn(
        "flex items-center justify-center w-8 h-8 rounded-sm hover:bg-muted/50 transition-all duration-200",
        className,
      )}
      title={currentConfig.title}
      aria-label={currentConfig.title}
    >
      {currentConfig.icon}
    </button>
  )
}

const SearchInput: React.FC<{
  searchQuery: string
  onSearchChange: (query: string) => void
  onClose: () => void
}> = ({ searchQuery, onSearchChange, onClose }) => {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [onClose])

  return (
    <div className="flex items-center space-x-2 px-3 py-2 border-b border-border bg-background">
      <Search className="w-4 h-4 text-muted-foreground" />
      <input
        ref={inputRef}
        type="text"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search in code..."
        className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground text-foreground"
      />
      <button onClick={onClose} className="p-1 hover:bg-muted rounded transition-colors">
        <X className="w-4 h-4 text-muted-foreground hover:text-foreground" />
      </button>
    </div>
  )
}

const CodeHeader: React.FC<{
  title?: string
  description?: string
  folderPath?: string
  language: string
  enableSearch: boolean
  isSearchVisible: boolean
  onToggleSearch: () => void
  content: string
  customActions?: React.ReactNode
}> = ({
  title,
  description,
  folderPath,
  language,
  enableSearch,
  isSearchVisible,
  onToggleSearch,
  content,
  customActions,
}) => (
    <div className="code-block-header code-block-toolbar overflow-x-auto hide-scrollbar flex items-center justify-between h-[35px] px-4 bg-muted/30 border-b border-border">
      <div className="flex items-center justify-between space-x-4 rtl:space-x-reverse">
        <div className="flex space-x-1.5 rtl:space-x-reverse items-center" role="presentation" aria-label="Window controls">
          <div className="w-3 h-3 rounded-full bg-red-500/30 border border-red-500/40" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/30 border border-yellow-500/40" />
          <div className="w-3 h-3 rounded-full bg-green-500/30 border border-green-500/40" />
        </div>
        {title ? (
          <div className="flex items-center justify-center space-x-4 rtl:space-x-reverse">
            <span className="font-medium text-foreground text-sm text-nowrap">{title}</span>
            {description && <p className="text-xs  text-muted-foreground">{description}</p>}
          </div>
        ) : folderPath ? (
          <span dir="ltr" className="code-block-folder-path font-medium text-muted-foreground text-sm text-nowrap max-w-md">
            {folderPath}
          </span>
        ) : null}
      </div>
      <div className="flex items-center space-x-2">
        {enableSearch && (
          <button
            onClick={onToggleSearch}
            className={cn(
              "md:flex hidden items-center justify-center w-8 h-8 rounded-sm hover:bg-muted/50 transition-all duration-200",
              isSearchVisible && "bg-muted/70",
            )}
            title="Search in code"
            aria-label="Toggle search"
          >
            <Search className="w-[18px] h-[18px] text-muted-foreground hover:text-foreground transition-colors" />
          </button>
        )}
        <CopyButton content={content} />
        <div className="w-[18px] h-[18px] rounded-sm" title={`Language: ${language}`}>
          {languageIcons[language] || <FileCode className="w-[18px] h-[18px] text-muted-foreground" />}
        </div>
        {customActions}
      </div>
    </div>
  )

const Pre: React.FC<PreProps> = ({
  children,
  raw,
  className = "",
  highlightLines = [],
  folderPath,
  showLineNumbers = true,
  contentKey,
  title,
  description,
  maxHeight = DEFAULT_MAX_HEIGHT,
  showHeader = true,
  enableSearch = true,
  wordWrap = false,
  autoFormat = true,
  onContentChange,
  customActions,
}) => {
  const [isClient, setIsClient] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearchVisible, setIsSearchVisible] = useState(false)
  const preRef = useRef<HTMLPreElement>(null)
  const codeRef = useRef<HTMLElement>(null)

  // Memoized values
  const language = useMemo(() => extractLanguageFromClassName(className), [className])

  const content = useMemo(() => {
    const processed = processContent(children, raw)
    onContentChange?.(processed)
    return processed
  }, [children, raw, contentKey, onContentChange])

  const filteredContent = useMemo(() => {
    if (!searchQuery.trim()) return content

    const searchRegex = new RegExp(searchQuery.trim(), "gi")
    return content
      .split("\n")
      .filter((line) => searchRegex.test(line))
      .join("\n")
  }, [content, searchQuery])

  const displayContent = searchQuery.trim() ? filteredContent : content

  // Effects
  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient || !codeRef.current) return

    codeRef.current.textContent = displayContent
    Prism.highlightElement(codeRef.current)

    if (showLineNumbers && preRef.current) {
      preRef.current.classList.add("line-numbers")
    }
  }, [displayContent, isClient, language, showLineNumbers])

  const handleToggleSearch = useCallback(() => {
    setIsSearchVisible((prev) => !prev)
    if (isSearchVisible) {
      setSearchQuery("")
    }
  }, [isSearchVisible])

  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query)
  }, [])

  const handleCloseSearch = useCallback(() => {
    setIsSearchVisible(false)
    setSearchQuery("")
  }, [])

  const lineNumbersClass = showLineNumbers ? "line-numbers" : ""

  if (!isClient) {
    return (
      <div className="code-block-container relative group rounded-[6px] my-5 w-full border border-border bg-background">
        <pre className={`overflow-x-auto ${lineNumbersClass}`} style={{ maxHeight: `${maxHeight}px` }}>
          <code className="text-foreground">{content}</code>
        </pre>
      </div>
    )
  }

  return (
    <div
      className="code-block-container relative group rounded-[6px] w-full border border-border bg-background shadow-sm"
      role="region"
      aria-label="Code block"
    >
      {showHeader && (
        <CodeHeader
          title={title}
          description={description}
          folderPath={folderPath}
          language={language}
          enableSearch={enableSearch}
          isSearchVisible={isSearchVisible}
          onToggleSearch={handleToggleSearch}
          content={raw || content}
          customActions={customActions}
        />
      )}
      {isSearchVisible && (
        <SearchInput searchQuery={searchQuery} onSearchChange={handleSearchChange} onClose={handleCloseSearch} />
      )}
      <pre
        ref={preRef}
        className={cn(
          `language-${language}`,
          className,
          "overflow-x-auto",
          "border-none",
          "font-mono",
          "font-medium",
          "bg-background",
          lineNumbersClass,
          wordWrap && "whitespace-pre-wrap",
        )}
        style={{ maxHeight: `${maxHeight}px` }}
        data-line={highlightLines.length > 0 ? highlightLines.join(",") : undefined}
      >
        <code ref={codeRef} className={`language-${language} text-foreground`} data-language={language}>
          {displayContent}
        </code>
      </pre>
    </div>
  )
}

export default Pre