"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { AnimatePresence, motion } from "framer-motion"

import { cn } from "@/lib/utils"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center rounded-lg bg-transparent p-0.5 text-muted-foreground",
      "h-9",
      className
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsContainer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    defaultIndex?: number
    value?: string
    defaultValue?: string
    onValueChange?: (value: string) => void
  }
>(({ className, defaultIndex = 0, children, ...props }, ref) => {
  const [activeIndex, setActiveIndex] = React.useState(defaultIndex)
  const tabRefs = React.useRef<Map<number, HTMLButtonElement>>(new Map())
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [activeStyle, setActiveStyle] = React.useState({
    left: "0px",
    width: "0px",
  })

  const updateActiveStyle = React.useCallback(() => {
    const activeElement = tabRefs.current.get(activeIndex)
    if (activeElement && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect()
      const tabRect = activeElement.getBoundingClientRect()
      const left = tabRect.left - containerRect.left

      setActiveStyle({
        left: `${left}px`,
        width: `${tabRect.width}px`,
      })
    }
  }, [activeIndex])

  React.useEffect(() => {
    updateActiveStyle()

    const handleResize = () => {
      requestAnimationFrame(updateActiveStyle)
    }

    window.addEventListener("resize", handleResize)
    const resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(updateActiveStyle)
    })
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }

    tabRefs.current.forEach((tabElement) => {
      resizeObserver.observe(tabElement)
    })

    return () => {
      window.removeEventListener("resize", handleResize)
      resizeObserver.disconnect()
    }
  }, [activeIndex, updateActiveStyle])

  React.useEffect(() => {
    if (!containerRef.current) return

    const observer = new MutationObserver(() => {
      requestAnimationFrame(updateActiveStyle)
    })

    observer.observe(containerRef.current, {
      childList: true,
      subtree: true,
      attributes: true,
      characterData: true,
    })

    return () => observer.disconnect()
  }, [updateActiveStyle])

  return (
    <TabsPrimitive.List
      ref={(el) => {
        if (typeof ref === "function") ref(el)
        else if (ref) ref.current = el
        containerRef.current = el as HTMLDivElement
      }}
      className={cn(
        "relative bg-muted py-1 px-1 rounded-[7px] flex",
        className
      )}
      {...props}
    >
      <motion.div
        className="absolute rounded-[6px] bg-background shadow-sm border-none"
        style={{
          willChange: "left, width",
          transitionProperty: "left, width",
          height: "calc(100% - 8px)",
          top: "4px",
        }}
        animate={activeStyle}
        transition={{
          stiffness: 10000,
          mass: 1,
        }}
        layout
      />
      {React.Children.map(children, (child, index) =>
        React.isValidElement(child)
          ? React.cloneElement(child as React.ReactElement<any>, {
              onClick: (e: React.MouseEvent) => {
                setActiveIndex(index)
                if ((child as React.ReactElement<any>).props.onClick) {
                  ;(child as React.ReactElement<any>).props.onClick(e)
                }
              },
              ref: (el: HTMLButtonElement) => {
                if (el) tabRefs.current.set(index, el)
                const childRef = (child as any).ref
                if (childRef) {
                  if (typeof childRef === "function") {
                    childRef(el)
                  } else {
                    childRef.current = el
                  }
                }
              },
            })
          : child
      )}
    </TabsPrimitive.List>
  )
})
TabsContainer.displayName = "TabsContainer"

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-[7px] px-3.5 py-1.5",
      "text-sm font-medium transition-all",
      "relative z-10",
      "data-[state=active]:text-foreground data-[state=active]:font-semibold data-[state=inactive]:text-muted-foreground",
      "hover:text-foreground",
      "disabled:pointer-events-none disabled:opacity-50",
      "transition-all duration-200 ease-in-out",
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn("relative overflow-hidden mt-3", className)}
    {...props}
  >
    <AnimatePresence mode="wait">
      <motion.div
        key={props.value}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {props.children}
      </motion.div>
    </AnimatePresence>
  </TabsPrimitive.Content>
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsContainer, TabsContent, TabsList, TabsTrigger }
