"use client"

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
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
import { cn } from "@/lib/utils"
import type { FileTree } from "@/registry/block"
import { languageIcons } from "@/settings/LanguageIcon"
import { motion } from "framer-motion"
import { ChevronDown, File, Folder, PanelLeft, PanelRight } from "lucide-react"
import { useTheme } from "next-themes"
import { type CSSProperties, memo, useCallback, useEffect, useRef, useState } from "react"
import { LoadingIcon } from "@/components/icons/loading-icon"

const MIN_SIDEBAR_WIDTH = 220
const MAX_SIDEBAR_WIDTH = 400
const DEFAULT_SIDEBAR_WIDTH = 280

interface TreeProps {
    item: FileTree
    level: number
    activeFile: string | null
    setActiveFile: (file: string) => void
}

interface BlockFileTreeProps {
    fileTree: FileTree[]
    activeFile: string | null
    setActiveFile: (file: string) => void
    isLoadingFileTree?: boolean
}

function cleanFileName(fileName: string): string {
    const patterns = [/\.ts\.ts$/, /\.tsx\.tsx$/, /\.js\.js$/, /\.jsx\.jsx$/, /\.json\.json$/, /\.css\.css$/]
    let cleanedName = fileName
    for (const pattern of patterns) {
        if (pattern.test(cleanedName)) {
            cleanedName = cleanedName.replace(pattern, pattern.toString().slice(1, 4))
        }
    }
    return cleanedName
}

function getFileExtension(filename: string): string {
    const parts = filename.split(".")
    return parts.length > 1 ? parts[parts.length - 1].toLowerCase() : ""
}

function getFileIcon(filename: string) {
    const ext = getFileExtension(filename)
    if (ext && languageIcons[ext]) {
        return languageIcons[ext]
    }
    return <File className="h-4 w-4" />
}

const Tree = memo(function Tree({ item, level, activeFile, setActiveFile }: TreeProps) {
    const displayName = cleanFileName(item.name)
    const indentStyle = { "--indent": `${level * 1.25}rem` } as CSSProperties
    const isFolder = Boolean(item.children)

    if (!isFolder) {
        return (
            <SidebarMenuItem>
                <SidebarMenuButton
                    isActive={item.path === activeFile}
                    onClick={() => item.path && setActiveFile(item.path)}
                    className={cn(
                        "whitespace-nowrap flex items-center gap-2 text-sm transition-colors duration-150",
                        "sidebar-text sidebar-item-hover",
                        "pl-[--indent]",
                        item.path === activeFile && "sidebar-item-active",
                    )}
                    style={indentStyle}
                >
                    <div className="w-4 ml-1" />
                    <span className="w-[14px] h-[14px]">{getFileIcon(displayName)}</span>
                    <span className="flex-1 truncate max-w-[180px]" title={displayName}>
                        {displayName}
                    </span>
                </SidebarMenuButton>
            </SidebarMenuItem>
        )
    }

    return (
        <SidebarMenuItem>
            <Collapsible className="group/collapsible w-full" defaultOpen>
                <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                        className={cn(
                            "whitespace-nowrap flex items-center gap-2 text-sm transition-colors duration-150",
                            "sidebar-text sidebar-item-hover",
                            "pl-[--indent]",
                        )}
                        style={indentStyle}
                    >
                        <ChevronDown
                            className={cn(
                                "h-3.5 w-3.5 transition-transform duration-200",
                                "group-data-[state=closed]/collapsible:-rotate-90",
                                "sidebar-text-muted",
                            )}
                        />
                        <Folder className="h-4 w-4" />
                        <span className="truncate max-w-[180px]" title={displayName}>
                            {displayName}
                        </span>
                    </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent className="transition-all duration-200">
                    <SidebarMenuSub className="m-0 w-full border-none p-0">
                        {item.children?.map((subItem, index) => (
                            <Tree
                                key={`${subItem.name}-${index}`}
                                item={subItem}
                                level={level + 1}
                                activeFile={activeFile}
                                setActiveFile={setActiveFile}
                            />
                        ))}
                    </SidebarMenuSub>
                </CollapsibleContent>
            </Collapsible>
        </SidebarMenuItem>
    )
})

const LoadingFileTree = () => (
    <div className="p-4 text-center">
        <LoadingIcon />
        <p className="text-sm sidebar-text-muted mt-3">Loading file tree...</p>
    </div>
)

const EmptyFileTree = () => (
    <div className="p-4 text-center">
        <p className="text-sm sidebar-text-muted">No files found</p>
    </div>
)

