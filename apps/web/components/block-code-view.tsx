"use client"

import { FileCode } from "lucide-react"
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
        return <FileCode className="w-4 h-4 text-muted-foreground" />
    }

    return (
        <div
            className="flex overflow-hidden rounded-2xl border border-border bg-background text-foreground h-[86.5vh]"
            style={{
                backgroundColor: "var(--code-background)",
                borderColor: "var(--code-border-color)",
                color: "var(--code-text-color)",
            }}
        >
            {isLoadingFileTree ? (
                <div
                    className="flex items-center justify-center w-[280px] border-r"
                    style={{ borderColor: "var(--code-border-color)" }}
                >
                    <div className="animate-pulse flex flex-col items-center">
                        <div className="h-4 w-40 rounded mb-2" style={{ backgroundColor: "var(--code-border-color)" }} />
                        <div className="h-2 w-24 rounded" style={{ backgroundColor: "var(--code-border-color)", opacity: 0.5 }} />
                    </div>
                </div>
            ) : (
                <BlockFileTree fileTree={fileTree} activeFile={activeFile} setActiveFile={setActiveFile} />
            )}
            <div className="flex min-w-0 flex-1 flex-col">
                <div
                    className="code-block-header flex h-12 items-center gap-2 border-b px-4 text-sm font-medium !bg-[#f6f8fa] dark:!bg-[#252526] text-muted-foreground !rounded-none"
                >
                    <div className="flex gap-2 items-center">
                        <div className="w-[14px] h-[14px]">{getLanguageIcon()}</div>
                        <span
                            className="truncate max-w-[300px]"
                            title={getFileName(activeFile)}
                            style={{ color: "var(--code-text-color)" }}
                        >
                            {getFileName(activeFile)}
                        </span>
                    </div>
                </div>
                <div
                    className="block-code-view relative flex-1 overflow-auto"
                    style={{ backgroundColor: "var(--code-background)" }}
                >
                    {activeFile ? (
                        isLoadingCode ? (
                            <div
                                className="flex h-full items-center justify-center"
                                style={{ color: "var(--code-folder-path-color)" }}
                            >
                                <div className="animate-pulse flex flex-col items-center">
                                    <div className="h-4 w-40 rounded mb-2" style={{ backgroundColor: "var(--code-border-color)" }} />
                                    <div
                                        className="h-2 w-24 rounded"
                                        style={{ backgroundColor: "var(--code-border-color)", opacity: 0.5 }}
                                    />
                                </div>
                            </div>
                        ) : (
                            <Pre
                                raw={getActiveFileContent()}
                                className={`language-${getActiveFileLanguage()}`}
                                showLineNumbers={true}
                            >
                                {getActiveFileContent()}
                            </Pre>
                        )
                    ) : (
                        <div className="flex h-full items-center justify-center" style={{ color: "var(--code-folder-path-color)" }}>
                            Select a file from the menu to view content
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
