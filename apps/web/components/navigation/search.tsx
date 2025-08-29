"use client"

import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { advanceSearch, cn, debounce } from "@/lib/utils"
import { DocsRouting } from "@/settings/docs-routing"
import { ArrowRight, FileText, SearchIcon } from "lucide-react"
import type React from "react"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import Anchor from "./anchor"

const MIN_SEARCH_LENGTH = 3
const DEBOUNCE_DELAY_MS = 300
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
  return html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "").replace(/on\w+="[^"]*"/gi, "")
}

export default function Search() {
  const [searchedInput, setSearchedInput] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [filteredResults, setFilteredResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [platform, setPlatform] = useState<"mac" | "windows">("windows")
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const componentMountedRef = useRef(true)

  useEffect(() => {
    const platformStr = navigator.platform.toLowerCase()
    const userAgentStr = navigator.userAgent.toLowerCase()
    if (platformStr.includes("mac") || userAgentStr.includes("mac")) {
      setPlatform("mac")
    } else if (platformStr.includes("win") || userAgentStr.includes("win")) {
      setPlatform("windows")
    }

    return () => {
      componentMountedRef.current = false
    }
  }, [])

  const handleOpenChange = useCallback((open: boolean) => {
    setIsOpen(open)
    if (open) {
      isSearchDialogOpen = true
      setTimeout(() => {
        inputRef.current?.focus()
      }, 0)
    } else {
      isSearchDialogOpen = false
      setSearchedInput("")
    }
  }, [])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
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
          if (filteredResults.length > 0 && selectedIndex >= 0 && selectedIndex < filteredResults.length) {
            event.preventDefault()
            const selectedItem = filteredResults[selectedIndex]
            if (selectedItem && selectedItem.href) {
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
      if (isOpen) {
        isSearchDialogOpen = false
      }
    }
  }, [isOpen, filteredResults, platform, selectedIndex, handleOpenChange])

  useEffect(() => {
    setSelectedIndex(0)
  }, [filteredResults])

  const performSearch = useCallback((input: string) => {
    if (!componentMountedRef.current) return

    setIsLoading(true)
    setTimeout(() => {
      if (!componentMountedRef.current) return

      const results: SearchResult[] = advanceSearch(input.trim())
      setFilteredResults(results)
      setIsLoading(false)
    }, 0)
  }, [])

  const debouncedSearch = useMemo(() => debounce(performSearch, DEBOUNCE_DELAY_MS), [performSearch])

  useEffect(() => {
    if (searchedInput.trim().length >= MIN_SEARCH_LENGTH) {
      debouncedSearch(searchedInput)
    } else {
      setFilteredResults([])
    }
    return () => {
      debouncedSearch.cancel?.()
    }
  }, [searchedInput, debouncedSearch])


  const renderDocumentStructure = useCallback(
    (documents: DocumentItem[], parentRelativePath = "", isComponentSection = false): React.ReactNode[] => {
      if (!documents || !Array.isArray(documents)) {
        return []
      }

      return documents.flatMap((doc) => {
        if (doc.spacer) {
          return []
        }

        const currentRelativePath = createRelativePath(parentRelativePath, doc.href)
        const absoluteHref = getAbsoluteDocPath(currentRelativePath)
        const isComponentItem = doc.id === "components" || isComponentSection
        if (doc.items && doc.items.length > 0 && doc.id === "components") {
          const sectionHeader = (
            <div key={`${doc.id}-header`} className="px-3 py-2">
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{doc.title}</h4>
            </div>
          )

          const childItems = renderDocumentStructure(doc.items, currentRelativePath, true)
          return [sectionHeader, ...childItems]
        }

        const linkElement = (
          <DialogClose key={absoluteHref} asChild>
            <Anchor
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-muted",
                "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1",
              )}
              href={absoluteHref}
              onClick={() => handleOpenChange(false)}
            >
              {isComponentItem ? <ComponentIcon /> : <ArrowRight className="h-4 w-4 text-muted-foreground" />}
              <span>{doc.title}</span>
            </Anchor>
          </DialogClose>
        )

        const childItems = doc.items ? renderDocumentStructure(doc.items, currentRelativePath, isComponentItem) : []
        return [linkElement, ...childItems]
      })
    },
    [handleOpenChange],
  )

  const renderSearchResults = useCallback(() => {
    return filteredResults.map((item, index) => {
      const absoluteHref = getAbsoluteDocPath(item.href)
      const uniqueKey = item.id || absoluteHref

      return (
        <DialogClose key={uniqueKey} asChild>
          <Anchor
            className={cn(
              "flex flex-col gap-1 rounded-md p-3 transition-colors hover:bg-muted",
              selectedIndex === index && "bg-muted ring-2 ring-primary",
            )}
            href={absoluteHref}
            onClick={() => handleOpenChange(false)}
          >
            <div className="flex items-center gap-3">
              <FileText className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <span className="font-medium">{item.title}</span>
            </div>
            {item.snippet && (
              <p
                className="text-sm text-muted-foreground line-clamp-2 ml-7"
                dangerouslySetInnerHTML={{ __html: sanitizeHtml(item.snippet) }}
              />
            )}
          </Anchor>
        </DialogClose>
      )
    })
  }, [filteredResults, selectedIndex, handleOpenChange])

  const getScrollAreaContent = useCallback(() => {
    const trimmedInput = searchedInput.trim()

    if (isLoading) {
      return <p className="p-4 text-sm text-muted-foreground text-center">Searching...</p>
    }

    if (trimmedInput.length > 0 && trimmedInput.length < MIN_SEARCH_LENGTH) {
      return (
        <p className="p-4 text-sm text-muted-foreground text-center">
          Please enter at least {MIN_SEARCH_LENGTH} characters...
        </p>
      )
    }

    if (trimmedInput.length >= MIN_SEARCH_LENGTH) {
      if (filteredResults.length === 0) {
        return (
          <p className="p-4 text-sm text-muted-foreground text-center">
            No results for "<span className="font-medium">{trimmedInput}</span>"
          </p>
        )
      }
      return <div className="flex flex-col gap-1">{renderSearchResults()}</div>
    }

    return (
      <div className="flex flex-col">
        <div className="flex flex-col gap-1">{renderDocumentStructure(DocsRouting.sidebarItems)}</div>
      </div>
    )
  }, [isLoading, searchedInput, filteredResults, renderDocumentStructure, renderSearchResults])

  return (
    <div className="relative lg:w-full max-w-xl">
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
          <button
            className={cn(
              "group flex w-full items-center text-sm transition-colors rounded-md h-8 lg:px-3 gap-2",
              "lg:bg-muted/50 bg-transparent hover:bg-muted/70",
              "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
              "lg:bg-muted",
            )}
            aria-label="Search documentation"
          >
            <SearchIcon className="h-5 w-5 text-foreground flex-shrink-0 lg:hidden flex" />
            <span className="flex-1 text-left text-muted-foreground group-hover:text-foreground hidden xl:inline-flex">
              Search documentation...
            </span>
            <span className="flex-1 text-left text-muted-foreground group-hover:text-foreground hidden lg:inline-flex xl:hidden">
              Search docs...
            </span>
            <div className="flex items-center gap-1">
              <kbd className="ml-auto pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-card px-1.5 font-mono text-[10px] font-medium text-muted-foreground lg:flex">
                {platform === "mac" ? "⌘" : "Ctrl"}
              </kbd>
              <kbd className="ml-auto pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-card px-1.5 font-mono text-[10px] font-medium text-muted-foreground lg:flex">
                K
              </kbd>
            </div>
          </button>
        </DialogTrigger>
        <DialogContent className="max-w-xl overflow-hidden rounded-lg top-[40%] lg:top-[50%] !p-1 shadow-2xl">
          <div className="border-b">
            <div className="relative flex items-center">
              <SearchIcon className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
              <input
                ref={inputRef}
                value={searchedInput}
                onChange={(e) => setSearchedInput(e.target.value)}
                placeholder="Search documentation..."
                className="w-full border-0 bg-transparent py-4 pl-12 pr-12 text-sm outline-none placeholder:text-muted-foreground focus:ring-0"
                aria-label="Search input"
              />
              <DialogTitle className="sr-only">Search documentation</DialogTitle>
              <DialogClose asChild>
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-muted py-[1px] px-1.5 text-xs hover:bg-muted/80 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  aria-label="Close search dialog"
                >
                  Esc
                </button>
              </DialogClose>
            </div>
          </div>
          <ScrollArea className="max-h-[40vh] min-h-[100px]">
            <div className="p-2">{getScrollAreaContent()}</div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  )
}
