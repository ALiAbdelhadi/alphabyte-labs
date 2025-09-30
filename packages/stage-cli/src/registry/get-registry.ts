import { Registry } from "@/schema"
import path from "path"
import { getRegistryPath } from "."
import { getBlocks } from "./get-block"
import { getComponents } from "./get-component"

export let REGISTRY_PATH: string
export let COMPONENTS_PATH: string
export let BLOCKS_PATH: string

export async function getRegistry(): Promise<Registry> {
    // Initialize paths
    REGISTRY_PATH = await getRegistryPath()
    COMPONENTS_PATH = path.join(REGISTRY_PATH, "ui")
    BLOCKS_PATH = path.join(REGISTRY_PATH, "view")

    const components = await getComponents()
    const blocks = await getBlocks()

    return {
        name: "alphabyte-labs",
        homepage: "https://alphabyte-labs.vercel.app",
        version: "1.0.0",
        description: "Alphabyte Labs UI Components and Blocks",
        items: [...components, ...blocks],
    }
}
