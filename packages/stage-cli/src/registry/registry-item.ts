import { RegistryItem } from "@/schema"
import { getRegistry } from "./get-registry"

export async function getRegistryItem(name: string, type: "components" | "blocks"): Promise<RegistryItem | null> {
    const registry = await getRegistry()
    return registry.items.find(item => item.name === name && item.type === type) || null
}
