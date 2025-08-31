"use client"

import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"
import { AlertTriangle, CheckCircle2, Info, X, XCircle } from "lucide-react"
import { JSX, useState } from "react"

type NoteVariant = "info" | "warning" | "success" | "error" | "neutral"

interface NoteProps {
  variant?: NoteVariant
  title?: string
  children: React.ReactNode
  closable?: boolean
  onClose?: () => void
  className?: string
}

const variantStyles: Record<
  NoteVariant,
  { border: string; text: string; icon: JSX.Element }
> = {
  info: {
    border: "border-blue-200 dark:border-blue-800",
    text: "text-blue-600 dark:text-blue-400",
    icon: <Info className="w-4 h-4" />,
  },
  warning: {
    border: "border-amber-200 dark:border-amber-800",
    text: "text-amber-600 dark:text-amber-400",
    icon: <AlertTriangle className="w-4 h-4" />,
  },
  success: {
    border: "border-green-200 dark:border-green-800",
    text: "text-green-600 dark:text-green-400",
    icon: <CheckCircle2 className="w-4 h-4" />,
  },
  error: {
    border: "border-red-600 dark:border-red-800",
    text: "text-red-600 dark:text-red-400",
    icon: <XCircle className="w-4 h-4" />,
  },
  neutral: {
    border: "border-gray-200 dark:border-gray-700",
    text: "text-gray-600 dark:text-gray-400",
    icon: <Info className="w-4 h-4" />,
  },
}

export function Note({
  variant = "neutral",
  title,
  children,
  closable,
  onClose,
  className,
}: NoteProps) {
  const [visible, setVisible] = useState(true)
  const style = variantStyles[variant]

  const handleClose = () => {
    setVisible(false)
    onClose?.()
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.2 }}
          className={cn(
            "relative flex items-start gap-2 rounded-xl border-2 p-3 bg-white/80 dark:bg-zinc-900/50 backdrop-blur-sm",
            style.border,
            className
          )}
        >
          <div className={cn("mt-0.5", style.text)}>{style.icon}</div>

          <div className="flex-1 space-y-1">
            {title && (
              <h4 className="text-sm font-medium text-black dark:text-white">
                {title}
              </h4>
            )}
            <div className="text-sm text-zinc-700 dark:text-zinc-300">
              {children}
            </div>
          </div>

          {closable && (
            <button
              onClick={handleClose}
              className="p-1 rounded-md text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
