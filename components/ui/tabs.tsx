"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"

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

const TabsTrigger = React.forwardRef<
   React.ElementRef<typeof TabsPrimitive.Trigger>,
   React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
   <TabsPrimitive.Trigger
      ref={ref}
      className={cn(
         "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5",
         "text-sm font-medium transition-all",
         "data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
         "hover:bg-gray-100 dark:hover:bg-gray-950/10 ",
         "disabled:pointer-events-none disabled:opacity-50",
         "transition-all duration-200 ease-in-out",
         "data-[orientation=vertical]:justify-start data-[orientation=vertical]:w-full",
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
   <TabsPrimitive.Content ref={ref} className={cn("relative overflow-hidden", className)} {...props}>
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
