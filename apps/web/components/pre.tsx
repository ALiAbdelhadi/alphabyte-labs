"use client"

import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard"
import { cn } from "@/lib/utils"
import { languageIcons } from "@/settings/LanguageIcon"
import { Check, Clipboard, FileCode, RotateCcw, Search, X } from "lucide-react"
import Prism from "prismjs"
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
  showBorder?: boolean
  showShadow?: boolean
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

const CopyButton: React.FC<CopyButtonProps> = ({ content, className }) => {
  const [state, setState] = useState<"idle" | "copied" | "error">("idle")
  const [hasCopied, setHasCopied] = useState(false)
  const { isCopied, copyToClipboard } = useCopyToClipboard({
    timeout: 2000,
    onCopy: () => setState("copied"),
  })
  useEffect(() => {
    if (hasCopied) {
      const timer = setTimeout(() => setHasCopied(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [hasCopied])

  useEffect(() => {
    if (isCopied) {
      setState("copied")
    } else {
      setState("idle")
    }
  }, [isCopied])

  const handleCopy = () => {
    try {
      copyToClipboard(content)
    } catch {
      setState("error")
    }
  }

  const buttonConfig = {
    idle: {
      icon: (
        <Clipboard className="w-4 h-4 text-gray-600 hover:text-gray-900 hover:bg-gray-100/80 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800/80 transition-colors" />
      ),
      title: "Copy to clipboard",
    },
    copied: {
      icon: <Check className="w-4 h-4 text-green-600" />,
      title: "Copied!",
    },
    error: {
      icon: <RotateCcw className="w-4 h-4 text-red-600" />,
      title: "Failed to copy",
    },
  }

  const currentConfig = buttonConfig[state]

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={handleCopy}
            variant="ghost"
            size="icon"
            className={cn(
              "flex items-center justify-center w-6 h-6 rounded-sm hover:bg-muted/50 transition-all duration-200 !ml-0",
              className
            )}
            title={currentConfig.title}
            aria-label={currentConfig.title}
          >
            {currentConfig.icon}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {hasCopied ? "Copied" : "Copy command"}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
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
    <div className="overflow-x-auto hide-scrollbar flex items-center justify-between h-[35px] px-4 bg-muted/50">
      <div className="flex items-center justify-between space-x-4 rtl:space-x-reverse">
        <div className="flex space-x-1.5 rtl:space-x-reverse items-center" role="presentation" aria-label="Window controls">
          <div className="w-3 h-3 rounded-full bg-[#fc5f57] border border-red-500/40" />
          <div className="w-3 h-3 rounded-full bg-[#fdbc2e] border border-yellow-500/40" />
          <div className="w-3 h-3 rounded-full bg-[#28c83f] border border-green-500/40" />
        </div>
        {title ? (
          <div className="flex items-center justify-center space-x-4 rtl:space-x-reverse">
            <span className="font-medium text-muted-foreground text-[13px] text-nowrap">{title}</span>
            {description && <p className="text-xs  text-muted-foreground">{description}</p>}
          </div>
        ) : folderPath ? (
          <span dir="ltr" className="code-block-folder-path font-medium text-muted-foreground text-sm text-nowrap max-w-md">
            {folderPath}
          </span>
        ) : null}
      </div>
      <div className="flex items-center space-x-2 rtl:space-x-reverse">
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
            <Search className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors" />
          </button>
        )}
        <CopyButton content={content} />
        <div className="w-4 h-4 rounded-sm flex items-center justify-center" title={`Language: ${language}`}>
          {languageIcons[language] || <FileCode className="w-4 h-4 text-muted-foreground" />}
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
  showBorder = true,
  onContentChange,
  showShadow = true,
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
      className={cn("code-block-container relative group rounded-[6px] w-full", showBorder && " border border-border")}
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
          lineNumbersClass,
          wordWrap && "whitespace-pre-wrap",
        )}
        style={{ maxHeight: `${maxHeight}px` }}
        data-line={highlightLines.length > 0 ? highlightLines.join(",") : undefined}
      >
        <code ref={codeRef} className={`language-${language} text-foreground not-prose`} data-language={language}>
          {displayContent}
        </code>
        {/* {
          showShadow && (
            <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-background/90 via-background/40 to-transparent pointer-events-none z-10" />
          )
        } */}
      </pre>
    </div>
  )
}

export default Pre