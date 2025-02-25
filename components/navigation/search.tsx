"use client"

import { DocsRouting } from "@/settings/DocsRouting"
import { useEffect, useState } from "react"
import { LuFileText } from "react-icons/lu"

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { highlight, search } from "@/lib/utils"
import { SearchIcon } from "lucide-react"
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

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((platform === "mac" ? event.metaKey : event.ctrlKey) && event.key === "k") {
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


  function renderDocuments(
    documents: Document[],
    parentHref: string = "/docs"
  ): React.ReactNode[] {
    if (!documents || !Array.isArray(documents)) return []

    return documents.flatMap((doc) => {
      if ("spacer" in doc && doc.spacer) return []

      const href = `${parentHref}${doc.href}`
      return [
        <DialogClose key={href} asChild>
          <Anchor
            className="flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors hover:bg-gray-100 dark:hover:bg-neutral-800"
            href={href}
          >
            <LuFileText className="h-4 w-4" />
            <span className="truncate">{doc.title}</span>
          </Anchor>
        </DialogClose>,
        ...renderDocuments(doc.items || [], `${href}`),
      ]
    })
  }

  return (
    <div className="relative w-full max-w-xl">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <div>
            <span className="lg:hidden flex items-center cursor-pointer">
              <SearchIcon className="h-5 w-5 text-gray-950" />
            </span>
            <button className="group hidden lg:flex w-full items-center gap-2 rounded-md hover:bg-gray-200 dark:hover:bg-neutral-950 bg-stone-100 dark:bg-neutral-900 px-3 py-2 text-left text-sm shadow-sm transition-colors">
              <SearchIcon className="h-5 w-5 text-gray-950 dark:text-gray-100 hidden lg:flex" />
              <span className="flex-1 hidden xl:flex text-gray-500 dark:text-gray-300">Search documentation...</span>
              <span className="flex-1 hidden lg:flex xl:hidden text-gray-500 dark:text-gray-300">Search docs...</span>
              <kbd className="hidden rounded bg-gray-200 p-1 text-xs text-gray-500 dark:text-gray-300 dark:bg-neutral-950 sm:inline-block font-semibold">
                {platform === "mac" ? "⌘ K" : "Ctrl K"}
              </kbd>
            </button>
          </div>
        </DialogTrigger>
        <DialogContent className="max-w-2xl overflow-hidden p-0 dark:bg-neutral-900 rounded-lg top-[40%] lg:top-[50%]">
          <DialogTitle className="px-4 py-2 text-lg font-semibold sr-only">Search documentation</DialogTitle>
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
                <kbd
                  className="bg-[#e8e8e8e6] py-[1px] px-1.5 text-sm hover:bg-[#e4e4e4e6] absolute right-4 top-4 text-black rounded-md"
                >
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
                  No results for "<span className="font-medium">{searchedInput}</span>"
                </p>
              ) : (
                <div className="flex flex-col gap-1">
                  {searchedInput
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
                                <span className="font-medium">{item.title}</span>
                              </div>
                              {"snippet" in item && item.snippet && (
                                <p
                                  className="text-sm text-gray-500"
                                  dangerouslySetInnerHTML={{
                                    __html: highlight(item.snippet, searchedInput),
                                  }}
                                />
                              )}
                            </Anchor>
                          </DialogClose>
                        )
                      }
                      return null
                    })
                    : renderDocuments(DocsRouting)}
                </div>
              )}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  )
}