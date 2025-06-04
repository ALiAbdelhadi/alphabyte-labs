import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

const AlertDialog = AlertDialogPrimitive.Root

const AlertDialogTrigger = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AlertDialogPrimitive.Trigger ref={ref} className={cn(className)} {...props}>
    {children}
  </AlertDialogPrimitive.Trigger>
))
AlertDialogTrigger.displayName = AlertDialogPrimitive.Trigger.displayName

const AlertDialogPortal = AlertDialogPrimitive.Portal

const AlertDialogOverlay = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-black/80 transition",
      "data-[state=open]:animate-in data-[state=closed]:animate-out",
      "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
    ref={ref}
  />
))
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName

const alertDialogContentVariants = cva(
  "fixed z-50 lg:w-full w-[92%] max-w-md rounded-2xl border-none shadow-2xl",
  {
    variants: {
      appearance: {
        default: "bg-white/95 dark:bg-neutral-900",
        destructive: "bg-red-50/95 dark:bg-red-950/90",
      },
    },
    defaultVariants: {
      appearance: "default",
    },
  }
)

export interface AlertDialogContentProps
  extends React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>,
    VariantProps<typeof alertDialogContentVariants> {
  closeOnClickOutside?: boolean
}

const AlertDialogContent = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Content>,
  AlertDialogContentProps
>(({ className, appearance, closeOnClickOutside = true, ...props }, ref) => (
  <AlertDialogPortal>
    <AlertDialogOverlay
      onClick={closeOnClickOutside ? undefined : (e) => e.stopPropagation()}
    />
    <AlertDialogPrimitive.Content
      ref={ref}
      className={cn(
        alertDialogContentVariants({ appearance }),
        "fixed left-[50%] top-[50%] z-50  translate-x-[-50%] translate-y-[-50%]",
        "p-6 text-center",
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
        className
      )}
      {...props}
    />
  </AlertDialogPortal>
))
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName

const AlertDialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("space-y-2 mb-4", className)} {...props} />
)
AlertDialogHeader.displayName = "AlertDialogHeader"

const AlertDialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-2 mt-4",
      className
    )}
    {...props}
  />
)
AlertDialogFooter.displayName = "AlertDialogFooter"

const AlertDialogTitle = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-xl font-semibold text-gray-900 dark:text-gray-100",
      "tracking-tight",
      className
    )}
    {...props}
  />
))
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName

const AlertDialogDescription = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Description
    ref={ref}
    className={cn(
      "text-base text-gray-600 dark:text-gray-400",
      "leading-relaxed",
      className
    )}
    {...props}
  />
))
AlertDialogDescription.displayName =
  AlertDialogPrimitive.Description.displayName

const AlertDialogAction = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action> & {
    variant?: VariantProps<typeof buttonVariants>["variant"]
    size?: VariantProps<typeof buttonVariants>["size"]
  }
>(({ className, variant = "default", size = "default", ...props }, ref) => (
  <AlertDialogPrimitive.Action
    ref={ref}
    className={cn(
      buttonVariants({ variant, size }),
      "rounded-full text-base font-semibold px-4 py-2",
      "transition-colors duration-200 ease-in-out",
      "focus:outline-none focus:ring-2 focus:ring-blue-500/50",
      className
    )}
    {...props}
  />
))
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName

const AlertDialogCancel = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel> & {
    variant?: VariantProps<typeof buttonVariants>["variant"]
    size?: VariantProps<typeof buttonVariants>["size"]
  }
>(({ className, variant = "ghost", size = "default", ...props }, ref) => (
  <AlertDialogPrimitive.Cancel
    ref={ref}
    className={cn(
      buttonVariants({ variant, size }),
      "rounded-full text-base font-semibold px-4 py-2",
      "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800",
      "transition-colors duration-200 ease-in-out",
      "border-border border",
      className
    )}
    {...props}
  />
))
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName

export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  alertDialogContentVariants,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger
}

