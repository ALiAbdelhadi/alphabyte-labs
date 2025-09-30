import { detect } from "@antfu/ni"
import { execa } from "execa"
import path from "path"
import { logger } from "./logger.js"

export type PackageManager = "pnpm" | "npm" | "yarn" | "bun" | "deno"

interface PackageManagerConfig {
  installCmd: string[]
  devInstallCmd: string[]
  addCmd: string[]
  devAddCmd: string[]
  runner: string
  lockFile: string
}

const PACKAGE_MANAGERS: Record<PackageManager, PackageManagerConfig> = {
  pnpm: {
    installCmd: ["install"],
    devInstallCmd: ["install"],
    addCmd: ["add"],
    devAddCmd: ["add", "-D"],
    runner: "pnpm dlx",
    lockFile: "pnpm-lock.yaml"
  },
  bun: {
    installCmd: ["install"],
    devInstallCmd: ["install"],
    addCmd: ["add"],
    devAddCmd: ["add", "-D"],
    runner: "bunx",
    lockFile: "bun.lockb"
  },
  yarn: {
    installCmd: ["install"],
    devInstallCmd: ["install"],
    addCmd: ["add"],
    devAddCmd: ["add", "-D"],
    runner: "npx",
    lockFile: "yarn.lock"
  },
  npm: {
    installCmd: ["install"],
    devInstallCmd: ["install"],
    addCmd: ["install"],
    devAddCmd: ["install", "--save-dev"],
    runner: "npx",
    lockFile: "package-lock.json"
  },
  deno: {
    installCmd: ["install"],
    devInstallCmd: ["install"],
    addCmd: ["add"],
    devAddCmd: ["add", "--dev"],
    runner: "deno run",
    lockFile: "deno.lock"
  }
}

/**
 * Enhanced package manager detection using @antfu/ni with fallback strategies
 */
export async function getPackageManager(
  targetDir: string,
  options: {
    withFallback?: boolean
    withUserAgent?: boolean
  } = {
      withFallback: true,
      withUserAgent: true
    }
): Promise<PackageManager> {
  try {
    // Primary detection using @antfu/ni
    const packageManager = await detect({
      programmatic: true,
      cwd: targetDir
    })

    // Handle specific version variants
    if (packageManager === "yarn@berry") {
      logger.info("📦 Detected Yarn Berry")
      return "yarn"
    }
    if (packageManager === "pnpm@6") {
      logger.info("📦 Detected PNPM v6")
      return "pnpm"
    }
    if (packageManager && packageManager in PACKAGE_MANAGERS) {
      logger.info(`📦 Detected ${packageManager}`)
      return packageManager as PackageManager
    }

    // If detected but not in our supported list, log it
    if (packageManager) {
      logger.info(`📦 Detected ${packageManager}, using npm as fallback`)
    }

    // Fallback strategies
    if (options.withFallback) {
      return await getFallbackPackageManager(targetDir, options.withUserAgent)
    }

    return packageManager as PackageManager || "npm"

  } catch (error) {
    logger.debug(`Package manager detection failed: ${error}`)

    if (options.withFallback) {
      return await getFallbackPackageManager(targetDir, options.withUserAgent)
    }

    return "npm"
  }
}

/**
 * Fallback package manager detection strategies
 */
