"use client"

import { cn } from "@/lib/utils"
import { AlertTriangleIcon, CheckCircle2Icon, InfoIcon, X, XCircleIcon } from "lucide-react"
import React, { useState } from "react"
type NoteVariant = "info" | "warning" | "success" | "error"

interface NoteProps {
  variant?: NoteVariant
  className?: string
  closable?: boolean
  children: React.ReactNode
}

const variantConfig = {
  info: {
    bg: "bg-blue-50/80 dark:bg-blue-900/20",
    border: "border-l-4 border-blue-400",
    icon: "text-blue-500",
  },
  warning: {
    bg: "bg-yellow-50/80 dark:bg-yellow-900/20",
    border: "border-l-4 border-yellow-400",
    icon: "text-yellow-500",
  },
  success: {
    bg: "bg-green-50/80 dark:bg-green-900/20",
    border: "border-l-4 border-green-400",
    icon: "text-green-500",
  },
  error: {
    bg: "bg-red-50/80 dark:bg-red-900/20",
    border: "border-l-4 border-red-400",
    icon: "text-red-500",
  },
}

const Note = ({
  variant = "info",
  className,
  closable = false,
  children
}: NoteProps) => {
  const [isClosed, setIsClosed] = useState(false)

  if (isClosed) return null

  return (
    <div
      className={cn(
        "p-4 rounded-lg relative backdrop-blur-sm",
        variantConfig[variant].bg,
        variantConfig[variant].border,
        className
      )}
    >
      {closable && (
        <button
          onClick={() => setIsClosed(true)}
          className="absolute top-2 right-2 p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/10"
        >
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
      )}

      <div className="flex items-start gap-3">
        <div className={cn("mt-0.5 flex-shrink-0", variantConfig[variant].icon)}>
          {variant === "info" && <InfoIcon className="w-5 h-5" />}
          {variant === "warning" && <AlertTriangleIcon className="w-5 h-5" />}
          {variant === "success" && <CheckCircle2Icon className="w-5 h-5" />}
          {variant === "error" && <XCircleIcon className="w-5 h-5" />}
        </div>
        <div className="[&>:last-child]:mb-0 [&>:first-child]:mt-0 text-sm">
          {children}
        </div>
      </div>
    </div>
  )
}

export { Note }
