import { RegistryItem } from "@/schema"
import fastGlob from "fast-glob"
import fsExtra from "fs-extra"
import path from "path"
import { extractDependencies, extractInternalImports } from "./extra-dependencies"
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
            const internalImports = extractInternalImports(content)

            // Resolve internal imports to file paths within registry (if exist)
            const relatedFiles: { type: string; path: string; content: string }[] = []
            for (const imp of internalImports) {
                // Convert '@/components/icons/x' → 'icons/x.tsx' relative to COMPONENTS_PATH
                const rel = imp.replace(/^@\//, "").replace(/^components\//, "")
                const candidateTsx = path.join(COMPONENTS_PATH, `${rel}.tsx`)
                const candidateTs = path.join(COMPONENTS_PATH, `${rel}.ts`)
                if (fsExtra.existsSync(candidateTsx)) {
                    relatedFiles.push({ type: "registry:component", path: path.relative(COMPONENTS_PATH, candidateTsx), content: fsExtra.readFileSync(candidateTsx, "utf8") })
                } else if (fsExtra.existsSync(candidateTs)) {
                    relatedFiles.push({ type: "registry:component", path: path.relative(COMPONENTS_PATH, candidateTs), content: fsExtra.readFileSync(candidateTs, "utf8") })
                }
            }

            components.push({
                name,
                type: "components",
                files: [{
                    type: "registry:component",
                    path: file,
                    content,
                }, ...relatedFiles],
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