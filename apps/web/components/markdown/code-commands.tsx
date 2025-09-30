"use client"

import Pre from "@/components/pre"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useConfig } from "@/hooks/use-config"
import { cn } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"
import { CheckIcon, ClipboardIcon } from "lucide-react"
import * as React from "react"

interface CodeCommandsProps extends React.ComponentProps<"div"> {
    __npm__?: string
    __pnpm__?: string
    __yarn__?: string
    __bun__?: string
    __deno__?: string
}

export function CodeCommands({
    __npm__,
    __pnpm__,
    __yarn__,
    __bun__,
    __deno__,
    className,
    ...props
}: CodeCommandsProps) {
    const [config, setConfig] = useConfig()
    const [hasCopied, setHasCopied] = React.useState(false)

    React.useEffect(() => {
        if (hasCopied) {
            const timer = setTimeout(() => setHasCopied(false), 2000)
            return () => clearTimeout(timer)
        }
    }, [hasCopied])

    const packageManager = config.packageManager || "pnpm"

    const tabs = React.useMemo(() => {
        const availableTabs: Record<string, string> = {}
        if (__npm__) availableTabs.npm = __npm__
        if (__pnpm__) availableTabs.pnpm = __pnpm__
        if (__yarn__) availableTabs.yarn = __yarn__
        if (__bun__) availableTabs.bun = __bun__
        if (__deno__) availableTabs.deno = __deno__
        return availableTabs
    }, [__npm__, __pnpm__, __yarn__, __bun__, __deno__])

    const activeCommand = tabs[packageManager]

    const copyCommand = React.useCallback(async () => {
        if (!activeCommand) return
        try {
            await navigator.clipboard.writeText(activeCommand)
            setHasCopied(true)
        } catch (error) {
            console.error('Failed to copy command:', error)
        }
    }, [activeCommand])

    return (
        <TooltipProvider>
            <div
                className={cn(
                    "relative rounded-xl border border-gray-200/70 dark:border-gray-800/70 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl overflow-hidden",
                    className
                )}
                {...props}
            >
                <Tabs
                    value={packageManager}
                    className="w-full"
                    onValueChange={(value) => {
                        setConfig({
                            ...config,
                            packageManager: value as "pnpm" | "npm" | "yarn" | "bun" | "deno",
                        })
                    }}
                >
                    <div className="flex items-center justify-between px-4 h-9 bg-muted/50">
                        <div className="flex items-center gap-2">
                            <div className="flex space-x-1.5 rtl:space-x-reverse items-center" role="presentation" aria-label="Window controls">
                                <div className="w-3 h-3 rounded-full bg-[#fc5f57] border border-red-500/40" />
                                <div className="w-3 h-3 rounded-full bg-[#fdbc2e] border border-yellow-500/40" />
                                <div className="w-3 h-3 rounded-full bg-[#28c83f] border border-green-500/40" />
                            </div>
                            <TabsList className="bg-transparent">
                                {Object.entries(tabs).map(([key]) => (
                                    <TabsTrigger
                                        key={key}
                                        value={key}
                                        className="h-7 px-3 text-xs font-medium transition-all"
                                    >
                                        {key}
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                        </div>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-gray-600 hover:text-gray-900 hover:bg-gray-100/80 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800/80"
                                    onClick={copyCommand}
                                >
                                    {hasCopied ? (
                                        <CheckIcon className="w-4 h-4 text-green-600" />
                                    ) : (
                                        <ClipboardIcon className="w-4 h-4" />
                                    )}
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                {hasCopied ? "Copied" : "Copy command"}
                            </TooltipContent>
                        </Tooltip>
                    </div>
                    <div className="px-4 h-8">
                        {Object.entries(tabs).map(([key, value]) => (
                            <TabsContent key={key} value={key} className="m-0">
                                <Pre
                                    showHeader={false}
                                    enableSearch={false}
                                    showLineNumbers={false}
                                    showBorder={false}
                                    showShadow={false}
                                    className="!border-none !p-0 !m-0 language-bash !bg-transparent"
                                >
                                    {value}
                                </Pre>
                            </TabsContent>
                        ))}
                    </div>
                </Tabs>
            </div>
        </TooltipProvider>
    )
}

export function CliCodeTabs({
    children,
    className,
    ...props
}: React.ComponentProps<typeof Tabs>) {
    const [config, setConfig] = useConfig()

    const installationType = React.useMemo(() => {
        return config.installationType || "cli"
    }, [config])

    return (
        <Tabs
            value={installationType}
            onValueChange={(value) => {
                setConfig({ ...config, installationType: value as "cli" | "manual" })
            }}
            className={cn("relative w-full", className)}
            {...props}
        >
            <TabsList className="grid w-auto grid-cols-2 h-9 bg-gray-100/80 dark:bg-gray-800/80">
                <TabsTrigger
                    value="cli"
                    className="text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-950"
                >
                    CLI
                </TabsTrigger>
                <TabsTrigger
                    value="manual"
                    className="text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-950"
                >
                    Manual
                </TabsTrigger>
            </TabsList>
            {children}
        </Tabs>
    )
}