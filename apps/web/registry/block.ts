export interface FileTree {
    name: string
    path?: string
    language?: string
    children?: FileTree[]
}

export interface Block {
    name: string
    target: string
    components: string[]
    constant: string[]
    lib: string[]
    context: string[]
    hooks: string[]
    layout?: string
    types?: string[]
    styles?: string[]
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

    return extension && extension in extensionMap ? extensionMap[extension] : "typescript"
}

function hasExtension(filename: string): boolean {
    const extensions = [".ts", ".tsx", ".js", ".jsx", ".css", ".scss", ".less", ".json", ".html", ".md", ".mdx"]
    return extensions.some((ext) => filename.toLowerCase().endsWith(ext))
}

function extractFileName(path: string): string {
    const pathParts = path.split("/")
    return pathParts[pathParts.length - 1] || ""
}

export async function generateFileTreeFromBlockId(blockId: string) {
    const block = blockExamples.items.find((item) => item.name === blockId)
    if (!block) return []

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
            ],
        },
    ]

    // Add layout.tsx if it exists
    if (block.layout) {
        fileTree[0].children?.push({
            name: "layout.tsx",
            path: block.layout,
            language: "tsx",
        })
    }

    // Add components folder
    if (block.components && block.components.length > 0) {
        fileTree[0].children?.push({
            name: "components",
            children: await Promise.all(
                block.components.map(async (comp) => {
                    const fileName = extractFileName(comp)
                    const language = await getFileLanguage(blockId, comp)

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
        })
    }

    // Add constants folder
    if (block.constant && block.constant.length > 0) {
        fileTree[0].children?.push({
            name: "constants",
            children: await Promise.all(
                block.constant.map(async (constant) => {
                    const fileName = extractFileName(constant)
                    const language = await getFileLanguage(blockId, constant)
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

    // Add lib folder
    if (block.lib && block.lib.length > 0) {
        fileTree[0].children?.push({
            name: "lib",
            children: await Promise.all(
                block.lib.map(async (lib) => {
                    const fileName = extractFileName(lib)
                    const language = await getFileLanguage(blockId, lib)
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

    // Add context folder
    if (block.context && block.context.length > 0) {
        fileTree[0].children?.push({
            name: "context",
            children: await Promise.all(
                block.context.map(async (context) => {
                    const fileName = extractFileName(context)
                    const language = await getFileLanguage(blockId, context)
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

    // Add hooks folder
    if (block.hooks && block.hooks.length > 0) {
        fileTree[0].children?.push({
            name: "hooks",
            children: await Promise.all(
                block.hooks.map(async (hook) => {
                    const fileName = extractFileName(hook)
                    const language = await getFileLanguage(blockId, hook)
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

    // Add types folder if it exists
    if (block.types && block.types.length > 0) {
        fileTree[0].children?.push({
            name: "types",
            children: await Promise.all(
                block.types.map(async (type: string) => {
                    const fileName = extractFileName(type)
                    const language = await getFileLanguage(blockId, type)
                    let finalName = fileName || "index"
                    if (!hasExtension(finalName)) {
                        finalName = `${finalName}${getExtensionFromLanguage(language)}`
                    }

                    return {
                        name: finalName,
                        path: type,
                        language,
                    }
                }),
            ),
        })
    }

    // Add styles folder if it exists
    if (block.styles && block.styles.length > 0) {
        fileTree[0].children?.push({
            name: "styles",
            children: await Promise.all(
                block.styles.map(async (style: string) => {
                    const fileName = extractFileName(style)
                    const language = await getFileLanguage(blockId, style)
                    let finalName = fileName || "styles"
                    if (!hasExtension(finalName)) {
                        finalName = `${finalName}${getExtensionFromLanguage(language)}`
                    }

                    return {
                        name: finalName,
                        path: style,
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
        if (
            normalizedPath.endsWith(".ts") ||
            normalizedPath.endsWith(".tsx") ||
            normalizedPath.endsWith(".js") ||
            normalizedPath.endsWith(".jsx")
        ) {
            normalizedPath = normalizedPath.replace(/\.(ts|tsx|js|jsx)$/, "")
        }
        if (normalizedPath.endsWith("/utils")) {
        } else if (!normalizedPath.includes("/utils")) {
            normalizedPath = `${normalizedPath}/utils`
        }
    } else if (type === "constant") {
        if (
            normalizedPath.endsWith(".ts") ||
            normalizedPath.endsWith(".tsx") ||
            normalizedPath.endsWith(".js") ||
            normalizedPath.endsWith(".jsx") ||
            normalizedPath.endsWith(".json")
        ) {
            normalizedPath = normalizedPath.replace(/\.(ts|tsx|js|jsx|json)$/, "")
        }
        const isJsonFile = path.toLowerCase().endsWith(".json")

        if (normalizedPath.endsWith("/index")) {
        } else if (!normalizedPath.includes("/index") && !isJsonFile) {
            normalizedPath = `${normalizedPath}/index`
        }
    }

    return normalizedPath
}

export async function getFileLanguage(blockId: string, filePath: string): Promise<string> {
    const sourceMap = await getBlockSourceMap()
    if (!sourceMap || !sourceMap[blockId]) {
        return getLanguageFromExtension(filePath)
    }

    const blockData = sourceMap[blockId]

    // Check for layout file
    if (filePath.includes("layout.tsx") && blockData.layout && blockData.layout[filePath]) {
        return blockData.layout[filePath].language || "tsx"
    }

    if (filePath.includes("/components/") && blockData.components && blockData.components[filePath]) {
        return blockData.components[filePath].language || "tsx"
    }

    if (filePath.includes("/constant/") && blockData.constant && blockData.constant[filePath]) {
        return blockData.constant[filePath].language || "typescript"
    }

    if (filePath.includes("/lib/") && blockData.lib && blockData.lib[filePath]) {
        return blockData.lib[filePath].language || "typescript"
    }

    if (filePath.includes("/context/") && blockData.context && blockData.context[filePath]) {
        return blockData.context[filePath].language || "tsx"
    }

    if (filePath.includes("/hooks/") && blockData.hooks && blockData.hooks[filePath]) {
        return blockData.hooks[filePath].language || "tsx"
    }

    if (filePath.includes("/types/") && blockData.types && blockData.types[filePath]) {
        return blockData.types[filePath].language || "typescript"
    }

    if (filePath.includes("/styles/") && blockData.styles && blockData.styles[filePath]) {
        return blockData.styles[filePath].language || "css"
    }

    if (blockData[filePath]) {
        if (typeof blockData[filePath] === "object" && blockData[filePath].language) {
            return blockData[filePath].language
        }
        return "tsx"
    }

    return getLanguageFromExtension(filePath)
}

export interface CodeFile {
    path: string
    content: string
    language?: string
}

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

    // Handle layout files
    if (filePath.includes("layout.tsx")) {
        if (blockData.layout) {
            if (typeof blockData.layout[filePath] === "object") {
                content = blockData.layout[filePath].content || "// Layout code not found"
                fileLanguage = blockData.layout[filePath].language || fileLanguage
            } else {
                content = blockData.layout[filePath] || "// Layout code not found"
            }
        } else {
            content = "// No layout defined for this block"
        }
    } else if (filePath.includes("/components/")) {
        if (typeof blockData.components?.[filePath] === "object") {
            content = blockData.components[filePath].content || "// Component code not found"
            fileLanguage = blockData.components[filePath].language || fileLanguage
        } else {
            content = blockData.components?.[filePath] || "// Component code not found"
        }
    } else if (filePath.includes("/constant/")) {
        if (blockData.constant) {
            const isJsonFile = filePath.toLowerCase().endsWith(".json")
            if (isJsonFile) {
                if (typeof blockData.constant[filePath] === "object") {
                    content = blockData.constant[filePath].content || "// Constant code not found"
                    fileLanguage = blockData.constant[filePath].language || "json"
                } else if (blockData.constant[filePath]) {
                    content = blockData.constant[filePath]
                    fileLanguage = "json"
                } else {
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
                const normalizedFilePath = normalizePath(filePath, "constant")

                if (typeof blockData.constant[normalizedFilePath] === "object") {
                    content = blockData.constant[normalizedFilePath].content || "// Constant code not found"
                    fileLanguage = blockData.constant[normalizedFilePath].language || fileLanguage
                } else if (blockData.constant[normalizedFilePath]) {
                    content = blockData.constant[normalizedFilePath]
                } else {
                    if (typeof blockData.constant[filePath] === "object") {
                        content = blockData.constant[filePath].content || "// Constant code not found"
                        fileLanguage = blockData.constant[filePath].language || fileLanguage
                    } else if (blockData.constant[filePath]) {
                        content = blockData.constant[filePath]
                    } else {
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
            if (typeof blockData.lib[normalizedFilePath] === "object") {
                content = blockData.lib[normalizedFilePath].content || "// Lib code not found"
                fileLanguage = blockData.lib[normalizedFilePath].language || fileLanguage
            } else if (blockData.lib[normalizedFilePath]) {
                content = blockData.lib[normalizedFilePath]
            } else {
                if (typeof blockData.lib[filePath] === "object") {
                    content = blockData.lib[filePath].content || "// Lib code not found"
                    fileLanguage = blockData.lib[filePath].language || fileLanguage
                } else if (blockData.lib[filePath]) {
                    content = blockData.lib[filePath]
                } else {
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
    } else if (filePath.includes("/types/")) {
        if (blockData.types) {
            if (typeof blockData.types[filePath] === "object") {
                content = blockData.types[filePath].content || "// Types code not found"
                fileLanguage = blockData.types[filePath].language || fileLanguage
            } else {
                content = blockData.types[filePath] || "// Types code not found"
            }
        } else {
            content = "// No types defined for this block"
        }
    } else if (filePath.includes("/styles/")) {
        if (blockData.styles) {
            if (typeof blockData.styles[filePath] === "object") {
                content = blockData.styles[filePath].content || "// Styles code not found"
                fileLanguage = blockData.styles[filePath].language || fileLanguage
            } else {
                content = blockData.styles[filePath] || "// Styles code not found"
            }
        } else {
            content = "// No styles defined for this block"
        }
    } else {
        if (typeof blockData[filePath] === "object") {
            content = blockData[filePath].content || "// Page code not found"
            fileLanguage = blockData[filePath].language || fileLanguage
        } else {
            content = blockData[filePath] || "// Page code not found"
        }
    }

    return { content, language: fileLanguage }
}

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
        layout: blockData.layout ? Object.keys(blockData.layout) : [],
        components: blockData.components ? Object.keys(blockData.components) : [],
        lib: blockData.lib ? Object.keys(blockData.lib) : [],
        constant: blockData.constant ? Object.keys(blockData.constant) : [],
        hooks: blockData.hooks ? Object.keys(blockData.hooks) : [],
        context: blockData.context ? Object.keys(blockData.context) : [],
        types: blockData.types ? Object.keys(blockData.types) : [],
        styles: blockData.styles ? Object.keys(blockData.styles) : [],
    })
}

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
