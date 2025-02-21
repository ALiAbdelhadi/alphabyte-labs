"use client"

import { cn } from "@/lib/utils"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { Loader2 } from "lucide-react"
import * as React from "react"

const buttonVariants = cva(
   "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
   {
      variants: {
         variant: {
            default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
            destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
            outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
            secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
            ghost: "hover:bg-accent hover:text-accent-foreground",
            link: "text-primary underline-offset-4 hover:underline",
            neural: "bg-secondary/20 text-secondary hover:bg-secondary/30 backdrop-blur-sm",
         },
         size: {
            default: "h-10 px-4 py-2",
            sm: "h-9 px-3 rounded-md text-xs",
            lg: "h-11 px-8 rounded-md",
            icon: "h-10 w-10",
         },
         animation: {
            none: "",
            pulse: "animate-pulse",
            bounce: "animate-bounce",
         },
      },
      defaultVariants: {
         variant: "default",
         size: "default",
         animation: "none",
      },
   }
)

export interface ButtonProps
   extends React.ButtonHTMLAttributes<HTMLButtonElement>,
   VariantProps<typeof buttonVariants> {
   isLoading?: boolean
   icon?: React.ReactNode
   asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
   ({ className, variant, size, animation, isLoading, icon, asChild = false, children, ...props }, ref) => {
      const Comp = asChild ? Slot : "button"
      return (
         <Comp
            className={cn(buttonVariants({ variant, size, animation, className }))}
            ref={ref}
            disabled={isLoading}
            {...props}
         >
            {isLoading ? (
               <span className="flex items-center justify-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {children}
               </span>
            ) : (
               <>
                  {icon && <span className="mr-2">{icon}</span>}
                  {children}
               </>
            )}
         </Comp>
      )
   }
)

Button.displayName = "Button"

export { Button, buttonVariants }

