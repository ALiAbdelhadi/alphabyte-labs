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
                "flex min-h-[100dvh] flex-col items-center justify-center bg-background",
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


