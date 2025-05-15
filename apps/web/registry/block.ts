export interface FileTree {
    name: string
    path?: string
    language?: string
    children?: FileTree[]
}

import { blockExamples } from "./blocks-examples"

function getExtensionFromLanguage(language: string): string {
    const languageExtensionMap: Record<string, string> = {
        typescript: ".ts",
        tsx: ".tsx",
        javascript: ".js",
        jsx: ".jsx",
        css: ".css",
        scss: ".scss",
        less: ".less",
        json: ".json",
        html: ".html",
        markdown: ".md",
        mdx: ".mdx",
    }

    return language in languageExtensionMap ? languageExtensionMap[language] : ".ts"
}

async function getBlockSourceMap() {
    try {
        const module = await import("./blocks-view-source-map.json")
        return module.default as Record<string, any>
    } catch (error) {
        console.error("Error loading blocks source map:", error)
        return null
    }
}

/**
 * Determines the language based on file extension
 * @param {string} filePath - The file path
 * @returns {string} The language for syntax highlighting
 */
function getLanguageFromExtension(filePath: string): string {
    const extension = filePath.split(".").pop()?.toLowerCase()

    const extensionMap: Record<string, string> = {
        ts: "typescript",
        tsx: "tsx",
        js: "javascript",
        jsx: "jsx",
        css: "css",
        scss: "scss",
        less: "less",
        json: "json",
        html: "html",
        md: "markdown",
        mdx: "mdx",
    }

    return extension && extension in extensionMap ? extensionMap[extension] : "typescript" // Default to typescript
}

// Helper function to check if a filename already has an extension
function hasExtension(filename: string): boolean {
    const extensions = [".ts", ".tsx", ".js", ".jsx", ".css", ".scss", ".less", ".json", ".html", ".md", ".mdx"]
    return extensions.some((ext) => filename.toLowerCase().endsWith(ext))
}

// Helper function to extract filename without duplicating extension
function extractFileName(path: string): string {
    const pathParts = path.split("/")
    return pathParts[pathParts.length - 1] || ""
}

export async function generateFileTreeFromBlockId(blockId: string) {
    const block = blockExamples.items.find((item) => item.name === blockId)
    if (!block) return []

    // Get the source map to extract language information
    const sourceMap = await getBlockSourceMap()
    const blockData = sourceMap?.[blockId] || {}

    const fileTree: FileTree[] = [
        {
            name: blockId,
            children: [
                {
                    name: "page.tsx",
                    path: block.target,
                    language: "tsx",
                },
                {
                    name: "components",
                    children: await Promise.all(
                        block.components.map(async (comp) => {
                            const fileName = extractFileName(comp)
                            // Get language from source map if available
                            const language = await getFileLanguage(blockId, comp)

                            // Only add extension if the filename doesn't already have one
                            let finalName = fileName
                            if (!hasExtension(fileName)) {
                                finalName = `${fileName}${getExtensionFromLanguage(language)}`
                            }

                            return {
                                name: finalName,
                                path: comp,
                                language,
                            }
                        }),
                    ),
                },
            ],
        },
    ]

    if (block.constant && block.constant.length > 0) {
        fileTree[0].children?.push({
            name: "constant",
            children: await Promise.all(
                block.constant.map(async (constant) => {
                    const fileName = extractFileName(constant)
                    // Get language from source map if available
                    const language = await getFileLanguage(blockId, constant)

                    // Only add extension if the filename doesn't already have one
                    let finalName = fileName || "index"
                    if (!hasExtension(finalName)) {
                        finalName = `${finalName}${getExtensionFromLanguage(language)}`
                    }

                    return {
                        name: finalName,
                        path: constant,
                        language,
                    }
                }),
            ),
        })
    }

    if (block.lib && block.lib.length > 0) {
        fileTree[0].children?.push({
            name: "lib",
            children: await Promise.all(
                block.lib.map(async (lib) => {
                    const fileName = extractFileName(lib)
                    // Get language from source map if available
                    const language = await getFileLanguage(blockId, lib)

                    // Only add extension if the filename doesn't already have one
                    let finalName = fileName || "utils"
                    if (!hasExtension(finalName)) {
                        finalName = `${finalName}${getExtensionFromLanguage(language)}`
                    }

                    return {
                        name: finalName,
                        path: lib,
                        language,
                    }
                }),
            ),
        })
    }

    if (block.context && block.context.length > 0) {
        fileTree[0].children?.push({
            name: "context",
            children: await Promise.all(
                block.context.map(async (context) => {
                    const fileName = extractFileName(context)
                    // Get language from source map if available
                    const language = await getFileLanguage(blockId, context)

                    // Only add extension if the filename doesn't already have one
                    let finalName = fileName || "index"
                    if (!hasExtension(finalName)) {
                        finalName = `${finalName}${getExtensionFromLanguage(language)}`
                    }

                    return {
                        name: finalName,
                        path: context,
                        language,
                    }
                }),
            ),
        })
    }

    if (block.hooks && block.hooks.length > 0) {
        fileTree[0].children?.push({
            name: "hooks",
            children: await Promise.all(
                block.hooks.map(async (hook) => {
                    const fileName = extractFileName(hook)
                    // Get language from source map if available
                    const language = await getFileLanguage(blockId, hook)

                    // Only add extension if the filename doesn't already have one
                    let finalName = fileName || "index"
                    if (!hasExtension(finalName)) {
                        finalName = `${finalName}${getExtensionFromLanguage(language)}`
                    }

                    return {
                        name: finalName,
                        path: hook,
                        language,
                    }
                }),
            ),
        })
    }

    return fileTree
}

