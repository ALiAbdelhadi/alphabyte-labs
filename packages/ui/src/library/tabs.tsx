"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { AnimatePresence, motion } from "framer-motion"

import { cn } from "@/lib/utils"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => {
  const [activeIndex, setActiveIndex] = React.useState(0)
  const tabRefs = React.useRef<(HTMLButtonElement | null)[]>([])
  const [activeStyle, setActiveStyle] = React.useState({
    left: "0px",
    width: "0px",
  })

  React.useEffect(() => {
    const activeElement = tabRefs.current[activeIndex]
    if (activeElement) {
      const { offsetLeft, offsetWidth } = activeElement
      setActiveStyle({
        left: `${offsetLeft}px`,
        width: `${offsetWidth}px`,
      })
    }
  }, [activeIndex])

  return (
    <TabsPrimitive.List
      ref={ref}
      className={cn(
        "relative flex items-center space-x-2 overflow-hidden border-b border-muted",
        className
      )}
      {...props}
    >
      <motion.div
        className="absolute bottom-0 h-[2px] bg-primary"
        animate={activeStyle}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
      {React.Children.map(props.children, (child, index) =>
        React.isValidElement(child)
          ? React.cloneElement(child, {
              ref: (el: HTMLButtonElement) => (tabRefs.current[index] = el),
              onClick: () => setActiveIndex(index),
              isActive: index === activeIndex,
            })
          : child
      )}
    </TabsPrimitive.List>
  )
})
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> & {
    isActive?: boolean
  }
>(({ className, isActive, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "relative px-4 py-2 text-sm font-medium whitespace-nowrap transition-all",
      isActive ? "text-foreground font-semibold" : "text-muted-foreground ",
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
    className={cn("mt-2 relative overflow-hidden", className)}
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

export { Tabs, TabsList, TabsTrigger, TabsContent }
