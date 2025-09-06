"use client"

import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { advanceSearch, cn, debounce } from "@/lib/utils"
import { DocsRouting } from "@/settings/docs-routing"
import { ArrowRight, FileText, Search as SearchIcon, X } from "lucide-react"
import type React from "react"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import Anchor from "./anchor"
import LoadingIcon from "../icons/loading-icon"

const MIN_SEARCH_LENGTH = 2
const DEBOUNCE_DELAY_MS = 200
const DOCS_BASE_PATH = "/docs"

let isSearchDialogOpen = false

interface DocumentItem {
  title?: string
  href?: string
  spacer?: boolean
  items?: DocumentItem[]
  id?: string
}

interface SearchResult {
  id?: string
  title: string
  href: string
  snippet?: string
}

const ComponentIcon = () => (
  <div className="flex h-4 w-4 items-center justify-center">
    <div className="h-4 w-4 rounded-full aspect-square size-4 border border-dashed border-muted-foreground" />
  </div>
)

function createRelativePath(...segments: (string | undefined)[]): string {
  return segments
    .map((segment) => segment?.trim().replace(/^\/+|\/+$/g, "") || "")
    .filter(Boolean)
    .join("/")
}

function getAbsoluteDocPath(relativePath: string | undefined): string {
  if (!relativePath) return DOCS_BASE_PATH
  const cleanRelativePath = relativePath.replace(/^\/+|\/+$/g, "")
  return `${DOCS_BASE_PATH}/${cleanRelativePath}`.replace(/\/+/g, "/")
}

const sanitizeHtml = (html: string): string => {
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/on\w+="[^"]*"/gi, "")
}

