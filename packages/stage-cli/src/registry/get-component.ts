import { RegistryItem } from "@/schema"
import fastGlob from "fast-glob"
import fsExtra from "fs-extra"
import path from "path"
import { extractDependencies } from "./extra-dependencies"
import { COMPONENTS_PATH } from "./get-registry"

export async function getComponents(): Promise<RegistryItem[]> {
    const components: RegistryItem[] = []

    try {
        // Read component files from registry/ui directory
        const componentFiles = await fastGlob("**/*.tsx", { cwd: COMPONENTS_PATH })

        for (const file of componentFiles) {
            const filePath = path.join(COMPONENTS_PATH, file)
            const content = fsExtra.readFileSync(filePath, "utf8")
            const name = path.basename(file, ".tsx")

            // Extract dependencies from imports
            const dependencies = extractDependencies(content)

            components.push({
                name,
                type: "components",
                files: [{
                    type: "registry:component",
                    path: file,
                    content,
                }],
                dependencies,
                description: `Alphabyte Labs ${name} component`,
                tags: ["ui", "component"],
            })
        }
    } catch (error) {
        console.warn("Failed to load components:", error)
    }

    return components
}