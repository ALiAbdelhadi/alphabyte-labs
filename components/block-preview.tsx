"use client"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/library/collapsible"
import {
  Sidebar,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarProvider,
} from "@/components/ui/sidebar"
import {
  Tabs,
  TabsContainer,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import { cn } from "@/lib/utils"
import { getFolderTree } from "@/registry-blocks"
import { getCodeFiles } from "@/registry-blocks/code-srouce"
import { languageIcons } from "@/settings/LanguageIcon"
import { blocksWebsite } from "@/settings/settings"
import { motion } from "framer-motion"
import {
  Check,
  ChevronRight,
  Clipboard,
  File,
  FileCode,
  Folder,
  Fullscreen,
  Monitor,
  PanelLeftOpen,
  PanelRightOpen,
  Smartphone,
  Tablet,
} from "lucide-react"
import Prism from "prismjs"
import "prismjs/components/prism-javascript"
import "prismjs/components/prism-jsx"
import "prismjs/components/prism-tsx"
import "prismjs/components/prism-typescript"
import "prismjs/plugins/line-highlight/prism-line-highlight"
import "prismjs/plugins/line-highlight/prism-line-highlight.css"
import "prismjs/plugins/line-numbers/prism-line-numbers"
import "prismjs/plugins/line-numbers/prism-line-numbers.css"
import type React from "react"
import type { ComponentProps } from "react"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Separator } from "./library/separator"

interface PreProps extends ComponentProps<"pre"> {
  raw?: string
  className?: string
  highlightLines?: number[]
  folderPath?: string
  highlightStyle?: "solid" | "gradient" | "border" | "marker" | "custom"
  customHighlightClass?: string
  showLineNumbers?: boolean
}

function Pre({
  children,
  raw,
  className,
  highlightLines = [],
  folderPath,
  highlightStyle,
  customHighlightClass,
  showLineNumbers = true,
  ...rest
}: PreProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (isClient && typeof window !== "undefined") {
      Prism.highlightAll()
      const codeBlock = document.querySelector("pre code")
      if (codeBlock) {
        const lines = codeBlock.innerHTML.split("\n")
        const highlightedLines = lines.map((line, index) => {
          if (highlightLines.includes(index + 1)) {
            return `<span class="highlighted-line">${line}</span>`
          }
          return line
        })
        codeBlock.innerHTML = highlightedLines.join("\n")
      }
    }
  }, [children, highlightLines, highlightStyle, customHighlightClass, isClient])

  const language = className?.split("-")[1] || "typescript"
  const lineNumbersClass = showLineNumbers ? "line-numbers" : ""

  if (!isClient) {
    return (
      <div className="code-block-container relative group rounded-[6px] custom-scrollbar my-5 w-full">
        <pre
          className={`overflow-x-auto max-h-[650px] hide-scrollbar ${lineNumbersClass}`}
        >
          <code>{children}</code>
        </pre>
      </div>
    )
  }

  return (
    <pre
      className={cn(
        `language-${language}`,
        className,
        "overflow-x-auto",
        lineNumbersClass
      )}
      data-line={
        highlightLines.length > 0 ? highlightLines.join(",") : undefined
      }
    >
      <code className={cn("language-" + language)}>{children}</code>
    </pre>
  )
}

interface screenWidthProps {
  desktop: string
  tablet: string
  smartphone: string
}
interface FileTree {
  name: string
  path?: string
  children?: FileTree[]
}

interface CodeFile {
  path: string
  content: string
  language?: string
}

interface BlockPreview {
  children?: React.ReactNode
  code?: string
  codeFiles?: CodeFile[]
  className?: string
  id: string
  BlockName: string
  BlockId: string
  fileTree?: FileTree[] | string
}