async function getFallbackPackageManager(
  targetDir: string,
  withUserAgent: boolean = true
): Promise<PackageManager> {

  // Strategy 1: Check lock files manually
  try {
    const { promises: fs } = await import("fs")

    const lockFiles: Array<{ file: string; pm: PackageManager }> = [
      { file: "pnpm-lock.yaml", pm: "pnpm" },
      { file: "bun.lockb", pm: "bun" },
      { file: "deno.lock", pm: "deno" },
      { file: "yarn.lock", pm: "yarn" },
      { file: "package-lock.json", pm: "npm" }
    ]

    for (const { file, pm } of lockFiles) {
      try {
        await fs.access(path.join(targetDir, file))
        logger.info(`📦 Detected ${pm} from lockfile: ${file}`)
        return pm
      } catch {
        continue
      }
    }
  } catch (error) {
    logger.debug(`Lock file detection failed: ${error}`)
  }

  // Strategy 2: Check package.json packageManager field
  try {
    const { promises: fs } = await import("fs")
    const packageJsonPath = path.join(targetDir, "package.json")
    const packageJsonContent = await fs.readFile(packageJsonPath, "utf8")
    const packageJson = JSON.parse(packageJsonContent)

    if (packageJson.packageManager) {
      const pmName = packageJson.packageManager.split("@")[0] as PackageManager
      if (pmName in PACKAGE_MANAGERS) {
        logger.info(`📦 Detected ${pmName} from package.json packageManager field`)
        return pmName
      }
    }
  } catch (error) {
    logger.debug(`package.json packageManager detection failed: ${error}`)
  }

  // Strategy 3: User agent detection (from npm_config_user_agent)
  if (withUserAgent) {
    const userAgent = process.env.npm_config_user_agent || ""

    if (userAgent.startsWith("pnpm")) {
      logger.info("📦 Detected pnpm from user agent")
      return "pnpm"
    }
    if (userAgent.startsWith("yarn")) {
      logger.info("📦 Detected yarn from user agent")
      return "yarn"
    }
    if (userAgent.startsWith("bun")) {
      logger.info("📦 Detected bun from user agent")
      return "bun"
    }
  }

  // Strategy 4: Check global availability
  const availableManagers = await getAvailablePackageManagers()

  if (availableManagers.includes("pnpm")) {
    logger.info("📦 Using pnpm (globally available)")
    return "pnpm"
  }
  if (availableManagers.includes("bun")) {
    logger.info("📦 Using bun (globally available)")
    return "bun"
  }
  if (availableManagers.includes("yarn")) {
    logger.info("📦 Using yarn (globally available)")
    return "yarn"
  }

  logger.info("📦 Defaulting to npm")
  return "npm"
}

/**
 * Get package runner command (equivalent to npx)
 */
export async function getPackageRunner(
  cwd: string,
  options?: { withFallback?: boolean }
): Promise<string> {
  const packageManager = await getPackageManager(cwd, options)
  const config = PACKAGE_MANAGERS[packageManager]
  return config.runner
}

/**
 * Enhanced dependency installation with better error handling and logging
 */
export async function installDependencies(
  dependencies: string[],
  cwd: string,
  options: {
    packageManager?: PackageManager
    dev?: boolean
    exact?: boolean
    silent?: boolean
  } = {}
): Promise<void> {
  if (dependencies.length === 0) {
    logger.info("No dependencies to install")
    return
  }

  const pm = options.packageManager || await getPackageManager(cwd)
  const config = PACKAGE_MANAGERS[pm]

  // Build command based on options
  let command = options.dev ? [...config.devAddCmd] : [...config.addCmd]

  // Add exact version flag if requested
  if (options.exact) {
    if (pm === "npm") command.push("--save-exact")
    if (pm === "yarn") command.push("--exact")
    if (pm === "pnpm") command.push("--save-exact")
  }

  command.push(...dependencies)

  try {
    const depType = options.dev ? "dev dependencies" : "dependencies"
    if (!options.silent) {
      logger.info(`Installing ${depType} with ${pm}: ${dependencies.join(", ")}`)
    }

    await execa(pm, command, {
      cwd,
      stdio: options.silent ? 'pipe' : 'inherit',
      timeout: 600000, // 10 minutes
      env: {
        ...process.env,
        // Disable update notifiers during installation
        PNPM_UPDATE_NOTIFIER: 'false',
        NPM_CONFIG_UPDATE_NOTIFIER: 'false',
        YARN_UPDATE_NOTIFIER: 'false'
      }
    })

    if (!options.silent) {
      logger.success(`✅ Successfully installed ${dependencies.length} ${depType} with ${pm}`)
    }

  } catch (error) {
    const exactFlag = options.exact ? (pm === "npm" ? "--save-exact" : "--exact") : ""
    const devFlag = options.dev ? (config.devAddCmd.includes("-D") ? "-D" : "--save-dev") : ""
    const flags = [devFlag, exactFlag].filter(Boolean).join(" ")
    const fallbackCommand = `${pm} ${config.addCmd[0]} ${flags} ${dependencies.join(" ")}`.trim()

    logger.error(`❌ Failed to install ${options.dev ? "dev " : ""}dependencies with ${pm}`)
    logger.error(`Error: ${error instanceof Error ? error.message : String(error)}`)
    logger.info(`💡 Try running manually: ${fallbackCommand}`)

    throw new Error(`Package installation failed: ${dependencies.join(", ")}`)
  }
}

