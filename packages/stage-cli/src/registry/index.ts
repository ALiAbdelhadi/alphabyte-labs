  import { promises as fs } from "fs"
import path from "path"

// Resolve registry path relative to the installed CLI package. During development
// it will fall back to the monorepo path; in production (installed via npm) it
// uses the bundled registry under the CLI package directory.
export async function getRegistryPath() {
  // Try bundled registry inside the built CLI package
  const bundledPath = path.join(__dirname, "registry")
  try {
    await fs.access(bundledPath)
    return bundledPath
  } catch {}

  // Fallback: search up for monorepo path (dev usage)
  let currentDir = process.cwd()
  while (currentDir !== path.dirname(currentDir)) {
    const registryPath = path.join(currentDir, "apps/web/registry")
    try {
      await fs.access(registryPath)
      return registryPath
    } catch {}
    currentDir = path.dirname(currentDir)
  }

  // Final fallback: current working directory
  return path.join(process.cwd(), "apps/web/registry")
}
