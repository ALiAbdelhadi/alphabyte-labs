"use client"
import { cn } from "@/lib/utils"
import Prism from "prismjs"
import "prismjs/components/prism-javascript"
import "prismjs/components/prism-jsx"
import "prismjs/components/prism-tsx"
import "prismjs/components/prism-typescript"
import "prismjs/plugins/line-highlight/prism-line-highlight"
import "prismjs/plugins/line-highlight/prism-line-highlight.css"
import "prismjs/plugins/line-numbers/prism-line-numbers"
import "prismjs/plugins/line-numbers/prism-line-numbers.css"
import { ComponentProps, useEffect, useState } from "react"
interface PreProps extends ComponentProps<"pre"> {
    raw?: string
    className?: string
    highlightLines?: number[]
    folderPath?: string
    highlightStyle?: "solid" | "gradient" | "border" | "marker" | "custom"
    customHighlightClass?: string
    showLineNumbers?: boolean
    children: React.ReactNode
}
export function Pre({
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