const CopyButton = ({ content }: { content: string }) => {
  const [isCopied, setIsCopied] = useState(false)
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(content)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (error) {
      console.error("Failed to copy:", error)
    }
  }
  return (
    <button
      className="flex items-center bg-muted hover:bg-gray-200/60 dark:hover:bg-muted-foreground/10 shadow-sm py-3 md:py-2.5 px-3 rounded-[7px] space-x-1 transition-colors"
      onClick={copyToClipboard}
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
              className={`inline-block transition-opacity duration-300 ${isCopied ? "opacity-0" : "opacity-100"}`}
            >
              y
            </span>
            <span
              className={`absolute left-0 transition-all duration-300 ${isCopied ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-1"}`}
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

function Tree({
  item,
  index,
  activeFile,
  setActiveFile,
}: {
  item: FileTree
  index: number
  activeFile: string | null
  setActiveFile: (file: string) => void
}) {
  if (!item.children) {
    return (
      <SidebarMenuItem>
        <SidebarMenuButton
          isActive={item.path === activeFile}
          onClick={() => item.path && setActiveFile(item.path)}
          className="whitespace-nowrap rounded-none pl-[--index] text-gray-100 hover:text-gray-100 hover:!bg-gray-950/20 dark:focus:bg-gray-950/20 dark:focus:text-gray-200 focus-visible:bg-gray-950/20 data-[active=true]:bg-gray-950/40 !data-[open=true]:hover:text-gray-100 data-[active=true]:text-gray-200"
          data-index={index}
          style={
            {
              "--index": `${index * (index === 2 ? 1.2 : 1.3)}rem`,
            } as React.CSSProperties
          }
        >
          <ChevronRight className="invisible" />
          <File className="h-4 w-4 text-sky-500 dark:text-sky-400" />
          {item.name}
        </SidebarMenuButton>
      </SidebarMenuItem>
    )
  }

  return (
    <SidebarMenuItem>
      <Collapsible
        className="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90"
        defaultOpen
      >
        <CollapsibleTrigger asChild>
          <SidebarMenuButton
            className="whitespace-nowrap rounded-none pl-[--index] text-gray-100 hover:text-gray-100 hover:!bg-gray-950/20 dark:focus:bg-gray-950/20 focus-visible:bg-gray-950/20 data-[active=true]:bg-gray-950/40 !data-[open=true]:hover:text-gray-100 data-[active=true]:text-gray-200"
            style={
              {
                "--index": `${index * (index === 1 ? 1 : 1.2)}rem`,
              } as React.CSSProperties
            }
          >
            <ChevronRight className="h-4 w-4 transition-transform" />
            <Folder className="h-4 w-4 text-yellow-500 dark:text-yellow-400" />
            {item.name}
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub className="m-0 w-full border-none p-0">
            {item.children.map((subItem, key) => (
              <Tree
                key={key}
                item={subItem}
                index={index + 1}
                activeFile={activeFile}
                setActiveFile={setActiveFile}
              />
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
  )
}

function BlockFileTree({
  fileTree,
  activeFile,
  setActiveFile,
}: {
  fileTree: FileTree[]
  activeFile: string | null
  setActiveFile: (file: string) => void
}) {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(true)
  const openButtonRef = useRef<HTMLButtonElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  const toggleSidebar = useCallback(() => {
    setSidebarIsOpen((prevState) => !prevState)
  }, [])
  useEffect(() => {
    if (!sidebarIsOpen) {
      const timer = setTimeout(() => {
        openButtonRef.current?.focus()
      }, 350)
      return () => clearTimeout(timer)
    } else {
      closeButtonRef.current?.focus()
    }
  }, [sidebarIsOpen])

  const sidebarVariants = {
    open: {
      width: 280,
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
    closed: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
  }

  return (
    <>
      {!sidebarIsOpen && (
        <button
          ref={openButtonRef}
          onClick={toggleSidebar}
          aria-label="Open sidebar"
          className="relative z-20 p-2 border-r flex border-gray-700 transition-colors bg-[#252526] "
        >
          <PanelLeftOpen
            strokeWidth={2.5}
            absoluteStrokeWidth
            className="w-6 h-6 text-gray-100"
          />
        </button>
      )}
      <motion.aside
        initial={sidebarIsOpen ? "open" : "closed"}
        animate={sidebarIsOpen ? "open" : "closed"}
        variants={sidebarVariants}
        className="h-[70vh] md:h-[90vh]"
      >
        <SidebarProvider className="flex !min-h-full flex-col">
          <Sidebar
            collapsible="none"
            className="w-full flex-1 border-r border-gray-700 dark:border-gray-700 bg-[#252526] text-foreground"
          >
            <SidebarGroupLabel className="h-12 rounded-none border-b border-gray-700 px-4 text-sm flex justify-between items-center">
              <div className="flex space-x-2 items-center">
                <div className="w-3 h-3 rounded-full bg-red-500/30 border border-red-500/40" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/30 border border-yellow-500/40" />
                <div className="w-3 h-3 rounded-full bg-green-500/30 border border-green-500/40" />
              </div>
              {sidebarIsOpen && (
                <button
                  ref={closeButtonRef}
                  onClick={toggleSidebar}
                  aria-label="Close sidebar"
                  className="p-1 rounded-md hover:bg-gray-900/20 transition-colors bg-[#252526]"
                >
                  <PanelRightOpen
                    strokeWidth={2.5}
                    absoluteStrokeWidth
                    className="w-6 h-6 text-gray-100"
                  />
                </button>
              )}
            </SidebarGroupLabel>
            <SidebarGroup className="p-0">
              <SidebarGroupContent>
                <SidebarMenu className="gap-1.5">
                  {fileTree.map((file, index) => (
                    <Tree
                      key={index}
                      item={file}
                      index={1}
                      activeFile={activeFile}
                      setActiveFile={setActiveFile}
                    />
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </Sidebar>
        </SidebarProvider>
      </motion.aside>
    </>
  )
}

export default function BlockPreview({
  children,
  code = "",
  codeFiles = [],
  className,
  id,
  BlockName,
  BlockId,
  fileTree,
}: BlockPreview) {
  const [active, setActive] = useState("desktop")
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [previewWidth, setPreviewWidth] = useState("100%")
  const [isLoaded, setIsLoaded] = useState(false)
  const [view, setView] = useState<"preview" | "code">("preview")
  const [activeFile, setActiveFile] = useState<string | null>(null)
  const language = className?.split("-")[1] || "typescript"

  const resolvedFileTree = useMemo(() => {
    if (!fileTree) return []

    if (typeof fileTree === "string") {
      const tree = getFolderTree(fileTree)
      if (Array.isArray(tree)) {
        return tree
      } else if (tree && typeof tree === "object") {
        const firstKey = Object.keys(tree)[0]
        const value = (tree as Record<string, any>)[firstKey]
        return Array.isArray(value) ? value : []
      }
    } else if (Array.isArray(fileTree)) {
      return fileTree
    }

    return []
  }, [fileTree])

  const [resolvedCodeFiles, setResolvedCodeFiles] = useState(codeFiles)

  useEffect(() => {
    if (typeof fileTree === "string" && codeFiles.length === 0) {
      const loadedCodeFiles = getCodeFiles(fileTree)
      if (loadedCodeFiles) {
        if (Array.isArray(loadedCodeFiles)) {
          setResolvedCodeFiles(loadedCodeFiles)
          if (!code && loadedCodeFiles.length > 0) {
            setDefaultCode(loadedCodeFiles[0].content)
          }
        } else if (typeof loadedCodeFiles === "object") {
          const firstKey = Object.keys(loadedCodeFiles)[0]
          const files = (loadedCodeFiles as Record<string, any>)[firstKey]
          if (Array.isArray(files)) {
            setResolvedCodeFiles(files)
            if (!code && files.length > 0) {
              setDefaultCode(files[0].content)
            }
          }
        }
      }
    }
  }, [fileTree, codeFiles, code])

  const [defaultCode, setDefaultCode] = useState(code)

  const getActiveFileContent = useCallback(() => {
    if (resolvedCodeFiles.length > 0 && activeFile) {
      const foundFile = resolvedCodeFiles.find(
        (file) => file.path === activeFile
      )
      if (foundFile) {
        return foundFile.content
      }
    }
    return defaultCode
  }, [defaultCode, resolvedCodeFiles, activeFile])

  useEffect(() => {
    if (!activeFile && resolvedFileTree && Array.isArray(resolvedFileTree)) {
      const findFirstFile = (tree: FileTree[]): string | null => {
        for (const item of tree) {
          if (item.path) {
            return item.path
          }
          if (item.children) {
            const found = findFirstFile(item.children)
            if (found) return found
          }
        }
        return null
      }

      const firstFile = findFirstFile(resolvedFileTree)
      if (firstFile) {
        setActiveFile(firstFile)
      }
    }
  }, [resolvedFileTree, activeFile])

  const screensWidth: screenWidthProps = {
    desktop: "100%",
    tablet: "768px",
    smartphone: "480px",
  }

  useEffect(() => {
    const updatePreviewWidth = () => {
      const windowWidth = window.innerWidth
      if (active === "desktop") {
        setPreviewWidth("100%")
      } else {
        const targetWidth = Number.parseInt(
          screensWidth[active as keyof screenWidthProps]
        )
        setPreviewWidth(
          windowWidth < targetWidth
            ? "100%"
            : screensWidth[active as keyof screenWidthProps]
        )
      }
    }

    updatePreviewWidth()
    window.addEventListener("resize", updatePreviewWidth)
    return () => window.removeEventListener("resize", updatePreviewWidth)
  }, [active, screensWidth])

  const toggleFullScreen = useCallback(() => {
    const element = document.getElementById(id)
    if (!element) return
    if (!isFullScreen) {
      if (element.requestFullscreen) {
        element
          .requestFullscreen()
          .then(() => {
            setIsFullScreen(true)
            element.style.overflowY = "auto"
          })
          .catch(console.error)
      }
    } else {
      if (document.fullscreenElement) {
        document
          .exitFullscreen()
          .then(() => {
            setIsFullScreen(false)
            element.style.overflowY = ""
          })
          .catch(console.error)
      }
    }
  }, [id, isFullScreen])

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement)
    }
    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [])

  if (!defaultCode && resolvedCodeFiles.length === 0) {
    return <div className={cn("mt-4", className)}>{children}</div>
  }

  const iframeSource = `${blocksWebsite}/${BlockId}`

  return (
    <Tabs
      defaultValue="preview"
      className="mt-4 transition-colors duration-300"
      value={view}
      onValueChange={(value) => setView(value as "preview" | "code")}
    >
      <nav className="flex flex-row justify-between md:gap-4 gap-2 items-center mb-4">
        <div className="flex items-center md:gap-4 gap-1 justify-start flex-row w-full">
          <div className="flex items-center md:gap-2 gap-1">
            <h3 className="text-lg md:text-xl font-medium text-wrap text-gray-900 dark:text-gray-100">
              {BlockName}
            </h3>
            <span className="inline-flex items-center gap-1 bg-teal-200 px-2 py-1 text-xs font-medium text-teal-800 rounded-lg select-none">
              Free
            </span>
          </div>
          <Separator
            orientation="vertical"
            className="shrink-0 bg-border w-[1.5px] h-5 md:block hidden"
          />
          <TabsList className="inline-flex h-9 items-center text-muted-foreground max-w-fit justify-start rounded-none bg-transparent">
            <TabsContainer className="bg-muted rounded-[7px]">
              <TabsTrigger
                value="preview"
                className="text-sm border-none rounded-[6px] sm:px-3 px-1"
              >
                preview
              </TabsTrigger>
              <TabsTrigger
                value="code"
                className="text-sm border-none rounded-[6px] sm:px-3 px-1"
              >
                code
              </TabsTrigger>
            </TabsContainer>
          </TabsList>
        </div>
        <div className="flex items-center md:flex-row flex-col gap-4">
          <TabsContainer className="items-center shadow-sm py-1 px-2 rounded-[7px] space-x-1 md:flex hidden">
            {[
              { id: "desktop", icon: <Monitor className="w-4 h-4" /> },
              { id: "tablet", icon: <Tablet className="w-4 h-4" /> },
              { id: "smartphone", icon: <Smartphone className="w-4 h-4" /> },
            ].map((device) => (
              <button
                key={device.id}
                className="p-1.5 rounded-[6px] transition relative z-10"
                onClick={() => setActive(device.id)}
              >
                {device.icon}
              </button>
            ))}
            <Separator
              orientation="vertical"
              className="shrink-0 bg-border w-[1.5px] h-5"
            />
            <button
              className="!ml-[7px]"
              onClick={toggleFullScreen}
              aria-label={
                isFullScreen ? "Exit full screen" : "Enter full screen"
              }
            >
              <Fullscreen className="w-4 h-4" />
            </button>
          </TabsContainer>
          <Separator
            orientation="vertical"
            className="shrink-0 bg-border w-[1.5px] h-5 md:block hidden"
          />
          <CopyButton content={code} />
        </div>
      </nav>
      <div>
        <TabsContent
          value="preview"
          className={cn(
            "border rounded-xl transition-all duration-300 dark:border-gray-700",
            className,
            {
              "mr-auto": active !== "desktop",
            }
          )}
          style={{
            width: previewWidth,
            maxWidth: "100%",
            overflowX: "auto",
          }}
        >
          <iframe
            className={
              "overflow-hidden preview min-h-[86.5vh] transition-all w-full"
            }
            id={id}
            src={iframeSource}
            sandbox="allow-scripts allow-same-origin "
            onLoad={() => setIsLoaded(true)}
          />
        </TabsContent>
        <TabsContent value="code" className="rounded-xl">
          {resolvedFileTree ? (
            <div className="flex overflow-hidden rounded-xl border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1e1e1e] text-foreground h-[70vh] md:h-[90vh]">
              <BlockFileTree
                fileTree={resolvedFileTree}
                activeFile={activeFile}
                setActiveFile={setActiveFile}
              />
              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex h-12 items-center gap-2 border-b border-gray-700 bg-[#1e1e1e] px-4 text-sm font-medium">
                  <div className="flex gap-2 items-center">
                    <div className="w-4 h-4">
                      {languageIcons[language] || (
                        <FileCode className="w-4 h-4 text-gray-400" />
                      )}
                    </div>
                    <span className="text-gray-100">
                      {activeFile || "Select a file from the menu"}
                    </span>
                  </div>
                </div>
                <div className="relative flex-1 overflow-auto bg-[#1e1e1e]">
                  {activeFile ? (
                    <Pre
                      raw={getActiveFileContent()}
                      className={`language-tsx hide-scrollbar`}
                    >
                      {getActiveFileContent()}
                    </Pre>
                  ) : (
                    <div className="flex h-full items-center justify-center text-muted-foreground">
                      Select a file from the menu to view content
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <Pre raw={code} className="language-tsx">
              {code}
            </Pre>
          )}
        </TabsContent>
      </div>
    </Tabs>
  )
}
