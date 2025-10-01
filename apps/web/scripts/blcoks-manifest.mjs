import { promises as fs } from "fs"
import path from "path"

const VIEW_DIR = path.join(process.cwd(), "apps", "web", "registry", "view")
const OUTPUT_TS = path.join(process.cwd(), "apps", "web", "registry", "blocks-examples.ts")

function asRegistryPath(absPath) {
    // Convert absolute path under VIEW_DIR to alias path starting with @/registry/view
    const rel = path.relative(path.join(process.cwd(), "apps", "web"), absPath).replace(/\\/g, "/").replace(/\.tsx?$/, "")
    return `@/${rel}`
}

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

function categorize(relPathNoExt) {
    // relPathNoExt like "about-1/components/about"
    const parts = relPathNoExt.split("/")
    // [blockName, maybeCategory, ...]
    if (parts.length < 2) return { category: null }
    const cat = parts[1]
    const known = ["components", "constant", "lib", "context", "hooks", "types", "styles"]
    if (known.includes(cat)) return { category: cat }
    return { category: null }
}

async function collectBlock(blockDir, pendingDeps) {
    const name = path.basename(blockDir)
    const entries = await fs.readdir(blockDir, { withFileTypes: true })
    const data = {
        name,
        target: "",
        dependencies: [],
        components: [],
        constant: [],
        lib: [],
        context: [],
        hooks: [],
        types: [],
        styles: [],
    }

    for (const ent of entries) {
        const abs = path.join(blockDir, ent.name)
        if (ent.isFile()) {
            const noExt = abs.replace(/\\/g, "/").replace(/\.tsx?$/, "")
            const regPath = asRegistryPath(abs)
            const relNoExt = path.relative(VIEW_DIR, noExt).replace(/\\/g, "/")
            // extract deps
            if (/\.(tsx|ts)$/.test(ent.name)) {
                const src = await fs.readFile(abs, "utf8")
                for (const dep of extractDeps(src)) pendingDeps.add(dep)
            }
            if (ent.name === "page.tsx") {
                data.target = asRegistryPath(abs.replace(/\.tsx$/, ""))
            } else if (ent.name === "layout.tsx") {
                data.layout = asRegistryPath(abs.replace(/\.tsx$/, ""))
            } else {
                const { category } = categorize(relNoExt)
                if (category && Array.isArray(data[category])) {
                    data[category].push(regPath.replace(/\.tsx$/, ""))
                }
            }
        } else if (ent.isDirectory()) {
            // Recurse within block subfolders
            const subfiles = await fs.readdir(abs, { withFileTypes: true })
            for (const sf of subfiles) {
                const sfAbs = path.join(abs, sf.name)
                if (sf.isFile() && /\.tsx?$/.test(sf.name)) {
                    const regPath = asRegistryPath(sfAbs)
                    const noExtAbs = sfAbs.replace(/\\/g, "/").replace(/\.tsx?$/, "")
                    const relNoExt = path.relative(VIEW_DIR, noExtAbs).replace(/\\/g, "/")
                    // extract deps
                    const src = await fs.readFile(sfAbs, "utf8")
                    for (const dep of extractDeps(src)) pendingDeps.add(dep)
                    const { category } = categorize(relNoExt)
                    if (category && Array.isArray(data[category])) {
                        data[category].push(regPath.replace(/\.tsx$/, ""))
                    }
                }
            }
        }
    }

    // Ensure unique and sorted
    for (const key of ["components", "constant", "lib", "context", "hooks", "types", "styles"]) {
        data[key] = Array.from(new Set(data[key])).sort()
    }
    data.dependencies = Array.from(pendingDeps).sort()
    return data
}

async function main() {
    const dirs = await fs.readdir(VIEW_DIR, { withFileTypes: true })
    const blocks = []
    for (const d of dirs) {
        if (!d.isDirectory()) continue
        const blockDir = path.join(VIEW_DIR, d.name)
        const pagePath = path.join(blockDir, "page.tsx")
        try {
            await fs.access(pagePath)
        } catch {
            continue
        }
        const pendingDeps = new Set()
        const info = await collectBlock(blockDir, pendingDeps)
        blocks.push(info)
    }

    // Emit TypeScript file matching existing structure
  const ordered = blocks.map(b => ({
    name: b.name,
    target: b.target,
    dependencies: b.dependencies || [],
    components: b.components || [],
    constant: b.constant || [],
    lib: b.lib || [],
    context: b.context || [],
    hooks: b.hooks || [],
    types: b.types || [],
    styles: b.styles || [],
    ...(b.layout ? { layout: b.layout } : {}),
  }))
  const header = `// This file was automatically generated\nexport const blockExamples = { items: `
  const body = JSON.stringify(ordered, null, 2)
    const footer = ` }\n`
    const content = `${header}${body}${footer}`

    await fs.writeFile(OUTPUT_TS, content, "utf8")
    console.log(`Wrote ${OUTPUT_TS}`)
}

main().catch((e) => {
    console.error(e)
    process.exit(1)
})

