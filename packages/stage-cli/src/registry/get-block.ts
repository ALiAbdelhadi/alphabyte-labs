import { RegistryItem } from "@/schema"
import fastGlob from "fast-glob"
import { promises as fs } from "fs"
import fsExtra from "fs-extra"
import path from "path"
import { extractDependencies } from "./extra-dependencies"
import { BLOCKS_PATH } from "./get-registry"

export async function getBlocks(): Promise<RegistryItem[]> {
    const blocks: RegistryItem[] = []

    try {
        // Read block directories from registry/view directory
        const blockDirs = await fastGlob("*", { cwd: BLOCKS_PATH, onlyDirectories: true, markDirectories: true, deep: 1 })

        for (const dir of blockDirs) {
            const blockPath = path.join(BLOCKS_PATH, dir)
            const normalizedDir = dir.replace(/[\\\/]+$/, "")
            const blockName = path.basename(normalizedDir)

            // Skip if it's not a directory or is empty
            if (blockName === "" || blockName === "." || blockName === "..") continue

            // Look for main component file (page.tsx)
            const mainFile = path.join(blockPath, "page.tsx")

            try {
                await fs.access(mainFile)
                const content = fsExtra.readFileSync(mainFile, "utf8")
                const dependencies = extractDependencies(content)

                // Get all files in the block directory
                const blockFiles = await fastGlob("**/*", { cwd: blockPath })
                const files: any[] = []

                for (const file of blockFiles) {
                    if (file.endsWith('.tsx') || file.endsWith('.ts')) {
                        const fileAbs = path.join(blockPath, file)
                        const fileContent = fsExtra.readFileSync(fileAbs, "utf8")
                        files.push({
                            type: "registry:component",
                            path: file,
                            content: fileContent,
                        })
                    }
                }

                const pageFile = {
                    type: "registry:page",
                    path: "page.tsx",
                    target: `app/${blockName}`,
                    content,
                }

                blocks.push({
                    name: blockName,
                    type: "blocks",
                    files: [pageFile, ...files],
                    dependencies,
                    description: `Alphabyte Labs ${blockName} block`,
                    tags: ["block", "layout"],
                })
            } catch {
                // Main file doesn't exist, skip this block
                continue
            }
        }
    } catch (error) {
        console.warn("Failed to load blocks:", error)
    }

    return blocks
}