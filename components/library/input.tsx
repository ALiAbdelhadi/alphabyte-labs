import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const inputVariants = cva(
   "flex w-full rounded-md border border-input bg-transparent text-foreground shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
   {
      variants: {
         size: {
            default: "h-9 px-3 py-1 text-base md:text-sm",
            sm: "h-8 px-2 py-1 text-sm",
            lg: "h-10 px-4 py-2 text-lg",
         },
         error: {
            true: "border-destructive focus-visible:ring-destructive",
         },
      },
      defaultVariants: {
         size: "default",
      },
   }
)

export interface InputProps
   extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
   VariantProps<typeof inputVariants> {
   error?: boolean
   errorMessage?: string
   description?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
   ({ 
      className, 
      type, 
      size, 
      error, 
      errorMessage, 
      description, 
      ...props 
   }, ref) => {
      return (
         <div className="w-full space-y-1.5">
            <div className="relative flex items-center">
               <input
                  type={type}
                  className={cn(
                     inputVariants({ size, error }),
                     className
                  )}
                  ref={ref}
                  aria-invalid={error ? "true" : undefined}
                  aria-describedby={
                     props.id ? `${props.id}-description` : undefined
                  }
                  {...props}
               />
            </div>
            {description && !error && props.id && (
               <p 
                  id={`${props.id}-description`}
                  className="text-xs text-muted-foreground"
               >
                  {description}
               </p>
            )}
            {error && errorMessage && (
               <p className="text-xs text-destructive">{errorMessage}</p>
            )}
         </div>
      )
   }
)
Input.displayName = "Input"

export { Input, inputVariants }
