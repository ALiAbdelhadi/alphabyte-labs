"use client"

import React, { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import {
  AlertTriangleIcon,
  CheckCircle2Icon,
  InfoIcon,
  X,
  XCircleIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"

type NoteVariant = "info" | "warning" | "success" | "error"

interface NoteProps {
  variant?: NoteVariant
  className?: string
  closable?: boolean
  title?: string
  children: React.ReactNode
  dismissible?: boolean
  onClose?: () => void
  actionLabel?: string
  onAction?: () => void
}
const variantConfig = {
  info: {
    bg: "bg-blue-50/90 dark:bg-blue-900/30",
    border: "border-blue-500",
    icon: "text-blue-500",
    shadowColor: "shadow-blue-500/10",
  },
  warning: {
    bg: "bg-amber-50/90 dark:bg-amber-900/30",
    border: "border-amber-500",
    icon: "text-amber-500",
    shadowColor: "shadow-amber-500/10",
  },
  success: {
    bg: "bg-green-50/90 dark:bg-green-900/30",
    border: "border-green-500",
    icon: "text-green-500",
    shadowColor: "shadow-green-500/10",
  },
  error: {
    bg: "bg-red-50/90 dark:bg-red-900/30",
    border: "border-red-500",
    icon: "text-red-500",
    shadowColor: "shadow-red-500/10",
  },
}

const Note = ({
  variant = "info",
  className,
  closable = false,
  title,
  children,
  dismissible = false,
  onClose,
  actionLabel,
  onAction,
}: NoteProps) => {
  const [isClosed, setIsClosed] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (dismissible) {
      timeoutRef.current = setTimeout(() => {
        handleClose()
      }, 5000)
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [dismissible])

  const handleClose = () => {
    setIsClosed(true)
    if (onClose) onClose()
  }

  const config = variantConfig[variant]

  return (
    <AnimatePresence>
      {!isClosed && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{
            opacity: 0,
            height: 0,
            marginTop: 0,
            marginBottom: 0,
            overflow: "hidden",
          }}
          transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1.0] }}
          className={cn(
            "p-4 rounded-lg relative backdrop-blur-sm",
            "border border-black/5 dark:border-white/5",
            config.bg,
            config.border,
            `shadow-sm ${config.shadowColor}`,
            className
          )}
        >
          {closable && (
            <button
              onClick={handleClose}
              className="absolute right-2 top-2 p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors duration-150"
              aria-label="Close"
            >
              <X className="w-4 h-4 text-black/40 dark:text-white/40" />
            </button>
          )}

          <div className="flex gap-3">
            <div className={cn("mt-0.5 flex-shrink-0", config.icon)}>
              {variant === "info" && (
                <InfoIcon className="w-5 h-5" strokeWidth={2} />
              )}
              {variant === "warning" && (
                <AlertTriangleIcon className="w-5 h-5" strokeWidth={2} />
              )}
              {variant === "success" && (
                <CheckCircle2Icon className="w-5 h-5" strokeWidth={2} />
              )}
              {variant === "error" && (
                <XCircleIcon className="w-5 h-5" strokeWidth={2} />
              )}
            </div>

            <div className="space-y-2 flex-1">
              {title && (
                <h4 className="font-medium text-sm leading-tight text-black dark:text-white">
                  {title}
                </h4>
              )}

              <div className="text-sm text-black/80 dark:text-white/80 leading-relaxed">
                {children}
              </div>

              {actionLabel && onAction && (
                <button
                  onClick={onAction}
                  className={cn(
                    "text-sm font-medium mt-1",
                    `text-${
                      variant === "info"
                        ? "blue"
                        : variant === "warning"
                          ? "amber"
                          : variant === "success"
                            ? "green"
                            : "red"
                    }-600 dark:text-${
                      variant === "info"
                        ? "blue"
                        : variant === "warning"
                          ? "amber"
                          : variant === "success"
                            ? "green"
                            : "red"
                    }-400`
                  )}
                >
                  {actionLabel}
                </button>
              )}
            </div>
          </div>

          {dismissible && (
            <div className="absolute bottom-0 left-0 h-1 bg-black/10 dark:bg-white/10 rounded-bl-lg overflow-hidden">
              <motion.div
                initial={{ width: "100%" }}
                animate={{ width: 0 }}
                transition={{ duration: 5, ease: "linear" }}
                className={cn(
                  "h-full",
                  variant === "info"
                    ? "bg-blue-500"
                    : variant === "warning"
                      ? "bg-amber-500"
                      : variant === "success"
                        ? "bg-green-500"
                        : "bg-red-500"
                )}
              />
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export { Note }