export default function Search() {
  const [searchedInput, setSearchedInput] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [filteredResults, setFilteredResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [platform, setPlatform] = useState<"mac" | "windows">("windows")
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isScrollable, setIsScrollable] = useState(false)
  const [canScrollMore, setCanScrollMore] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const scrollViewportRef = useRef<HTMLDivElement>(null)
  const componentMountedRef = useRef(true)

  useEffect(() => {
    const platformStr = navigator.platform.toLowerCase()
    const userAgentStr = navigator.userAgent.toLowerCase()
    if (platformStr.includes("mac") || userAgentStr.includes("mac")) {
      setPlatform("mac")
    }
    return () => {
      componentMountedRef.current = false
    }
  }, [])

  // Check if content is scrollable and can scroll more
  useEffect(() => {
    const checkScrollable = () => {
      if (scrollViewportRef.current) {
        const { scrollHeight, clientHeight, scrollTop } = scrollViewportRef.current
        setIsScrollable(scrollHeight > clientHeight)
        setCanScrollMore(scrollHeight > clientHeight && scrollTop + clientHeight < scrollHeight - 10)
      }
    }

    checkScrollable()
    const timeoutId = setTimeout(checkScrollable, 100)

    // Add scroll listener to update canScrollMore
    const scrollElement = scrollViewportRef.current
    if (scrollElement) {
      scrollElement.addEventListener('scroll', checkScrollable)
      return () => {
        clearTimeout(timeoutId)
        scrollElement.removeEventListener('scroll', checkScrollable)
      }
    }

    return () => clearTimeout(timeoutId)
  }, [filteredResults, isLoading, searchedInput])

  const handleOpenChange = useCallback((open: boolean) => {
    setIsOpen(open)
    if (open) {
      isSearchDialogOpen = true
      setTimeout(() => inputRef.current?.focus(), 100)
    } else {
      isSearchDialogOpen = false
      setSearchedInput("")
      setSelectedIndex(0)
    }
  }, [])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Global shortcut
      if ((platform === "mac" ? event.metaKey : event.ctrlKey) && event.key === "k") {
        event.preventDefault()
        if (!isSearchDialogOpen) {
          handleOpenChange(true)
        }
        return
      }

      if (!isOpen) return

      switch (event.key) {
        case "ArrowDown":
          event.preventDefault()
          setSelectedIndex((prev) => Math.min(prev + 1, filteredResults.length - 1))
          break
        case "ArrowUp":
          event.preventDefault()
          setSelectedIndex((prev) => Math.max(prev - 1, 0))
          break
        case "Enter":
          if (filteredResults.length > 0 && selectedIndex >= 0) {
            event.preventDefault()
            const selectedItem = filteredResults[selectedIndex]
            if (selectedItem?.href) {
              window.location.href = getAbsoluteDocPath(selectedItem.href)
              handleOpenChange(false)
            }
          }
          break
        case "Escape":
          handleOpenChange(false)
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      if (isOpen) isSearchDialogOpen = false
    }
  }, [isOpen, filteredResults, platform, selectedIndex, handleOpenChange])

  const performSearch = useCallback((input: string) => {
    if (!componentMountedRef.current) return

    setIsLoading(true)

    // Simulate search delay for better UX
    setTimeout(() => {
      if (!componentMountedRef.current) return
      const results: SearchResult[] = advanceSearch(input.trim())
      setFilteredResults(results)
      setSelectedIndex(0)
      setIsLoading(false)
    }, 100)
  }, [])

  const debouncedSearch = useMemo(() =>
    debounce(performSearch, DEBOUNCE_DELAY_MS),
    [performSearch]
  )

  useEffect(() => {
    const trimmedInput = searchedInput.trim()
    if (trimmedInput.length >= MIN_SEARCH_LENGTH) {
      debouncedSearch(trimmedInput)
    } else {
      setFilteredResults([])
      setIsLoading(false)
    }

    // Clean up debounced function if it has a cancel method
    return () => {
      if (typeof debouncedSearch === 'function' && 'cancel' in debouncedSearch) {
        (debouncedSearch as any).cancel?.()
      }
    }
  }, [searchedInput, debouncedSearch])

  const renderDocumentStructure = useCallback(
    (documents: DocumentItem[], parentRelativePath = "", isComponentSection = false): React.ReactNode[] => {
      if (!documents || !Array.isArray(documents)) return []

      return documents.flatMap((doc) => {
        if (doc.spacer) return []

        const currentRelativePath = createRelativePath(parentRelativePath, doc.href)
        const absoluteHref = getAbsoluteDocPath(currentRelativePath)
        const isComponentItem = doc.id === "components" || isComponentSection

        if (doc.items && doc.items.length > 0 && doc.id === "components") {
          const sectionHeader = (
            <div key={`${doc.id}-header`} className="px-3 py-2">
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {doc.title}
              </h4>
            </div>
          )
          const childItems = renderDocumentStructure(doc.items, currentRelativePath, true)
          return [sectionHeader, ...childItems]
        }

        const linkElement = (
          <DialogClose key={absoluteHref} asChild>
            <Anchor
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all hover:bg-muted/80 focus:outline-none focus:ring-2 focus:ring-primary/20"
              href={absoluteHref}
              onClick={() => handleOpenChange(false)}
            >
              {isComponentItem ? (
                <ComponentIcon />
              ) : (
                <ArrowRight className="h-4 w-4 text-muted-foreground/60" />
              )}
              <span className="text-foreground/80">{doc.title}</span>
            </Anchor>
          </DialogClose>
        )

        const childItems = doc.items ?
          renderDocumentStructure(doc.items, currentRelativePath, isComponentItem) : []

        return [linkElement, ...childItems]
      })
    },
    [handleOpenChange]
  )

  const renderSearchResults = useCallback(() => {
    return filteredResults.map((item, index) => {
      const absoluteHref = getAbsoluteDocPath(item.href)
      const uniqueKey = item.id || absoluteHref
      const isComponentItem = item.id === "components" || ComponentIcon
      return (
        <DialogClose key={uniqueKey} asChild>
          <Anchor
            className={cn(
              "flex flex-col gap-2 rounded-lg p-3 transition-all hover:bg-muted/60",
              "focus:outline-none focus:ring-2 focus:ring-primary/20",
              selectedIndex === index && "bg-muted ring-2 ring-primary/30"
            )}
            href={absoluteHref}
            onClick={() => handleOpenChange(false)}
          >
            <div className="flex items-center gap-3">
              {isComponentItem ? (
                <ComponentIcon />
              ) : (
                <ArrowRight className="h-4 w-4 text-muted-foreground/60" />
              )}
              <span className="font-medium text-sm">{item.title}</span>
            </div>
          </Anchor>
        </DialogClose>
      )
    })
  }, [filteredResults, selectedIndex, handleOpenChange])

  const getScrollAreaContent = useCallback(() => {
    const trimmedInput = searchedInput.trim()

    if (isLoading) {
      return (
        <div className="flex items-center justify-center py-8">
          <div className="flex items-center gap-2">
            <LoadingIcon size={14} />
            <span className="text-sm text-muted-foreground">Searching...</span>
          </div>
        </div>
      )
    }

    if (trimmedInput.length > 0 && trimmedInput.length < MIN_SEARCH_LENGTH) {
      return (
        <div className="flex items-center justify-center py-8">
          <p className="text-sm text-muted-foreground">
            Type at least {MIN_SEARCH_LENGTH} characters to search
          </p>
        </div>
      )
    }

    if (trimmedInput.length >= MIN_SEARCH_LENGTH) {
      if (filteredResults.length === 0) {
        return (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <SearchIcon className="h-8 w-8 text-muted-foreground/40 mb-2" />
            <p className="text-sm text-muted-foreground">
              No results for "<span className="font-medium text-foreground">{trimmedInput}</span>"
            </p>
            <p className="text-xs text-muted-foreground/60 mt-1">
              Try using different keywords
            </p>
          </div>
        )
      }
      return <div className="space-y-1">{renderSearchResults()}</div>
    }

    return (
      <div className="space-y-1">
        <div className="px-3 py-2">
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Quick Access
          </h4>
        </div>
        <div className="space-y-0.5">{renderDocumentStructure(DocsRouting.sidebarItems)}</div>
      </div>
    )
  }, [isLoading, searchedInput, filteredResults, renderDocumentStructure, renderSearchResults])

  return (
    <div className="relative lg:w-full max-w-xl">
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
          <button
            className={cn(
              "group flex w-full items-center text-sm transition-all rounded-lg h-8",
              "lg:px-3 md:gap-2 lg:bg-muted/40 bg-transparent",
              "hover:bg-muted/60 md:border-border/30 md:border",
            )}
            aria-label="Search documentation"
          >
            <SearchIcon className="h-[22px] w-[22px] group-hover:text-foreground flex-shrink-0 lg:hidden flex" />
            <span className="flex-1 text-left text-muted-foreground group-hover:text-foreground hidden xl:inline-flex text-sm">
              Search documentation...
            </span>
            <span className="flex-1 text-left text-muted-foreground group-hover:text-foreground hidden lg:inline-flex xl:hidden text-sm">
              Search...
            </span>
            <div className="hidden lg:flex items-center gap-0.5">
              <kbd className="pointer-events-none h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-80 hidden lg:flex">
                {platform === "mac" ? "⌘" : "Ctrl"}
              </kbd>
              <kbd className="pointer-events-none h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-80 hidden lg:flex">
                K
              </kbd>
            </div>
          </button>
        </DialogTrigger>
        <DialogContent className="max-w-xl overflow-hidden rounded-xl !p-0 shadow-xl border-0 gap-1">
          <div className="border-b bg-muted/20">
            <div className="relative flex items-center">
              <SearchIcon className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
              <input
                ref={inputRef}
                value={searchedInput}
                onChange={(e) => setSearchedInput(e.target.value)}
                placeholder="Search documentation..."
                className="w-full border-0 bg-transparent py-4 pl-12 pr-16 text-sm outline-none placeholder:text-muted-foreground focus:ring-0"
                aria-label="Search input"
              />
              <DialogTitle className="sr-only">Search documentation</DialogTitle>
              <DialogClose asChild>
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 bg-muted/60 hover:bg-muted py-1 px-2 text-xs rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors"
                  aria-label="Close search dialog"
                >
                  <X className="h-3 w-3" />
                  <span>ESC</span>
                </button>
              </DialogClose>
            </div>
          </div>
          <div className="relative">
            <div
              ref={scrollViewportRef}
              className="max-h-[50vh] min-h-[200px] overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-border"
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: 'hsl(var(--border)) transparent'
              }}
            >
              <div className="px-3 py-1">{getScrollAreaContent()}</div>
            </div>
            {canScrollMore && (
              <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-background via-background/40 to-transparent pointer-events-none z-10" />
            )}
          </div>
          {filteredResults.length > 0 && (
            <div className="text-muted-foreground relative z-20 flex h-8 items-center gap-2 rounded-b-xl border-t border-t-neutral-100 bg-neutral-50 px-4 text-xs font-medium dark:border-t-neutral-700 dark:bg-neutral-800 text-sm shadow-lg">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <kbd className="h-[1.1rem] px-1 bg-muted rounded text-[10px]">↑</kbd>
                  <kbd className="h-[1.1rem] px-1 bg-muted rounded text-[10px]">↓</kbd>
                  <span>navigate</span>
                </div>
                <div className="flex items-center gap-1">
                  <kbd className="h-[1.1rem] px-1 bg-muted rounded text-[10px]">Enter</kbd>
                  <span>select</span>
                </div>
                <div className="flex items-center gap-1">
                  <kbd className="h-[1.1rem] px-1 bg-muted rounded text-[10px]">Esc</kbd>
                  <span>close</span>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}