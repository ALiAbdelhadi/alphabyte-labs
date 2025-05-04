"use client"

import type React from "react"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { blockExamples } from "@/registry/blocks-examples"
import { languageIcons } from "@/settings/LanguageIcon"
import { motion } from "framer-motion"
import {
  ChevronRight,
  File,
  FileCode,
  Folder,
  Fullscreen,
  Monitor,
  PanelLeft,
  PanelRight,
  Smartphone,
  Tablet,
} from "lucide-react"

import { cn } from "@/lib/utils"
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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/library/collapsible"
import { Pre } from "@/components/pre-for-block-preview"

import { CopyButton } from "./copy-button-for-block-preview"
import { Separator } from "./library/separator"

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

function normalizePath(path: string, type: "lib" | "constant"): string {
  let normalizedPath = path

  if (type === "lib") {
    if (normalizedPath.endsWith("/utils.ts")) {
      normalizedPath = normalizedPath.replace("/utils.ts", "/utils")
    } else if (normalizedPath.endsWith("/utils")) {
      normalizedPath = normalizedPath.replace("/utils", "")
    } else if (!normalizedPath.endsWith("/utils")) {
      normalizedPath = `${normalizedPath}/utils`
    }
  } else if (type === "constant") {
    if (normalizedPath.endsWith("/index.tsx")) {
      normalizedPath = normalizedPath.replace("/index.tsx", "/index")
    } else if (normalizedPath.endsWith("/index")) {
      normalizedPath = normalizedPath.replace("/index", "")
    } else if (!normalizedPath.endsWith("/index")) {
      normalizedPath = `${normalizedPath}/index`
    }
  }

  return normalizedPath
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

  const sidebarVariants = {
    open: {
      width: 280,
      opacity: 1,
      transition: { duration: 0.3 },
    },
    closed: {
      width: 0,
      opacity: 0,
      transition: { duration: 0.3 },
    },
  }

  return (
    <>
      {!sidebarIsOpen && (
        <button
          ref={openButtonRef}
          onClick={toggleSidebar}
          aria-label="Open sidebar"
          className="relative z-20 p-2 border-r flex border-gray-700 transition-colors bg-[#252526]"
        >
          <PanelLeft
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
        className="h-screen"
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
                  <PanelRight
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

function generateFileTreeFromBlockId(blockId: string) {
  const block = blockExamples.items.find((item) => item.name === blockId)
  if (!block) return []

  const fileTree: FileTree[] = [
    {
      name: blockId,
      children: [
        {
          name: "page.tsx",
          path: block.target,
        },
        {
          name: "components",
          children: block.components.map((comp) => {
            const pathParts = comp.split("/")
            const fileName = pathParts[pathParts.length - 1]
            return {
              name: `${fileName}.tsx`,
              path: comp,
            }
          }),
        },
      ],
    },
  ]

  if (block.constant && block.constant.length > 0) {
    fileTree[0].children?.push({
      name: "constant",
      children: block.constant.map((constant) => {
        return {
          name: "index.tsx",
          path: `${constant}/index`,
        }
      }),
    })
  }
  if (block.lib && block.lib.length > 0) {
    fileTree[0].children?.push({
      name: "lib",
      children: block.lib.map((lib) => {
        return {
          name: "utils.ts",
          path: `${lib}/utils`,
        }
      }),
    })
  }
  return fileTree
}

export default function BlockPreview({
  children,
  code = "",
  codeFiles = [],
  className,
  id,
  BlockName,
  BlockId,
  fileTree: initialFileTree,
}: BlockPreview) {
  const [active, setActive] = useState("desktop")
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [previewWidth, setPreviewWidth] = useState("100%")
  const [view, setView] = useState<"preview" | "code">("preview")
  const [activeFile, setActiveFile] = useState<string | null>(null)
  const [iframeHeight, setIframeHeight] = useState(500)
  const [resolvedCodeFiles, setResolvedCodeFiles] =
    useState<CodeFile[]>(codeFiles)
  const [generatedFileTree, setGeneratedFileTree] = useState<FileTree[]>([])
  const [isLoadingCode, setIsLoadingCode] = useState(false)
  const [sourceMap, setSourceMap] = useState<Record<string, any> | null>(null)
  const [isIframeVisible, setIsIframeVisible] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const language = className?.split("-")[1] || "typescript"

  const iframeSource = useMemo(
    () => (BlockId ? `/view/${BlockId}` : ""),
    [BlockId]
  )
  const sourceCodeCache = useRef<Record<string, string>>({})

  useEffect(() => {
    async function loadSourceMap() {
      try {
        const module = await import("@/registry/blocks-view-source-map.json")
        setSourceMap(module.default as Record<string, any>)
      } catch (error) {
        console.error("Error loading source map:", error)
      }
    }
    loadSourceMap()
  }, [])

  useEffect(() => {
    if (BlockId) {
      const tree = generateFileTreeFromBlockId(BlockId)
      setGeneratedFileTree(tree)
    }
  }, [BlockId])

  const resolvedFileTree = useMemo(() => {
    if (initialFileTree) {
      if (typeof initialFileTree === "string") {
        return generatedFileTree
      } else if (Array.isArray(initialFileTree)) {
        return initialFileTree
      }
    }
    return generatedFileTree
  }, [initialFileTree, generatedFileTree])

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (
        event.data &&
        event.data.type === "resize-iframe" &&
        event.data.blockId === id
      ) {
        setIframeHeight(event.data.height)
      }
    }

    window.addEventListener("message", handleMessage)
    return () => window.removeEventListener("message", handleMessage)
  }, [id])

  useEffect(() => {
    if (activeFile && BlockId && sourceMap) {
      const cacheKey = `${BlockId}:${activeFile}`
      if (sourceCodeCache.current[cacheKey]) {
        const cachedData = JSON.parse(sourceCodeCache.current[cacheKey])
        setResolvedCodeFiles((prev) => {
          const fileIndex = prev.findIndex((file) => file.path === activeFile)
          if (fileIndex >= 0) {
            const updated = [...prev]
            updated[fileIndex] = { ...updated[fileIndex], ...cachedData }
            return updated
          }
          return [...prev, { path: activeFile, ...cachedData }]
        })
        return
      }

      setIsLoadingCode(true)

      async function loadSourceCode() {
        try {
          if (!sourceMap) {
            console.warn("Source map is not loaded yet")
            setIsLoadingCode(false)
            return
          }

          const blockData = sourceMap[BlockId]
          if (!blockData) {
            console.warn(`Block data not found for ${BlockId}`)
            setIsLoadingCode(false)
            return
          }

          const nonNullActiveFile = activeFile as string
          let content = ""
          let fileLanguage = "tsx"

          if (nonNullActiveFile.includes("/components/")) {
            content =
              blockData.components?.[nonNullActiveFile] ||
              "// Component code not found"
          } else if (nonNullActiveFile.includes("/constant/")) {
            if (blockData.constant) {
              const normalizedActiveFile = normalizePath(
                nonNullActiveFile,
                "constant"
              )
              if (blockData.constant[normalizedActiveFile]) {
                content = blockData.constant[normalizedActiveFile]
              } else {
                const basePathWithoutIndex = normalizedActiveFile.replace(
                  "/index",
                  ""
                )
                if (blockData.constant[basePathWithoutIndex]) {
                  content = blockData.constant[basePathWithoutIndex]
                } else {
                  const constantPaths = Object.keys(blockData.constant)
                  const matchingPath = constantPaths.find(
                    (path) =>
                      path === normalizedActiveFile ||
                      path === basePathWithoutIndex ||
                      path.includes(basePathWithoutIndex) ||
                      basePathWithoutIndex.includes(path)
                  )
                  if (matchingPath) {
                    content = blockData.constant[matchingPath]
                  } else {
                    content = "// Constant code not found"
                  }
                }
              }
              fileLanguage = "tsx"
            } else {
              content = "// No constants defined for this block"
            }
          } else if (nonNullActiveFile.includes("/lib/")) {
            if (blockData.lib) {
              const normalizedActiveFile = normalizePath(
                nonNullActiveFile,
                "lib"
              )
              const libPaths = Object.keys(blockData.lib)
              if (blockData.lib[nonNullActiveFile]) {
                content = blockData.lib[nonNullActiveFile]
              } else if (blockData.lib[normalizedActiveFile]) {
                content = blockData.lib[normalizedActiveFile]
              } else {
                const matchingPath = libPaths.find(
                  (path) =>
                    path.includes(nonNullActiveFile.split("/").pop() || "") ||
                    nonNullActiveFile.includes(path.split("/").pop() || "")
                )
                if (matchingPath) {
                  content = blockData.lib[matchingPath]
                } else {
                  content =
                    "// lib code not found - available paths: " +
                    libPaths.join(", ")
                }
              }
              fileLanguage = "ts"
            } else {
              content = "// No lib defined for this block"
            }
          } else {
            // page.tsx or other root file
            if (blockData[nonNullActiveFile]) {
              content = blockData[nonNullActiveFile]
            } else {
              content = "// Page code not found"
            }
            fileLanguage = "tsx"
          }

          const cacheData = { content, language: fileLanguage }
          sourceCodeCache.current[cacheKey] = JSON.stringify(cacheData)
          setResolvedCodeFiles((prev) => {
            const fileIndex = prev.findIndex(
              (file) => file.path === nonNullActiveFile
            )
            const updated = [...prev]
            if (fileIndex >= 0) {
              updated[fileIndex] = {
                ...updated[fileIndex],
                content,
                language: fileLanguage,
              }
              return updated
            }
            return [
              ...prev,
              { path: nonNullActiveFile, content, language: fileLanguage },
            ]
          })
        } catch (error) {
          console.error("Error loading source code:", error)
        } finally {
          setIsLoadingCode(false)
        }
      }

      loadSourceCode()
    }
  }, [activeFile, BlockId, sourceMap])

  const [defaultCode, setDefaultCode] = useState(code)
  const getActiveFileContent = useCallback(() => {
    if (isLoadingCode) {
      return "// Loading code content..."
    }

    if (resolvedCodeFiles.length > 0 && activeFile) {
      const foundFile = resolvedCodeFiles.find(
        (file) => file.path === activeFile
      )
      if (foundFile) {
        return foundFile.content
      }
    }
    return defaultCode
  }, [defaultCode, resolvedCodeFiles, activeFile, isLoadingCode])

  const getActiveFileLanguage = useCallback(() => {
    if (resolvedCodeFiles.length > 0 && activeFile) {
      const foundFile = resolvedCodeFiles.find(
        (file) => file.path === activeFile
      )
      if (foundFile && foundFile.language) {
        return foundFile.language
      }
      if (activeFile.endsWith(".ts")) return "typescript"
      if (activeFile.endsWith(".tsx")) return "tsx"
      if (activeFile.endsWith(".js")) return "javascript"
      if (activeFile.endsWith(".jsx")) return "jsx"
      if (activeFile.endsWith(".css")) return "css"
    }
    return language
  }, [resolvedCodeFiles, activeFile, language])

  const contentToCopy = useMemo(() => {
    if (isLoadingCode) {
      return "// Loading code content..."
    }

    if (resolvedCodeFiles.length > 0 && activeFile) {
      const foundFile = resolvedCodeFiles.find(
        (file) => file.path === activeFile
      )
      if (foundFile) {
        return foundFile.content
      }
    }
    return defaultCode
  }, [defaultCode, resolvedCodeFiles, activeFile, isLoadingCode])
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

  const screensWidth = {
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
          screensWidth[active as keyof typeof screensWidth]
        )
        setPreviewWidth(
          windowWidth < targetWidth
            ? "100%"
            : screensWidth[active as keyof typeof screensWidth]
        )
      }
    }

    updatePreviewWidth()
    window.addEventListener("resize", updatePreviewWidth)
    return () => window.removeEventListener("resize", updatePreviewWidth)
  }, [active])

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

  // Handle fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement)
    }
    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
  }, [])

  // Lazy load iframe
  useEffect(() => {
    if (view !== "preview") return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsIframeVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    const element = document.getElementById(id)
    if (element) {
      observer.observe(element)
    }

    return () => observer.disconnect()
  }, [id, view])

  // Iframe component
  const IframeComponent = useMemo(() => {
    if (!isIframeVisible) return null

    return (
      <iframe
        ref={iframeRef}
        height={iframeHeight}
        className="overflow-hidden preview min-h-[86.5vh] transition-all w-full"
        id={id}
        src={iframeSource}
        sandbox="allow-scripts allow-same-origin"
        loading="lazy"
      />
    )
  }, [isIframeVisible, iframeHeight, id, iframeSource])

  // Iframe placeholder
  const IframePlaceholder = useMemo(() => {
    if (isIframeVisible) return null

    return (
      <div
        id={id}
        className="min-h-[86.5vh] w-full flex items-center justify-center bg-gray-50 dark:bg-gray-900"
      >
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-4 w-40 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
          <div className="h-2 w-24 bg-gray-200 dark:bg-gray-800 rounded"></div>
        </div>
      </div>
    )
  }, [isIframeVisible, id])
  if (!defaultCode && resolvedCodeFiles.length === 0 && !BlockId) {
    return <div className={cn("mt-4", className)}>{children}</div>
  }

  return (
    <Tabs
      defaultValue="preview"
      className="mt-4 transition-colors duration-300"
      value={view}
      onValueChange={(value: string) => {
        setView(value as "preview" | "code")
        if (value === "preview" && !isIframeVisible) {
          const observer = new IntersectionObserver(
            (entries) => {
              if (entries[0].isIntersecting) {
                setIsIframeVisible(true)
                observer.disconnect()
              }
            },
            { threshold: 0.1 }
          )

          const element = document.getElementById(id)
          if (element) {
            observer.observe(element)
          }
        }
      }}
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
          <CopyButton content={contentToCopy} />
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
          {!isIframeVisible ? IframePlaceholder : IframeComponent}
        </TabsContent>
        <TabsContent value="code" className="rounded-xl">
          <div className="flex overflow-hidden rounded-xl border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1e1e1e] text-foreground h-screen ">
            <BlockFileTree
              fileTree={resolvedFileTree}
              activeFile={activeFile}
              setActiveFile={setActiveFile}
            />
            <div className="flex min-w-0 flex-1 flex-col">
              <div className="flex h-12 items-center gap-2 border-b border-gray-700 bg-[#1e1e1e] px-4 text-sm font-medium">
                <div className="flex gap-2 items-center">
                  <div className="w-4 h-4">
                    {languageIcons[getActiveFileLanguage()] || (
                      <FileCode className="w-4 h-4 text-gray-400" />
                    )}
                  </div>
                  <span className="text-gray-100">
                    {activeFile
                      ? activeFile.split("/").pop()
                      : "Select a file from the menu"}
                  </span>
                </div>
              </div>
              <div className="relative flex-1 overflow-auto bg-[#1e1e1e]">
                {activeFile ? (
                  <Pre
                    raw={getActiveFileContent()}
                    className={`language-${getActiveFileLanguage()} hide-scrollbar`}
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
        </TabsContent>
      </div>
    </Tabs>
  )
}