/**
 * Install development dependencies (convenience method)
 */
export async function installDevDependencies(
  dependencies: string[],
  cwd: string,
  options: Omit<Parameters<typeof installDependencies>[2], 'dev'> = {}
): Promise<void> {
  return installDependencies(dependencies, cwd, { ...options, dev: true })
}

/**
 * Run package manager install command for existing package.json
 */
export async function runInstall(
  cwd: string,
  options: {
    packageManager?: PackageManager
    silent?: boolean
    frozen?: boolean // Use frozen lockfile (CI mode)
  } = {}
): Promise<void> {
  const pm = options.packageManager || await getPackageManager(cwd)
  const config = PACKAGE_MANAGERS[pm]

  let command = [...config.installCmd]

  // Add frozen lockfile flag for CI environments
  if (options.frozen) {
    if (pm === "npm") command.push("--ci")
    if (pm === "yarn") command.push("--frozen-lockfile")
    if (pm === "pnpm") command.push("--frozen-lockfile")
    if (pm === "bun") command.push("--frozen-lockfile")
  }

  try {
    if (!options.silent) {
      logger.info(`Running ${pm} install...`)
    }

    await execa(pm, command, {
      cwd,
      stdio: options.silent ? 'pipe' : 'inherit',
      timeout: 600000,
      env: {
        ...process.env,
        PNPM_UPDATE_NOTIFIER: 'false',
        NPM_CONFIG_UPDATE_NOTIFIER: 'false',
        YARN_UPDATE_NOTIFIER: 'false'
      }
    })

    if (!options.silent) {
      logger.success(`✅ Installation completed with ${pm}`)
    }

  } catch (error) {
    logger.error(`❌ Installation failed with ${pm}`)
    logger.error(`Error: ${error instanceof Error ? error.message : String(error)}`)
    throw new Error(`Package installation failed`)
  }
}

/**
 * Get command string for manual installation
 */
export function getPackageManagerCommand(
  pm: PackageManager,
  isDevDependency = false,
  isExact = false
): string {
  const config = PACKAGE_MANAGERS[pm]
  const baseCommand = isDevDependency ? config.devAddCmd : config.addCmd

  let flags: string[] = []
  if (isExact) {
    if (pm === "npm" || pm === "pnpm") flags.push("--save-exact")
    if (pm === "yarn") flags.push("--exact")
  }

  return `${pm} ${baseCommand.join(" ")} ${flags.join(" ")}`.trim()
}

/**
 * Check if a package manager is available globally
 */
export async function isPackageManagerAvailable(pm: PackageManager): Promise<boolean> {
  try {
    await execa(pm, ["--version"], { timeout: 5000, stdio: 'pipe' })
    return true
  } catch {
    return false
  }
}

/**
 * Get all available package managers on the system
 */
export async function getAvailablePackageManagers(): Promise<PackageManager[]> {
  const managers: PackageManager[] = ["pnpm", "bun", "yarn", "npm", "deno"]
  const available: PackageManager[] = []

  const results = await Promise.allSettled(
    managers.map(pm => isPackageManagerAvailable(pm))
  )

  results.forEach((result, index) => {
    if (result.status === "fulfilled" && result.value) {
      available.push(managers[index])
    }
  })

  return available
}

/**
 * Get lockfile name for a package manager
 */
export function getLockfileName(pm: PackageManager): string {
  return PACKAGE_MANAGERS[pm].lockFile
}

/**
 * Check if project has a lockfile
 */
export async function hasLockfile(cwd: string, pm?: PackageManager): Promise<boolean> {
  try {
    const { promises: fs } = await import("fs")

    if (pm) {
      const lockFile = getLockfileName(pm)
      await fs.access(path.join(cwd, lockFile))
      return true
    }

    // Check all possible lockfiles
    const lockFiles = Object.values(PACKAGE_MANAGERS).map(config => config.lockFile)

    for (const lockFile of lockFiles) {
      try {
        await fs.access(path.join(cwd, lockFile))
        return true
      } catch {
        continue
      }
    }

    return false
  } catch {
    return false
  }
}

// Legacy compatibility exports
export const detectPackageManager = getPackageManager
export { getPackageManager as detect }

