"use client"

import { BlockCodeView } from "@/components/block-code-view"
import { BlockPreviewHeader } from "@/components/block-preview-header"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import {
  type CodeFile,
  type FileTree,
  findFirstFile,
  generateFileTreeFromBlockId,
  loadSourceCode,
} from "@/registry/block"
import type React from "react"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import LoadingIcon from "./icons/loading-icon"

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
  const [previewWidth, setPreviewWidth] = useState("100%")
  const [view, setView] = useState<"preview" | "code">("preview")
  const [codeFoldingEnabled, setCodeFoldingEnabled] = useState(true)
  const [activeFile, setActiveFile] = useState<string | null>(null)
  const [iframeHeight, setIframeHeight] = useState(500)
  const [resolvedCodeFiles, setResolvedCodeFiles] = useState<CodeFile[]>(codeFiles)
  const [generatedFileTree, setGeneratedFileTree] = useState<FileTree[]>([])
  const [isLoadingFileTree, setIsLoadingFileTree] = useState(false)
  const [isLoadingCode, setIsLoadingCode] = useState(false)
  const [sourceMap, setSourceMap] = useState<Record<string, any> | null>(null)
  const [isIframeVisible, setIsIframeVisible] = useState(false)
  const [defaultCode] = useState(code)

  const iframeRef = useRef<HTMLIFrameElement>(null)
  const sourceCodeCache = useRef<Record<string, string>>({})

  const language = className?.split("-")[1] || "typescript"
  const iframeSource = useMemo(() => (BlockId ? `/view/${BlockId}` : ""), [BlockId])

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
    async function loadFileTree() {
      if (BlockId) {
        setIsLoadingFileTree(true)
        try {
          const tree = await generateFileTreeFromBlockId(BlockId)
          setGeneratedFileTree(tree)
        } catch (error) {
          console.error("Error generating file tree:", error)
        } finally {
          setIsLoadingFileTree(false)
        }
      }
    }
    loadFileTree()
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
      if (event.data && event.data.type === "resize-iframe" && event.data.blockId === id) {
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

      async function fetchSourceCode() {
        try {
          if (!activeFile) return
          const result = await loadSourceCode(BlockId, activeFile, sourceMap)
          if (result) {
            const { content, language: fileLanguage } = result
            const cacheData = { content, language: fileLanguage }
            sourceCodeCache.current[cacheKey] = JSON.stringify(cacheData)

            setResolvedCodeFiles((prev) => {
              if (!activeFile) return prev
              const fileIndex = prev.findIndex((file) => file.path === activeFile)
              const updated = [...prev]
              if (fileIndex >= 0) {
                updated[fileIndex] = {
                  ...updated[fileIndex],
                  content,
                  language: fileLanguage,
                }
                return updated
              }
              return [...prev, { path: activeFile, content, language: fileLanguage }]
            })
          }
        } catch (error) {
          console.error("Error loading source code:", error)
        } finally {
          setIsLoadingCode(false)
        }
      }

      fetchSourceCode()
    }
  }, [activeFile, BlockId, sourceMap])

  const getActiveFileContent = useCallback(() => {
    if (isLoadingCode) {
      return "// Loading code content..."
    }

    if (resolvedCodeFiles.length > 0 && activeFile) {
      const foundFile = resolvedCodeFiles.find((file) => file.path === activeFile)
      if (foundFile) {
        return foundFile.content
      }
    }
    return defaultCode
  }, [defaultCode, resolvedCodeFiles, activeFile, isLoadingCode])

  const getActiveFileLanguage = useCallback(() => {
    if (resolvedCodeFiles.length > 0 && activeFile) {
      const foundFile = resolvedCodeFiles.find((file) => file.path === activeFile)
      if (foundFile && foundFile.language) {
        return foundFile.language
      }
    }

    if (activeFile) {
      if (activeFile.endsWith(".ts")) return "typescript"
      if (activeFile.endsWith(".tsx")) return "tsx"
      if (activeFile.endsWith(".js")) return "javascript"
      if (activeFile.endsWith(".jsx")) return "jsx"
      if (activeFile.endsWith(".css")) return "css"
      if (activeFile.endsWith(".json")) return "json"
    }

    return language
  }, [resolvedCodeFiles, activeFile, language])

  const contentToCopy = useMemo(() => {
    if (isLoadingCode) {
      return "// Loading code content..."
    }

    if (resolvedCodeFiles.length > 0 && activeFile) {
      const foundFile = resolvedCodeFiles.find((file) => file.path === activeFile)
      if (foundFile) {
        return foundFile.content
      }
    }
    return defaultCode
  }, [defaultCode, resolvedCodeFiles, activeFile, isLoadingCode])

  // Set initial active file
  useEffect(() => {
    async function setInitialActiveFile() {
      if (!activeFile && resolvedFileTree && Array.isArray(resolvedFileTree) && !isLoadingFileTree) {
        const firstFile = findFirstFile(resolvedFileTree)
        if (firstFile) {
          setActiveFile(firstFile)
        }
      }
    }
    setInitialActiveFile()
  }, [resolvedFileTree, activeFile, isLoadingFileTree])

  // Screen width settings
  const screensWidth = {
    desktop: "100%",
    tablet: "768px",
    smartphone: "380px",
  }

  useEffect(() => {
    const updatePreviewWidth = () => {
      const windowWidth = window.innerWidth
      if (active === "desktop") {
        setPreviewWidth("100%")
      } else {
        const targetWidth = Number.parseInt(screensWidth[active as keyof typeof screensWidth])
        setPreviewWidth(windowWidth < targetWidth ? "100%" : screensWidth[active as keyof typeof screensWidth])
      }
    }

    updatePreviewWidth()
    window.addEventListener("resize", updatePreviewWidth)
    return () => window.removeEventListener("resize", updatePreviewWidth)
  }, [active])

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
      { threshold: 0.1 },
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
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        referrerPolicy="strict-origin-when-cross-origin"
      />
    )
  }, [isIframeVisible, iframeHeight, id, iframeSource])

  // Iframe placeholder
  const IframePlaceholder = useMemo(() => {
    if (isIframeVisible) return null

    return (
      <div id={id} className="min-h-[86.5vh] w-full flex items-center justify-center bg-background text-sm gap-2">
        <LoadingIcon size={14} />
        Loading block content...
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
            { threshold: 0.1 },
          )
          const element = document.getElementById(id)
          if (element) {
            observer.observe(element)
          }
        }
      }}
    >
      <BlockPreviewHeader
        BlockName={BlockName}
        setView={setView}
        setActive={setActive}
        iframeSource={iframeSource}
        contentToCopy={contentToCopy}
      />
      <div>
        <TabsContent
          value="preview"
          className={cn("border rounded-2xl transition-all duration-300 dark:border-gray-700", className, {
            "mr-auto": active !== "desktop",
          })}
          style={{
            width: previewWidth,
            maxWidth: "100%",
            overflowX: "auto",
          }}
        >
          {!isIframeVisible ? IframePlaceholder : IframeComponent}
        </TabsContent>
        <TabsContent value="code">
          <BlockCodeView
            fileTree={resolvedFileTree}
            activeFile={activeFile}
            setActiveFile={setActiveFile}
            isLoadingFileTree={isLoadingFileTree}
            isLoadingCode={isLoadingCode}
            getActiveFileContent={getActiveFileContent}
            getActiveFileLanguage={getActiveFileLanguage}
            codeFoldingEnabled={codeFoldingEnabled}
          />
        </TabsContent>
      </div>
    </Tabs>
  )
}
