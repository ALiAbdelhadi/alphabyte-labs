"use client"

import { Tabs } from "@/components/ui/custom-tabs"
import { useConfig } from "@/hooks/use-config"
import * as React from "react"


export function CliCodeTabs({ children }: React.ComponentProps<typeof Tabs>) {
    const [config, setConfig] = useConfig()

    const installationType = React.useMemo(() => {
        return config.installationType || "cli"
    }, [config])

    return (
        <Tabs value={installationType}
            onValueChange={(value) => {
                setConfig({ ...config, installationType: value as "cli" | "manual" })
            }}
            className="relative mt-4 w-full"
        >
            {children}
        </Tabs>
    )
}