export function normalizePath(path: string, type: "lib" | "constant"): string {
    let normalizedPath = path

    if (type === "lib") {
        // Remove extension if present
        if (
            normalizedPath.endsWith(".ts") ||
            normalizedPath.endsWith(".tsx") ||
            normalizedPath.endsWith(".js") ||
            normalizedPath.endsWith(".jsx")
        ) {
            normalizedPath = normalizedPath.replace(/\.(ts|tsx|js|jsx)$/, "")
        }

        // Handle utils path
        if (normalizedPath.endsWith("/utils")) {
            // Path already has /utils, keep it as is
        } else if (!normalizedPath.includes("/utils")) {
            // Add /utils if not present
            normalizedPath = `${normalizedPath}/utils`
        }
    } else if (type === "constant") {
        // Remove extension if present
        if (
            normalizedPath.endsWith(".ts") ||
            normalizedPath.endsWith(".tsx") ||
            normalizedPath.endsWith(".js") ||
            normalizedPath.endsWith(".jsx") ||
            normalizedPath.endsWith(".json")
        ) {
            normalizedPath = normalizedPath.replace(/\.(ts|tsx|js|jsx|json)$/, "")
        }

        // Handle index path - but don't add /index for JSON files
        const isJsonFile = path.toLowerCase().endsWith(".json")

        if (normalizedPath.endsWith("/index")) {
            // Path already has /index, keep it as is
        } else if (!normalizedPath.includes("/index") && !isJsonFile) {
            // Add /index if not present and not a JSON file
            normalizedPath = `${normalizedPath}/index`
        }
    }

    return normalizedPath
}

/**
 * Gets the language for a specific file in a block using the source map
 * @param blockId The ID of the block
 * @param filePath The path of the file
 * @returns The language of the file
 */
export async function getFileLanguage(blockId: string, filePath: string): Promise<string> {
    const sourceMap = await getBlockSourceMap()
    if (!sourceMap || !sourceMap[blockId]) {
        return getLanguageFromExtension(filePath)
    }

    const blockData = sourceMap[blockId]

    // Check in components
    if (filePath.includes("/components/") && blockData.components && blockData.components[filePath]) {
        return blockData.components[filePath].language || "tsx"
    }

    // Check in constant
    if (filePath.includes("/constant/") && blockData.constant && blockData.constant[filePath]) {
        return blockData.constant[filePath].language || "typescript"
    }

    // Check in lib
    if (filePath.includes("/lib/") && blockData.lib && blockData.lib[filePath]) {
        return blockData.lib[filePath].language || "typescript"
    }

    // Check in context
    if (filePath.includes("/context/") && blockData.context && blockData.context[filePath]) {
        return blockData.context[filePath].language || "tsx"
    }

    // Check in hooks
    if (filePath.includes("/hooks/") && blockData.hooks && blockData.hooks[filePath]) {
        return blockData.hooks[filePath].language || "tsx"
    }

    // Check if it's the main page file
    if (blockData[filePath]) {
        if (typeof blockData[filePath] === "object" && blockData[filePath].language) {
            return blockData[filePath].language
        }
        return "tsx" // Default for page files
    }

    // Fallback to extension-based detection
    return getLanguageFromExtension(filePath)
}

