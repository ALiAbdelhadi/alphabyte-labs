"use client"

import { cn } from "@/lib/utils"
import * as SeparatorPrimitive from "@radix-ui/react-separator"
import * as React from "react"

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> & {
    weight?: "ultralight" | "light" | "regular"
  }
>(
  (
    {
      className,
      orientation = "horizontal",
      decorative = true,
      weight = "regular",
      ...props
    },
    ref
  ) => {
    const weightOpacity = {
      ultralight: "opacity-[0.60]",
      light: "opacity-[0.85]",
      regular: "opacity-1",
    }
    return (
      <SeparatorPrimitive.Root
        ref={ref}
        decorative={decorative}
        orientation={orientation}
        className={cn(
          "shrink-0 bg-border transition-all",
          weightOpacity[weight],
          orientation === "horizontal" ? "h-[1.2px] w-full" : "h-full w-px",
          className
        )}
        {...props}
      />
    )
  }
)
Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }

