"use client"

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/library/dialog"
import { ScrollArea } from "@/components/library/scroll-area"
import { advanceSearch, cn, debounce, search } from "@/lib/utils"
import { DocsRouting } from "@/settings/docs-routing"
import { SearchIcon } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import { LuFileText } from "react-icons/lu"
import Anchor from "./anchor"

interface Document {
  title?: string
  href?: string
  spacer?: boolean
  items?: Document[]
}

export default function Search() {
  const [searchedInput, setSearchedInput] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [filteredResults, setFilteredResults] = useState<search[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [platform, setPlatform] = useState<"mac" | "windows">("windows")

  // Detecting User Device
  useEffect(() => {
    const DetectPlatform = () => {
      const platform = navigator.platform.toLowerCase()
      const userAgent = navigator.userAgent.toLowerCase()
      if (platform.includes("mac") || userAgent.includes("mac")) {
        setPlatform("mac")
      } else if (platform.includes("win") || userAgent.includes("win")) {
        setPlatform("windows")
      }
    }
    DetectPlatform()
  }, [])

  // Handle Key CTRL+k
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        (platform === "mac" ? event.metaKey : event.ctrlKey) &&
        event.key === "k"
      ) {
        event.preventDefault()
        setIsOpen(true)
      }

      if (isOpen && event.key === "Enter" && filteredResults.length > 0) {
        const selected = filteredResults[0]
        if ("href" in selected) {
          window.location.href = `/docs${selected.href}`
          setIsOpen(false)
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, filteredResults, platform])

  // Set up debounced search
  const debouncedSearch = useMemo(
    () =>
      debounce((input) => {
        setIsLoading(true)
        const results = advanceSearch(input.trim())
        setFilteredResults(results)
        setIsLoading(false)
      }, 300),
    []
  )

  // Trigger search when input changes
  useEffect(() => {
    if (searchedInput.length >= 3) {
      debouncedSearch(searchedInput)
    } else {
      setFilteredResults([])
    }
  }, [searchedInput, debouncedSearch])

  // Render documentation links
  function renderDocuments(
    documents: Document[],
    parentHref: string = "/docs"
  ): React.ReactNode[] {
    if (!documents || !Array.isArray(documents)) {
      return []
    }

    return documents.flatMap((doc) => {
      if ("spacer" in doc && doc.spacer) {
        return []
      }

      const href = `${parentHref}${doc.href}`

      return [
        <DialogClose key={href} asChild>
          <Anchor
            className={cn(
              "w-full px-3 flex items-center gap-2.5 text-[15px] rounded-sm hover:bg-neutral-100 dark:hover:bg-neutral-900"
            )}
            href={href}
          >
            <div className="flex items-center h-full w-fit gap-1.5 py-3 whitespace-nowrap">
              <LuFileText className="h-[1.1rem] w-[1.1rem]" /> {doc.title}
            </div>
          </Anchor>
        </DialogClose>,
        ...renderDocuments(doc.items || [], `${href}`),
      ]
    })
  }

  return (
    <div className="relative md:w-full max-w-xl">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <button className="group hidden lg:flex w-full items-center gap-2 rounded-lg hover:bg-gray-200 dark:hover:bg-neutral-950 bg-[rgba(250,250,252,0.3)] dark:bg-background/60 backdrop-blur-lg backdrop-filter backdrop-saturate-[200%] px-1.5 py-[7px] text-left text-sm transition-colors border border-input">
            <span className="flex-1 hidden xl:flex text-muted-foreground text-sm ml-2 group-hover:text-foreground ">
              Search documentation...
            </span>
            <span className="flex-1 hidden lg:flex xl:hidden text-muted-foreground">
              Search docs...
            </span>
            <kbd className="hidden rounded-[4px] bg-muted p-0.5 text-xs text-gray-500 dark:text-gray-300 dark:bg-neutral-950 sm:inline-block font-semibold ">
              {platform === "mac" ? "⌘ K" : "Ctrl K"}
            </kbd>
          </button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl overflow-hidden dark:bg-neutral-900 rounded-lg top-[40%] lg:top-[50%] !p-2">
          <DialogTitle className="px-4 py-2 text-lg font-semibold sr-only">
            Search documentation
          </DialogTitle>
          <div className="border-b dark:border-neutral-800">
            <div className="relative">
              <SearchIcon className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <input
                value={searchedInput}
                onChange={(e) => setSearchedInput(e.target.value)}
                placeholder="Search documentation..."
                className="w-full border-0 bg-transparent py-4 pl-12 pr-4 text-sm outline-none placeholder:text-gray-500"
                autoFocus
              />
              <DialogClose>
                <kbd className="bg-[#e8e8e8e6] py-[1px] px-1.5 text-sm hover:bg-[#e4e4e4e6] absolute right-4 top-4 text-black rounded-md">
                  Esc
                </kbd>
              </DialogClose>
            </div>
          </div>
          <ScrollArea className="max-h-[40vh]">
            <div className="p-2">
              {searchedInput.length > 0 && searchedInput.length < 3 && (
                <p className="p-4 text-sm text-gray-500">
                  Please enter at least 3 characters...
                </p>
              )}
              {isLoading ? (
                <p className="p-4 text-sm text-gray-500">Searching...</p>
              ) : filteredResults.length === 0 && searchedInput.length >= 3 ? (
                <p className="p-4 text-sm text-gray-500">
                  No results for "
                  <span className="font-medium">{searchedInput}</span>"
                </p>
              ) : (
                <div className="flex flex-col gap-1">
                  {searchedInput.length >= 3
                    ? filteredResults.map((item) => {
                      if ("href" in item) {
                        return (
                          <DialogClose key={item.href} asChild>
                            <Anchor
                              className="flex flex-col gap-1 rounded-md p-3 transition-colors hover:bg-gray-100 dark:hover:bg-neutral-800"
                              href={`/docs${item.href}`}
                            >
                              <div className="flex items-center gap-2">
                                <LuFileText className="h-4 w-4" />
                                <span className="font-medium">
                                  {item.title}
                                </span>
                              </div>
                              {"snippet" in item && item.snippet && (
                                <p
                                  className="text-sm text-gray-500"
                                  dangerouslySetInnerHTML={{
                                    __html: item.snippet,
                                  }}
                                />
                              )}
                            </Anchor>
                          </DialogClose>
                        )
                      }
                      return null
                    })
                    : renderDocuments(DocsRouting.sidebarItems)}
                </div>
              )}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  )
}
