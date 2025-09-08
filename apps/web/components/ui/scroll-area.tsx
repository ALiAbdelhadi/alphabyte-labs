"use client"

import { cn } from "@/lib/utils"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"
import { useLocale } from "next-intl"
import * as React from "react"

interface ScrollAreaProps extends React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> {
  /**
   * The viewport's height
   * @default "100%"
   */
  viewportHeight?: string | number
  /**
   * Whether to hide the scrollbar when not in use
   * @default true
   */
  autoHide?: boolean
  /**
   * The scrollbar's width
   * @default 10
   */
  scrollbarSize?: number
  /**
   * The scrollbar's color
   */
  scrollbarColor?: string
  /**
   * The scrollbar's border radius
   * @default "9999px"
   */
  scrollbarRadius?: string | number
}

const ScrollArea = React.forwardRef<React.ElementRef<typeof ScrollAreaPrimitive.Root>, ScrollAreaProps>(
  (
    {
      className,
      children,
      viewportHeight = "100%",
      autoHide = true,
      scrollbarSize = 10,
      scrollbarColor,
      scrollbarRadius = "9999px",
      ...props
    },
    ref,
  ) => (
    <ScrollAreaPrimitive.Root ref={ref} className={cn("relative overflow-hidden", className)} {...props}>
      <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit] pr-2 rtl:pr-0 rtl:pl-2" style={{ height: viewportHeight }}>
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar
        orientation="vertical"
        autoHide={autoHide}
        size={scrollbarSize}
        color={scrollbarColor}
        radius={scrollbarRadius}
      />
      <ScrollBar
        orientation="horizontal"
        autoHide={autoHide}
        size={scrollbarSize}
        color={scrollbarColor}
        radius={scrollbarRadius}
      />
      <ScrollAreaPrimitive.Corner className="bg-muted" />
    </ScrollAreaPrimitive.Root>
  ),
)
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName

interface ScrollBarProps extends React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar> {
  autoHide?: boolean
  size?: number
  color?: string
  radius?: string | number
}

const ScrollBar = React.forwardRef<React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>, ScrollBarProps>(
  ({ className, orientation = "vertical", autoHide = true, size = 10, color, radius = "9999px", ...props }, ref) => {
    const isVertical = orientation === "vertical"
    const thumbColor = color || "rgba(155, 155, 155, 0.5)"
    const locale = useLocale()
    const isRTL = locale == "ar"
    return (
      <ScrollAreaPrimitive.ScrollAreaScrollbar
        ref={ref}
        orientation={orientation}
        data-auto-hide={autoHide ? "true" : "false"}
        className={cn(
          "absolute flex touch-none select-none transition-all duration-150 ease-out right-0 rtl:left-0 rtl:right-auto",
          autoHide && "opacity-0 hover:opacity-100 data-[state=visible]:opacity-100",
          isVertical
            ? "h-full w-2.5 border-l border-l-transparent p-[1px] hover:w-3"
            : "w-full h-2.5 border-t border-t-transparent p-[1px] hover:h-3",
          className,
        )}
        dir={locale === "ar" ? "rtl" : "ltr"}
        {...props}
      >
        <ScrollAreaPrimitive.ScrollAreaThumb
          className={cn(
            "relative flex-1 transition-colors duration-150 ease-out rounded-full",
            "bg-border hover:bg-border/80",
          )}
          style={{
            backgroundColor: thumbColor,
            borderRadius: radius,
          }}
        />
      </ScrollAreaPrimitive.ScrollAreaScrollbar>
    )
  },
)
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName

export { ScrollArea, ScrollBar }