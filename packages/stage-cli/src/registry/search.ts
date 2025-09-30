import { RegistryItem } from "@/schema"
import { getRegistry } from "./get-registry"
import fuzzysort from "fuzzysort"

export async function searchRegistry(query: string): Promise<RegistryItem[]> {
    const registry = await getRegistry()
    if (!query || query.trim() === "") return registry.items

    // Prepare list of candidates with composite keys (name + tags + description)
    const keys = ["name", "tags", "description"] as const
    const results = fuzzysort.go(query, registry.items as any, {
        keys,
        threshold: -10000,
        limit: 100,
    }) as any

    // For multi-key search, results may be an array of objects with .obj
    if (Array.isArray(results) && results.length && (results[0] as any).obj) {
        return (results as any).map((r: any) => r.obj as RegistryItem)
    }
    return results as unknown as RegistryItem[]
}

