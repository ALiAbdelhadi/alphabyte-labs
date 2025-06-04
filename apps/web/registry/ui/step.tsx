import { cn } from "@/lib/utils"
import { StepItemProps, StepProps } from "@/types/components"
import clsx from "clsx"
import { Children, PropsWithChildren } from "react"

export function Step({ children }: PropsWithChildren<StepProps>) {
    const length = Children.count(children)
    return (
        <div className="flex flex-col my-5 w-full">
            {Children.map(children, (child, index) => (
                <div
                    className={cn(
                        "relative border-l md:pl-9 pl-7",
                        clsx({ "pb-5": index < length - 1 })
                    )}
                >
                    <div className="absolute -left-4 flex items-center justify-center w-8 h-8 rounded-full bg-muted text-sm font-code font-medium -indent-[1px]">
                        {index + 1}
                    </div>
                    {child}
                </div>
            ))}
        </div>
    )
}

export function StepItem({ children, title }: StepItemProps) {
    return (
        <div className="space-y-4">
            {title && (
                <h3 className="!mt-0 text-lg md:text-xl text-gray-950 dark:text-gray-50">
                    {title}
                </h3>
            )}
            <div className="text-base text-muted-foreground space-y-3">
                {children}
            </div>
        </div>
    )
}
