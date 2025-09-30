import path from "path"
import fs from "fs-extra"
import { execa } from "execa"
import { logger } from "./logger.js"

export async function isNextAppPresent(cwd: string): Promise<boolean> {
    const pkgPath = path.join(cwd, "package.json")
    if (!(await fs.pathExists(pkgPath))) return false
    try {
        const pkg = await fs.readJSON(pkgPath)
        const deps = { ...(pkg.dependencies || {}), ...(pkg.devDependencies || {}) }
        const hasNext = typeof deps["next"] === "string"
        const appDir = await fs.pathExists(path.join(cwd, "app"))
        return hasNext && appDir
    } catch {
        return false
    }
}

export async function scaffoldNextApp(cwd: string, projectName?: string) {
    const targetDirName = projectName || path.basename(cwd)
    logger.info(`Scaffolding Next.js app in ${cwd} ...`)

    // Prefer non-interactive flags
    const args = [
        "create-next-app@latest",
        ".",
        "--yes",
        "--ts",
        "--eslint",
        "--tailwind",
        "--app",
        "--src-dir=false",
        "--import-alias",
        "@/*",
        "--use-pnpm"
    ]

    await execa("npx", args, { cwd, stdio: "inherit" })
    logger.success("Next.js app scaffolded successfully.")
}