export function BlockFileTree({ fileTree, activeFile, setActiveFile, isLoadingFileTree = false }: BlockFileTreeProps) {
    const [sidebarIsOpen, setSidebarIsOpen] = useState(true)
    const [sidebarWidth, setSidebarWidth] = useState(DEFAULT_SIDEBAR_WIDTH)
    const [isDragging, setIsDragging] = useState(false)
    const sidebarRef = useRef<HTMLDivElement>(null)
    const resizeHandleRef = useRef<HTMLDivElement>(null)
    const openButtonRef = useRef<HTMLButtonElement>(null)
    const closeButtonRef = useRef<HTMLButtonElement>(null)
    const { theme } = useTheme()

    const toggleSidebar = useCallback(() => {
        setSidebarIsOpen((prev) => !prev)
    }, [])

    useEffect(() => {
        const resizeHandle = resizeHandleRef.current
        const sidebar = sidebarRef.current

        if (!resizeHandle || !sidebar) return

        const handleMouseDown = (e: MouseEvent) => {
            e.preventDefault()
            setIsDragging(true)

            const startX = e.clientX
            const startWidth = sidebar.offsetWidth

            const handleMouseMove = (e: MouseEvent) => {
                const newWidth = Math.max(MIN_SIDEBAR_WIDTH, Math.min(MAX_SIDEBAR_WIDTH, startWidth + e.clientX - startX))
                setSidebarWidth(newWidth)
            }

            const handleMouseUp = () => {
                setIsDragging(false)
                document.removeEventListener("mousemove", handleMouseMove)
                document.removeEventListener("mouseup", handleMouseUp)
            }

            document.addEventListener("mousemove", handleMouseMove)
            document.addEventListener("mouseup", handleMouseUp)
        }

        resizeHandle.addEventListener("mousedown", handleMouseDown)

        return () => {
            resizeHandle.removeEventListener("mousedown", handleMouseDown)
        }
    }, [])

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768 && sidebarIsOpen) {
                setSidebarIsOpen(false)
            }
        }

        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [sidebarIsOpen])

    return (
        <div className="flex overflow-hidden">
            {!sidebarIsOpen && (
                <button
                    ref={openButtonRef}
                    onClick={toggleSidebar}
                    aria-label="Open sidebar"
                    className={cn(
                        "relative z-20 p-2 flex items-center justify-center border-r",
                        "sidebar-open-button transition-colors duration-150",
                    )}
                >
                    <PanelRight strokeWidth={1.5} className="w-5 h-5" />
                </button>
            )}
            <motion.aside
                ref={sidebarRef}
                initial={false}
                animate={{
                    width: sidebarIsOpen ? sidebarWidth : 0,
                    opacity: sidebarIsOpen ? 1 : 0,
                }}
                transition={{
                    duration: 0.3,
                    ease: "easeInOut",
                }}
                className="h-full relative"
                style={{ width: sidebarIsOpen ? sidebarWidth : 0 }}
            >
                <SidebarProvider className="flex !h-full flex-col">
                    <Sidebar
                        collapsible="none"
                        className={cn("w-full flex-1 border-r sidebar-container transition-colors duration-150")}
                    >
                        <SidebarGroupLabel
                            className={cn(
                                "h-12 rounded-none border-b px-4 text-sm flex justify-between items-center",
                                "sidebar-header",
                            )}
                        >
                            <div className="flex space-x-2 items-center">
                                <div className="w-3 h-3 rounded-full bg-[#fc5f57] border border-red-500/40" />
                                <div className="w-3 h-3 rounded-full bg-[#fdbc2e] border border-yellow-500/40" />
                                <div className="w-3 h-3 rounded-full bg-[#28c83f] border border-green-500/40" />
                            </div>
                            <h3 className="text-sm font-medium sidebar-text">EXPLORER</h3>
                            {sidebarIsOpen && (
                                <button
                                    ref={closeButtonRef}
                                    onClick={toggleSidebar}
                                    aria-label="Close sidebar"
                                    className={cn(
                                        "p-1 rounded-md sidebar-text-muted sidebar-item-hover",
                                        "transition-colors duration-150",
                                    )}
                                >
                                    <PanelLeft strokeWidth={1.5} className="w-5 h-5" />
                                </button>
                            )}
                        </SidebarGroupLabel>
                        <div className="h-[calc(100%-3rem)] overflow-y-auto">
                            {isLoadingFileTree ? (
                                <LoadingFileTree />
                            ) : fileTree.length === 0 ? (
                                <EmptyFileTree />
                            ) : (
                                <SidebarGroup className="p-2">
                                    <SidebarGroupContent>
                                        <SidebarMenu className="gap-1">
                                            {fileTree.map((file, index) => (
                                                <Tree
                                                    key={`${file.name}-${index}`}
                                                    item={file}
                                                    level={1}
                                                    activeFile={activeFile}
                                                    setActiveFile={setActiveFile}
                                                />
                                            ))}
                                        </SidebarMenu>
                                    </SidebarGroupContent>
                                </SidebarGroup>
                            )}
                        </div>
                    </Sidebar>
                </SidebarProvider>
                <div
                    ref={resizeHandleRef}
                    className="absolute top-0 right-0 w-2 h-full cursor-col-resize group"
                    role="separator"
                    aria-label="Resize sidebar"
                    aria-valuemin={MIN_SIDEBAR_WIDTH}
                    aria-valuemax={MAX_SIDEBAR_WIDTH}
                    aria-valuenow={sidebarWidth}
                >
                    <div
                        className={cn(
                            "absolute top-0 right-0 w-1 h-full sidebar-resize-handle opacity-0 transition-opacity duration-150",
                            isDragging ? "opacity-50" : "group-hover:opacity-30",
                        )}
                    />
                </div>
            </motion.aside>
        </div>
    )
}
