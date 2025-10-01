import { promises as fs } from "fs"
import path from "path"

const UI_DIR = path.join(process.cwd(), "apps", "web", "registry", "ui")
const OUTPUT = path.join(process.cwd(), "apps", "web", "registry", "registry-components.json")

function extractDeps(src) {
    const deps = new Set()
    const re = /import\s+.*?\s+from\s+['"]([^'\"]+)['"]/g
    let m
    while ((m = re.exec(src)) !== null) {
        const mod = m[1]
        if (!mod.startsWith(".") && !mod.startsWith("@/")) {
            const parts = mod.split("/")
            let pkg = parts[0]
            if (pkg.startsWith("@") && parts.length > 1) pkg = `${parts[0]}/${parts[1]}`
            deps.add(pkg)
        }
    }
    return Array.from(deps)
}

function extractInternal(src) {
    const internal = new Set()
    const re = /import\s+.*?\s+from\s+['"]([^'\"]+)['"]/g
    let m
    while ((m = re.exec(src)) !== null) {
        const mod = m[1]
        if (mod.startsWith("@/")) internal.add(mod)
    }
    return Array.from(internal)
}

async function main() {
    const entries = await fs.readdir(UI_DIR)
    const result = {}
    for (const file of entries) {
        if (!file.endsWith(".tsx")) continue
        const name = path.basename(file, ".tsx")
        const full = path.join(UI_DIR, file)
        const src = await fs.readFile(full, "utf8")
        const deps = extractDeps(src)
        const internal = extractInternal(src)

        const ancillary = []
        if (name === "pre") {
            ancillary.push({ type: "style", path: "styles/prism-theme.css" })
        }

        result[name] = {
            dependencies: deps,
            internalImports: internal,
            ancillary,
        }
    }

    await fs.mkdir(path.dirname(OUTPUT), { recursive: true })
    await fs.writeFile(OUTPUT, JSON.stringify(result, null, 2))
    console.log(`Wrote ${OUTPUT}`)
}

main().catch((e) => {
    console.error(e)
    process.exit(1)
})


