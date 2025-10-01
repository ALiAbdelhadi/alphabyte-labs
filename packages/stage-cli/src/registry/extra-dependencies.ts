export function extractDependencies(content: string): string[] {
    const dependencies: string[] = []

    // Extract imports
    const importRegex = /import\s+.*?\s+from\s+['"]([^'"]+)['"]/g
    let match

    while ((match = importRegex.exec(content)) !== null) {
        const importPath = match[1]

        // Skip relative imports and internal imports
        if (!importPath.startsWith('.') && !importPath.startsWith('@/')) {
            // Handle scoped packages (@scope/package) and regular packages
            let packageName = importPath.split('/')[0]
            if (packageName.startsWith('@')) {
                // For scoped packages, take first two parts: @scope/package
                const parts = importPath.split('/')
                if (parts.length >= 2) {
                    packageName = `${parts[0]}/${parts[1]}`
                }
            }

            if (!dependencies.includes(packageName)) {
                dependencies.push(packageName)
            }
        }
    }

    return dependencies
}

export function extractInternalImports(content: string): string[] {
    const internal: string[] = []
    const importRegex = /import\s+.*?\s+from\s+['"]([^'\"]+)['"]/g
    let match
    while ((match = importRegex.exec(content)) !== null) {
        const importPath = match[1]
        if (importPath.startsWith('@/')) {
            if (!internal.includes(importPath)) internal.push(importPath)
        }
    }
    return internal
}