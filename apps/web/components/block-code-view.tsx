"use client"

import { FileCode } from 'lucide-react'
import { Pre } from "./pre-for-block-preview"
import { languageIcons } from "@/settings/LanguageIcon"
import { BlockFileTree } from "./block-file-tree"
import type { FileTree } from "@/registry/block"

interface BlockCodeViewProps {
    fileTree: FileTree[]
    activeFile: string | null
    setActiveFile: (file: string) => void
    isLoadingFileTree: boolean
    isLoadingCode: boolean
    getActiveFileContent: () => string
    getActiveFileLanguage: () => string
    codeFoldingEnabled: boolean
}

export function BlockCodeView({
    fileTree,
    activeFile,
    setActiveFile,
    isLoadingFileTree,
    isLoadingCode,
    getActiveFileContent,
    getActiveFileLanguage,
    codeFoldingEnabled,
}: BlockCodeViewProps) {
    const getFileName = (path: string | null): string => {
        if (!path) return "Select a file from the menu"
        const parts = path.split("/")
        return parts[parts.length - 1]
    }

    const getLanguageIcon = () => {
        const language = getActiveFileLanguage()
        if (languageIcons[language]) {
            return languageIcons[language]
        }
        return <FileCode className="w-4 h-4 text-gray-400" />
    }

    return (
        <div className="flex overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1e1e1e] text-foreground h-[86.5vh]">
            {isLoadingFileTree ? (
                <div className="flex items-center justify-center w-[280px] text-gray-400 border-r border-gray-700">
                    <div className="animate-pulse flex flex-col items-center">
                        <div className="h-4 w-40 bg-gray-300 dark:bg-gray-700 rounded mb-2" />
                        <div className="h-2 w-24 bg-gray-200 dark:bg-gray-800 rounded" />
                    </div>
                </div>
            ) : (
                <BlockFileTree fileTree={fileTree} activeFile={activeFile} setActiveFile={setActiveFile} />
            )}
            <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex h-12 items-center gap-2 border-b border-gray-700 bg-[#1e1e1e] px-4 text-sm font-medium">
                    <div className="flex gap-2 items-center">
                        <div className="w-[14px] h-[14px]">{getLanguageIcon()}</div>
                        <span className="text-gray-100 truncate max-w-[300px]" title={getFileName(activeFile)}>
                            {getFileName(activeFile)}
                        </span>
                    </div>
                </div>
                <div className="relative flex-1 overflow-auto bg-[#1e1e1e]">
                    {activeFile ? (
                        isLoadingCode ? (
                            <div className="flex h-full items-center justify-center text-gray-400">
                                <div className="animate-pulse flex flex-col items-center">
                                    <div className="h-4 w-40 bg-gray-300 dark:bg-gray-700 rounded mb-2" />
                                    <div className="h-2 w-24 bg-gray-200 dark:bg-gray-800 rounded" />
                                </div>
                            </div>
                        ) : (
                            <Pre
                                raw={getActiveFileContent()}
                                className={`language-${getActiveFileLanguage()} hide-scrollbar`}
                            >
                                {getActiveFileContent()}
                            </Pre>
                        )
                    ) : (
                        <div className="flex h-full items-center justify-center text-muted-foreground">
                            Select a file from the menu to view content
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
