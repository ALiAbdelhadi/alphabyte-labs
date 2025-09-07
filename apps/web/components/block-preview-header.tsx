"use client"

import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Fullscreen, Monitor, Smartphone, Tablet } from 'lucide-react'
import { Link } from "@/i18n/navigation"
import { CopyButton } from "./copy-button-for-block-preview"

interface BlockPreviewHeaderProps {
    BlockName: string
    setView: (view: "preview" | "code") => void
    setActive: (active: string) => void
    iframeSource: string
    contentToCopy: string
}

export function BlockPreviewHeader({
    BlockName,
    setView,
    setActive,
    iframeSource,
    contentToCopy,
}: BlockPreviewHeaderProps) {
    return (
        <nav className="flex flex-row justify-between md:gap-4 gap-2 items-center">
            <div className="flex items-center md:gap-4 gap-1 justify-start flex-row w-full">
                <div className="flex items-center md:gap-2 gap-1">
                    <h3 className="text-lg md:text-xl font-medium text-wrap text-foreground">{BlockName}</h3>
                    <span className="inline-flex items-center gap-1 bg-teal-200 px-2 py-1 text-xs font-medium text-teal-800 rounded-md select-none">
                        Free
                    </span>
                </div>
                <Separator orientation="vertical" className="shrink-0 bg-border w-[1.5px] h-5 md:block hidden" />
                <Tabs
                    defaultValue="preview"
                    className="inline-flex h-9 items-center text-muted-foreground max-w-fit justify-start"
                    onValueChange={(value) => setView(value as "preview" | "code")}
                >
                    <TabsList className="bg-muted rounded-[7px]">
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
                    </TabsList>
                </Tabs>
            </div>
            <div className="flex items-center md:flex-row flex-col gap-4">
                <Tabs
                    defaultValue="desktop"
                    className="items-center shadow-sm rounded-[7px] md:flex hidden"
                    onValueChange={(value) => setActive(value)}
                >
                    <TabsList className="py-1 px-2 rounded-[7px]">
                        <TabsTrigger
                            value="desktop"
                            className="p-1.5 rounded-[6px] transition relative z-10"
                        >
                            <Monitor className="w-4 h-4" />
                        </TabsTrigger>
                        <TabsTrigger
                            value="tablet"
                            className="p-1.5 rounded-[6px] transition relative z-10"
                        >
                            <Tablet className="w-4 h-4" />
                        </TabsTrigger>
                        <TabsTrigger
                            value="smartphone"
                            className="p-1.5 rounded-[6px] transition relative z-10"
                        >
                            <Smartphone className="w-4 h-4" />
                        </TabsTrigger>
                        <Separator orientation="vertical" className="shrink-0 bg-border dark:bg-gray-500 w-[1.5px] h-5 ml-2" />
                        <Link href={iframeSource} target="_blank" className="ml-[7px]">
                            <Fullscreen className="w-4 h-4" />
                        </Link>
                    </TabsList>
                </Tabs>
                <Separator orientation="vertical" className="shrink-0 bg-border w-[1.5px] h-5 md:block hidden" />
                <div className="flex items-center gap-2">
                    <CopyButton content={contentToCopy} />
                </div>
            </div>
        </nav>
    )
}
