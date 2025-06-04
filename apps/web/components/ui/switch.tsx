"use client";

import { Label } from "@/components/ui/label";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import * as React from "react";

interface SwitchProps extends React.ComponentProps<typeof SwitchPrimitive.Root> {
    size?: "sm" | "md" | "lg";
    label?: string;
    tooltip?: string;
}

const sizeConfig = {
    sm: {
        track: "h-6 w-10 p-1",
        thumb: "h-4 w-4",
        translate: "data-[state=checked]:translate-x-[1rem]",
        text: "text-sm",
    },
    md: {
        track: "h-7 w-12 p-1",
        thumb: "h-5 w-5",
        translate: "data-[state=checked]:translate-x-[1.25rem]",
        text: "text-base",
    },
    lg: {
        track: "h-8 w-14 p-1",
        thumb: "h-6 w-6",
        translate: "data-[state=checked]:translate-x-[1.5rem]",
        text: "text-lg",
    },
};

export const Switch: React.FC<SwitchProps> = ({
    size = "md",
    label,
    tooltip,
    className,
    ...props
}) => {
    const id = React.useId();
    const [showTooltip, setShowTooltip] = React.useState(false);
    const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

    const config = sizeConfig[size];

    const handleMouseEnter = () => {
        if (!tooltip) return;
        timeoutRef.current = setTimeout(() => setShowTooltip(true), 2000);
    };
    const handleMouseLeave = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setShowTooltip(false);
    };

    React.useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    return (
        <div className={cn("inline-flex items-center gap-2", className)}>
            <TooltipProvider>
                {tooltip ? (
                    <Tooltip open={showTooltip} onOpenChange={setShowTooltip}>
                        <TooltipTrigger asChild>
                            <SwitchPrimitive.Root
                                id={id}
                                className={cn(
                                    "relative inline-flex items-center rounded-full transition-all duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                                    config.track,
                                    props.disabled
                                        ? "bg-gray-200 dark:bg-gray-700 cursor-not-allowed opacity-60"
                                        : "bg-gray-300 dark:bg-gray-600 cursor-pointer",
                                    "data-[state=checked]:bg-black dark:data-[state=checked]:bg-white"
                                )}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                {...props}
                            >
                                <SwitchPrimitive.Thumb
                                    className={cn(
                                        "block rounded-full bg-white dark:bg-black shadow-lg transition-transform duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]",
                                        config.thumb,
                                        config.translate,
                                        props.disabled ? "" : "hover:scale-105"
                                    )}
                                />
                            </SwitchPrimitive.Root>
                        </TooltipTrigger>
                        <TooltipContent
                            side="top"
                            align="center"
                            className="bg-gray-900 text-white text-xs py-1 px-2 rounded-md shadow-lg"
                        >
                            {tooltip}
                        </TooltipContent>
                    </Tooltip>
                ) : (
                    <SwitchPrimitive.Root
                        id={id}
                        className={cn(
                            "relative inline-flex items-center rounded-full transition-all duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                            config.track,
                            props.disabled
                                ? "bg-gray-200 dark:bg-gray-700 cursor-not-allowed opacity-60"
                                : "bg-gray-300 dark:bg-gray-600 cursor-pointer",
                            "data-[state=checked]:bg-black dark:data-[state=checked]:bg-white"
                        )}
                        {...props}
                    >
                        <SwitchPrimitive.Thumb
                            className={cn(
                                "block rounded-full bg-white dark:bg-black shadow-lg transition-transform duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]",
                                config.thumb,
                                config.translate,
                                props.disabled ? "" : "hover:scale-105"
                            )}
                        />
                    </SwitchPrimitive.Root>
                )}
            </TooltipProvider>
            {label && (
                <Label
                    htmlFor={id}
                    className={cn(
                        config.text,
                        props.disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
                    )}
                    onClick={() => {
                        if (!props.disabled) {
                            props.onCheckedChange?.(!props.checked);
                        }
                    }}
                >
                    {label}
                </Label>
            )}
        </div>
    );
};