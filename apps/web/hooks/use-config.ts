"use client"

import { useAtom } from "jotai"
import { atomWithStorage } from "jotai/utils"

type Config = {
    packageManager: "npm" | "yarn" | "pnpm" | "bun" | "deno"
    installationType: "cli" | "manual"
}

const configAtom = atomWithStorage<Config>("config", {
    packageManager: "pnpm",
    installationType: "cli",
})

export function useConfig() {
    return useAtom(configAtom)
}
