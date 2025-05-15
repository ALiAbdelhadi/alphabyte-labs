"use client"

import Link from "next/link"
import { Monitor, Tablet, Smartphone, Fullscreen, Minimize2, Maximize2 } from 'lucide-react'
import { Separator } from "@/components/ui/separator"
import { TabsList, TabsContainer, TabsTrigger } from "@/components/ui/tabs"
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
        <nav className="flex flex-row justify-between md:gap-4 gap-2 items-center mb-4">
            <div className="flex items-center md:gap-4 gap-1 justify-start flex-row w-full">
                <div className="flex items-center md:gap-2 gap-1">
                    <h3 className="text-lg md:text-xl font-medium text-wrap text-gray-900 dark:text-gray-100">{BlockName}</h3>
                    <span className="inline-flex items-center gap-1 bg-teal-200 px-2 py-1 text-xs font-medium text-teal-800 rounded-md select-none">
                        Free
                    </span>
                </div>
                <Separator orientation="vertical" className="shrink-0 bg-border w-[1.5px] h-5 md:block hidden" />
                <TabsList className="inline-flex h-9 items-center text-muted-foreground max-w-fit justify-start rounded-none bg-transparent">
                    <TabsContainer className="bg-muted rounded-[7px]">
                        <TabsTrigger
                            value="preview"
                            className="text-sm border-none rounded-[6px] sm:px-3 px-1"
                            onClick={() => setView("preview")}
                        >
                            preview
                        </TabsTrigger>
                        <TabsTrigger
                            value="code"
                            className="text-sm border-none rounded-[6px] sm:px-3 px-1"
                            onClick={() => setView("code")}
                        >
                            code
                        </TabsTrigger>
                    </TabsContainer>
                </TabsList>
            </div>
            <div className="flex items-center md:flex-row flex-col gap-4">
                <TabsContainer className="items-center shadow-sm py-1 px-2 rounded-[7px] md:flex hidden">
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
                    <Separator orientation="vertical" className="shrink-0 bg-border dark:bg-gray-500 w-[1.5px] h-5" />
                    <Link href={iframeSource} target="_blank" className="!ml-[7px]">
                        <Fullscreen className="w-4 h-4" />
                    </Link>
                </TabsContainer>
                <Separator orientation="vertical" className="shrink-0 bg-border w-[1.5px] h-5 md:block hidden" />
                <div className="flex items-center gap-2">
                    <CopyButton content={contentToCopy} />
                </div>
            </div>
        </nav>
    )
}