// New functions for block-preview logic

export interface CodeFile {
    path: string
    content: string
    language?: string
}

/**
 * Loads source code for a specific file in a block
 * @param blockId The ID of the block
 * @param filePath The path of the file
 * @param sourceMap The source map containing code content
 * @returns The content and language of the file
 */
export async function loadSourceCode(
    blockId: string,
    filePath: string,
    sourceMap: Record<string, any> | null,
): Promise<{ content: string; language: string } | null> {
    if (!sourceMap) {
        console.warn("Source map is not loaded yet")
        return null
    }

    const blockData = sourceMap[blockId]
    if (!blockData) {
        console.warn(`Block data not found for ${blockId}`)
        return null
    }

    let content = ""
    let fileLanguage = await getFileLanguage(blockId, filePath)

    // Extract content based on file path
    if (filePath.includes("/components/")) {
        if (typeof blockData.components?.[filePath] === "object") {
            content = blockData.components[filePath].content || "// Component code not found"
            fileLanguage = blockData.components[filePath].language || fileLanguage
        } else {
            content = blockData.components?.[filePath] || "// Component code not found"
        }
    } else if (filePath.includes("/constant/")) {
        if (blockData.constant) {
            // Check if it's a JSON file
            const isJsonFile = filePath.toLowerCase().endsWith(".json")

            // Try with original path first for JSON files
            if (isJsonFile) {
                if (typeof blockData.constant[filePath] === "object") {
                    content = blockData.constant[filePath].content || "// Constant code not found"
                    fileLanguage = blockData.constant[filePath].language || "json"
                } else if (blockData.constant[filePath]) {
                    content = blockData.constant[filePath]
                    fileLanguage = "json"
                } else {
                    // Try with path without extension
                    const pathWithoutExt = filePath.replace(/\.json$/, "")
                    if (typeof blockData.constant[pathWithoutExt] === "object") {
                        content = blockData.constant[pathWithoutExt].content || "// Constant code not found"
                        fileLanguage = "json"
                    } else if (blockData.constant[pathWithoutExt]) {
                        content = blockData.constant[pathWithoutExt]
                        fileLanguage = "json"
                    }
                }
            } else {
                // For non-JSON files, use the normal normalization
                const normalizedFilePath = normalizePath(filePath, "constant")

                if (typeof blockData.constant[normalizedFilePath] === "object") {
                    content = blockData.constant[normalizedFilePath].content || "// Constant code not found"
                    fileLanguage = blockData.constant[normalizedFilePath].language || fileLanguage
                } else if (blockData.constant[normalizedFilePath]) {
                    content = blockData.constant[normalizedFilePath]
                } else {
                    // Try with original path if normalized path fails
                    if (typeof blockData.constant[filePath] === "object") {
                        content = blockData.constant[filePath].content || "// Constant code not found"
                        fileLanguage = blockData.constant[filePath].language || fileLanguage
                    } else if (blockData.constant[filePath]) {
                        content = blockData.constant[filePath]
                    } else {
                        // Try without /index suffix
                        const basePathWithoutIndex = normalizedFilePath.replace("/index", "")
                        if (typeof blockData.constant[basePathWithoutIndex] === "object") {
                            content = blockData.constant[basePathWithoutIndex].content || "// Constant code not found"
                            fileLanguage = blockData.constant[basePathWithoutIndex].language || fileLanguage
                        } else if (blockData.constant[basePathWithoutIndex]) {
                            content = blockData.constant[basePathWithoutIndex]
                        } else {
                            content = "// Constant code not found"
                            console.warn(`Could not find constant content for path: ${filePath}`)
                            console.log("Available constant paths:", Object.keys(blockData.constant))
                        }
                    }
                }
            }
        } else {
            content = "// No constants defined for this block"
        }
    } else if (filePath.includes("/lib/")) {
        if (blockData.lib) {
            const normalizedFilePath = normalizePath(filePath, "lib")

            // Try with normalized path first
            if (typeof blockData.lib[normalizedFilePath] === "object") {
                content = blockData.lib[normalizedFilePath].content || "// Lib code not found"
                fileLanguage = blockData.lib[normalizedFilePath].language || fileLanguage
            } else if (blockData.lib[normalizedFilePath]) {
                content = blockData.lib[normalizedFilePath]
            } else {
                // Try with original path if normalized path fails
                if (typeof blockData.lib[filePath] === "object") {
                    content = blockData.lib[filePath].content || "// Lib code not found"
                    fileLanguage = blockData.lib[filePath].language || fileLanguage
                } else if (blockData.lib[filePath]) {
                    content = blockData.lib[filePath]
                } else {
                    // Try without /utils suffix
                    const basePathWithoutUtils = normalizedFilePath.replace("/utils", "")
                    if (typeof blockData.lib[basePathWithoutUtils] === "object") {
                        content = blockData.lib[basePathWithoutUtils].content || "// Lib code not found"
                        fileLanguage = blockData.lib[basePathWithoutUtils].language || fileLanguage
                    } else if (blockData.lib[basePathWithoutUtils]) {
                        content = blockData.lib[basePathWithoutUtils]
                    } else {
                        content = "// Lib code not found"
                        console.warn(`Could not find lib content for path: ${filePath}`)
                        console.log("Available lib paths:", Object.keys(blockData.lib))
                    }
                }
            }
        } else {
            content = "// No lib defined for this block"
        }
    } else if (filePath.includes("/hooks/")) {
        if (blockData.hooks) {
            if (typeof blockData.hooks[filePath] === "object") {
                content = blockData.hooks[filePath].content || "// Hook code not found"
                fileLanguage = blockData.hooks[filePath].language || fileLanguage
            } else {
                content = blockData.hooks[filePath] || "// Hook code not found"
            }
        } else {
            content = "// No hooks defined for this block"
        }
    } else if (filePath.includes("/context/")) {
        if (blockData.context) {
            if (typeof blockData.context[filePath] === "object") {
                content = blockData.context[filePath].content || "// Context code not found"
                fileLanguage = blockData.context[filePath].language || fileLanguage
            } else {
                content = blockData.context[filePath] || "// Context code not found"
            }
        } else {
            content = "// No context defined for this block"
        }
    } else {
        // page.tsx or other root file
        if (typeof blockData[filePath] === "object") {
            content = blockData[filePath].content || "// Page code not found"
            fileLanguage = blockData[filePath].language || fileLanguage
        } else {
            content = blockData[filePath] || "// Page code not found"
        }
    }

    return { content, language: fileLanguage }
}

// Add this function after the loadSourceCode function
export function debugSourceMap(blockId: string, sourceMap: Record<string, any> | null): void {
    if (!sourceMap) {
        console.warn("Source map is not loaded yet")
        return
    }

    const blockData = sourceMap[blockId]
    if (!blockData) {
        console.warn(`Block data not found for ${blockId}`)
        return
    }

    console.log("Block data structure:", {
        components: blockData.components ? Object.keys(blockData.components) : [],
        lib: blockData.lib ? Object.keys(blockData.lib) : [],
        constant: blockData.constant ? Object.keys(blockData.constant) : [],
        hooks: blockData.hooks ? Object.keys(blockData.hooks) : [],
        context: blockData.context ? Object.keys(blockData.context) : [],
    })
}

/**
 * Finds the first file in a file tree
 * @param tree The file tree to search
 * @returns The path of the first file found, or null if no files are found
 */
export function findFirstFile(tree: FileTree[]): string | null {
    for (const item of tree) {
        if (item.path) {
            return item.path
        }
        if (item.children) {
            const found = findFirstFile(item.children)
            if (found) return found
        }
    }
    return null
}
