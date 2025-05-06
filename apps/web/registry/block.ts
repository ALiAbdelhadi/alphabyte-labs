export interface FileTree {
    name: string
    path?: string
    children?: FileTree[]
}

import { blockExamples } from "./blocks-examples"

export function generateFileTreeFromBlockId(blockId: string) {
    const block = blockExamples.items.find((item) => item.name === blockId)
    if (!block) return []

    const fileTree: FileTree[] = [
        {
            name: blockId,
            children: [
                {
                    name: "page.tsx",
                    path: block.target,
                },
                {
                    name: "components",
                    children: block.components.map((comp) => {
                        const pathParts = comp.split("/")
                        const fileName = pathParts[pathParts.length - 1]
                        return {
                            name: `${fileName}.tsx`,
                            path: comp,
                        }
                    }),
                },
            ],
        },
    ]

    if (block.constant && block.constant.length > 0) {
        fileTree[0].children?.push({
            name: "constant",
            children: block.constant.map((constant) => {
                return {
                    name: "index.tsx",
                    path: `${constant}/index`,
                }
            }),
        })
    }
    if (block.lib && block.lib.length > 0) {
        fileTree[0].children?.push({
            name: "lib",
            children: block.lib.map((lib) => {
                return {
                    name: "utils.ts",
                    path: `${lib}/utils`,
                }
            }),
        })
    }
    return fileTree
}
export function normalizePath(path: string, type: "lib" | "constant"): string {
    let normalizedPath = path

    if (type === "lib") {
        if (normalizedPath.endsWith("/utils.ts")) {
            normalizedPath = normalizedPath.replace("/utils.ts", "/utils")
        } else if (normalizedPath.endsWith("/utils")) {
            normalizedPath = normalizedPath.replace("/utils", "")
        } else if (!normalizedPath.endsWith("/utils")) {
            normalizedPath = `${normalizedPath}/utils`
        }
    } else if (type === "constant") {
        if (normalizedPath.endsWith("/index.tsx")) {
            normalizedPath = normalizedPath.replace("/index.tsx", "/index")
        } else if (normalizedPath.endsWith("/index")) {
            normalizedPath = normalizedPath.replace("/index", "")
        } else if (!normalizedPath.endsWith("/index")) {
            normalizedPath = `${normalizedPath}/index`
        }
    }

    return normalizedPath
}
