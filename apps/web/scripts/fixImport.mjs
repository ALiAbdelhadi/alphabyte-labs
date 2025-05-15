/**
 * Fixes import paths in code to use standardized paths
 * @param {string} content - The source code content
 * @returns {string} The content with fixed imports
 */
export function fixImport(content) {
    const regex = /@\/(.+?)\/((?:.*?\/)?(?:components|ui|hooks|lib|constant|context))\/([\w-]+)/g

    const replacement = (
        match,
        path,
        type,
        component
    ) => {
        if (type.endsWith("components")) {
            return `@/components/${component}`
        } else if (type.endsWith("u0i")) {
            return `@/components/ui/${component}`
        } else if (type.endsWith("hooks")) {
            return `@/hooks/${component}`
        } else if (type.endsWith("lib")) {
            return `@/lib/${component}`
        } else if (type.endsWith("constant")) {
            return `@/constant/${component}`
        } else if (type.endsWith("context")) {
            return `@/context/${component}`
        }
        return match
    }

    return content.replace(regex, replacement)
}

// Remove this line or provide a value for 'code'
// console.log(fixImport(code))