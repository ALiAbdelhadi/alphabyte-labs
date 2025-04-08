import React from "react"

import { cn } from "@/lib/utils"

const MdxBadge = ({
  children,
  className,
}: {
  children: string
  className?: string
}) => {
  return (
    <span
      className={cn(
        "bg-gray-100 dark:bg-neutral-800 rounded-md px-1 py-0.5 font-medium text-gray-950 dark:text-gray-100",
        className
      )}
    >
      {children}
    </span>
  )
}

export default MdxBadge
