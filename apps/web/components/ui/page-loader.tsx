"use client"

import LoadingIcon from "@/components/icons/loading-icon"
import { cn } from "@/lib/utils"

type PageLoaderProps = {
    className?: string
    fullscreen?: boolean
    label?: string
}

export default function PageLoader({ className, fullscreen = false, label }: PageLoaderProps) {
    return (
        <div
            className={cn(
                "flex items-center justify-center",
                fullscreen ? "min-h-[70vh]" : "py-6",
                className
            )}
        >
            <div className="flex items-center gap-2 animate-in fade-in zoom-in duration-300">
                <LoadingIcon size={16} />
                {label ? (
                    <span className="text-sm text-muted-foreground">{label}</span>
                ) : null}
            </div>
        </div>
    )
}


