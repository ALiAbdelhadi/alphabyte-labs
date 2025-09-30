import { cosmiconfig } from "cosmiconfig"
import fsExtra from "fs-extra"
import path from "path"
import { loadConfig } from "tsconfig-paths"
import { z } from "zod"
import { configSchema, rawConfigSchema } from "../schema/index.js"

export const DEFAULT_COMPONENTS = "@/components"
export const DEFAULT_UTILS = "@/lib/utils"
export const DEFAULT_TAILWIND_CSS = "app/globals.css"
export const DEFAULT_TAILWIND_CONFIG = "tailwind.config.js"
export const DEFAULT_TAILWIND_BASE_COLOR = "slate"

export const explorer = cosmiconfig("components", {
  searchPlaces: ["components.json"],
})

export type Config = z.infer<typeof configSchema>

export async function getConfig(cwd: string) {
  const config = await getRawConfig(cwd)

  if (!config) {
    return null
  }

  if (!config.iconLibrary) {
    config.iconLibrary = "lucide"
  }

  return await resolveConfigPaths(cwd, config)
}

export async function resolveConfigPaths(
  cwd: string,
  config: z.infer<typeof rawConfigSchema>
) {
  const tsConfig = await loadConfig(cwd)
  // const tsConfigPaths = tsConfig?.paths || {}

  const resolvePath = (p: string) => {
    if (p.startsWith("@/")) return p
    return p
  }

  return {
    ...config,
    aliases: {
      components: resolvePath(config.aliases?.components || DEFAULT_COMPONENTS),
      utils: resolvePath(config.aliases?.utils || DEFAULT_UTILS),
      ui: resolvePath(config.aliases?.ui || `${DEFAULT_COMPONENTS}/ui`),
      lib: resolvePath(config.aliases?.lib || "@/lib"),
      hooks: resolvePath(config.aliases?.hooks || "@/hooks"),
    },
  } as Config
}

export async function getRawConfig(cwd: string) {
  try {
    const config = await explorer.search(cwd)
    return config ? rawConfigSchema.parse(config.config) : null
  } catch (error) {
    throw new Error(`Failed to load config: ${error}`)
  }
}

export async function createConfig(config: Partial<Config>, cwd: string) {
  const configPath = path.join(cwd, "components.json")
  const configContent = JSON.stringify(config, null, 2)
  await fsExtra.outputFile(configPath, configContent)
  return configPath
}

export async function updateConfig(
  cwd: string,
  updates: Partial<Config>
) {
  const existingConfig = await getRawConfig(cwd)
  const newConfig = { ...existingConfig, ...updates }

  const configPath = path.join(cwd, "components.json")
  const configContent = JSON.stringify(newConfig, null, 2)
  await fsExtra.outputFile(configPath, configContent)
  return newConfig
}

export function getConfigPath(cwd: string) {
  return path.join(cwd, "components.json")
}

export async function configExists(cwd: string) {
  const configPath = getConfigPath(cwd)
  return fsExtra.pathExists(configPath)
}
