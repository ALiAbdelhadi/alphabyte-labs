import { z } from "zod"
export const registryItemTypeSchema = z.enum([
  "registry:lib",
  "registry:block", 
  "registry:component",
  "registry:ui",
  "registry:hook",
  "registry:page",
  "registry:file",
  "registry:theme",
  "registry:style",
  "registry:item",
  "registry:icon",
  "registry:util",
  "registry:type",
  "registry:config",
  "registry:layout",
  "registry:api",
  "registry:example",
  "registry:internal",
  "components",
  "blocks",
  "hooks",
  "utils",
  "icons",
  "types",
  "pages",
  "layouts"
])

// Enhanced file schema with discriminated union for better type safety
export const registryItemFileSchema = z.discriminatedUnion("type", [
  // Files that require explicit target paths
  z.object({
    path: z.string(),
    content: z.string().optional(),
    type: z.enum(["registry:file", "registry:page", "registry:config"]),
    target: z.string(), // Required for these types
  }),
  // Files with optional target paths
  z.object({
    path: z.string(),
    content: z.string().optional(),
    type: registryItemTypeSchema.exclude(["registry:file", "registry:page", "registry:config"]),
    target: z.string().optional(),
  }),
])

// Tailwind configuration schema
export const registryItemTailwindSchema = z.object({
  config: z.object({
    content: z.array(z.string()).optional(),
    theme: z.record(z.string(), z.any()).optional(),
    plugins: z.array(z.string()).optional(),
    extend: z.record(z.string(), z.any()).optional(),
    darkMode: z.enum(["media", "class"]).optional(),
    corePlugins: z.record(z.string(), z.boolean()).optional(),
  }).optional(),
})

// CSS Variables schema for theme support
export const registryItemCssVarsSchema = z.object({
  theme: z.record(z.string(), z.string()).optional(),
  light: z.record(z.string(), z.string()).optional(), 
  dark: z.record(z.string(), z.string()).optional(),
})

// Recursive CSS schema for nested styles
const cssValueSchema: z.ZodType<any> = z.lazy(() =>
  z.union([z.string(), z.number(), z.record(z.string(), cssValueSchema)])
)

export const registryItemCssSchema = z.record(z.string(), cssValueSchema)

// Environment variables schema
export const registryItemEnvVarsSchema = z.record(z.string(), z.string())

// Enhanced registry item schema
export const registryItemSchema = z.object({
  $schema: z.string().optional(),
  extends: z.string().optional(), // Allow extending other components
  name: z.string(),
  type: registryItemTypeSchema,
  title: z.string().optional(),
  author: z.string().min(2).optional(),
  description: z.string().optional(),
  
  // Dependencies
  dependencies: z.array(z.string()).optional(),
  devDependencies: z.array(z.string()).optional(),
  registryDependencies: z.array(z.string()).optional(),
  
  // Files and configurations
  files: z.array(registryItemFileSchema).optional(),
  tailwind: registryItemTailwindSchema.optional(),
  cssVars: registryItemCssVarsSchema.optional(),
  css: registryItemCssSchema.optional(),
  envVars: registryItemEnvVarsSchema.optional(),
  
  // Metadata
  meta: z.record(z.string(), z.any()).optional(),
  docs: z.string().optional(),
  categories: z.array(z.string()).optional(),
  
  // Enhanced metadata
  version: z.string().optional(),
  license: z.string().optional(),
  keywords: z.array(z.string()).optional(),
  
  // Component specific configs
  framework: z.enum(["react", "vue", "svelte", "angular"]).default("react").optional(),
  styling: z.enum(["tailwind", "css", "styled-components", "emotion", "sass", "less"]).default("tailwind").optional(),
  
  // Access control
  public: z.boolean().default(true).optional(),
  premium: z.boolean().default(false).optional(),
  
  // Installation options
  installable: z.boolean().default(true).optional(),
  
  // Legacy support (for backward compatibility)
  subcategory: z.string().optional(),
  tags: z.array(z.string()).optional(),
  filesConfig: z.record(z.any()).optional(),
})

// Registry schema
export const registrySchema = z.object({
  name: z.string(),
  homepage: z.string(),
  version: z.string().optional(),
  description: z.string().optional(),
  author: z.string().optional(),
  repository: z.string().optional(),
  license: z.string().optional(),
  keywords: z.array(z.string()).optional(),
  items: z.array(registryItemSchema),
})

// Registry index schema
export const registryIndexSchema = z.array(registryItemSchema)

// Styles schema for theme variants
export const stylesSchema = z.array(
  z.object({
    name: z.string(),
    label: z.string(),
    description: z.string().optional(),
    preview: z.string().optional(),
  })
)

// Icons schema for icon libraries
export const iconsSchema = z.record(
  z.string(),
  z.record(z.string(), z.union([z.string(), z.object({
    svg: z.string(),
    viewBox: z.string().optional(),
    size: z.number().optional(),
  })]))
)

// Base color schema for theme colors
export const registryBaseColorSchema = z.object({
  inlineColors: z.object({
    light: z.record(z.string(), z.string()),
    dark: z.record(z.string(), z.string()),
  }),
  cssVars: registryItemCssVarsSchema,
  cssVarsV4: registryItemCssVarsSchema.optional(),
  inlineColorsTemplate: z.string(),
  cssVarsTemplate: z.string(),
})

// Resolved items tree for dependency resolution
export const registryResolvedItemsTreeSchema = registryItemSchema.pick({
  dependencies: true,
  devDependencies: true,
  files: true,
  tailwind: true,
  cssVars: true,
  css: true,
  envVars: true,
  docs: true,
})

// Registry configuration for multiple registries
export const registryConfigItemSchema = z.union([
  // Simple string format: "https://example.com/{name}.json"
  z.string().refine((s) => s.includes("{name}"), {
    message: "Registry URL must include {name} placeholder",
  }),
  // Advanced object format with auth and options
  z.object({
    url: z.string().refine((s) => s.includes("{name}"), {
      message: "Registry URL must include {name} placeholder",
    }),
    params: z.record(z.string(), z.string()).optional(),
    headers: z.record(z.string(), z.string()).optional(),
    auth: z.object({
      type: z.enum(["bearer", "basic", "apiKey"]),
      token: z.string().optional(),
      apiKey: z.string().optional(),
      username: z.string().optional(),
      password: z.string().optional(),
    }).optional(),
    timeout: z.number().default(30000).optional(),
    retries: z.number().default(3).optional(),
  }),
])

export const registryConfigSchema = z.record(
  z.string().refine((key) => key.startsWith("@"), {
    message: "Registry names must start with @ (e.g., @alphabyte, @shadcn)",
  }),
  registryConfigItemSchema
)

// Enhanced configuration schema
export const rawConfigSchema = z.object({
  $schema: z.string().optional(),
  style: z.string().default("default"),
  rsc: z.coerce.boolean().default(false),
  tsx: z.coerce.boolean().default(true),
  
  // Tailwind configuration
  tailwind: z.object({
    config: z.string().default("tailwind.config.js").optional(),
    css: z.string().default("app/globals.css"),
    baseColor: z.string().default("slate"),
    cssVariables: z.boolean().default(true),
    prefix: z.string().default("").optional(),
    darkMode: z.enum(["media", "class"]).default("class").optional(),
  }),
  
  // Icon library
  iconLibrary: z.enum(["lucide", "radix", "heroicons", "tabler", "feather"]).default("lucide").optional(),
  
  // Path aliases
  aliases: z.object({
    components: z.string().default("@/components"),
    utils: z.string().default("@/lib/utils"),
    ui: z.string().default("@/components/ui").optional(),
    lib: z.string().default("@/lib").optional(),
    hooks: z.string().default("@/hooks").optional(),
    icons: z.string().default("@/components/icons").optional(),
    types: z.string().default("@/lib/types").optional(),
  }),
  
  // Multiple registries support
  registries: registryConfigSchema.optional(),
  
  // Package manager preference
  packageManager: z.enum(["npm", "yarn", "pnpm", "bun", "deno"]).optional(),
}).strict()

// Full config with resolved paths
export const configSchema = rawConfigSchema.extend({
  resolvedPaths: z.object({
    cwd: z.string(),
    tailwindConfig: z.string(),
    tailwindCss: z.string(),
    utils: z.string(),
    components: z.string(),
    lib: z.string(),
    hooks: z.string(),
    ui: z.string(),
    icons: z.string().optional(),
    types: z.string().optional(),
  }),
})

// Workspace configuration for monorepos
export const workspaceConfigSchema = z.record(configSchema)

// Search functionality schemas
export const searchResultItemSchema = z.object({
  name: z.string(),
  type: z.string().optional(),
  description: z.string().optional(),
  registry: z.string(),
  addCommandArgument: z.string(),
  version: z.string().optional(),
  author: z.string().optional(),
  premium: z.boolean().default(false).optional(),
  categories: z.array(z.string()).optional(),
  keywords: z.array(z.string()).optional(),
})

export const searchResultsSchema = z.object({
  pagination: z.object({
    total: z.number(),
    offset: z.number(),
    limit: z.number(),
    hasMore: z.boolean(),
  }),
  items: z.array(searchResultItemSchema),
  facets: z.object({
    categories: z.record(z.string(), z.number()).optional(),
    types: z.record(z.string(), z.number()).optional(),
    registries: z.record(z.string(), z.number()).optional(),
  }).optional(),
})

// Registry index for discovery
export const registriesIndexSchema = z.record(
  z.string().regex(/^@[a-zA-Z0-9][a-zA-Z0-9-_]*$/),
  z.union([
    z.string(), // Simple URL
    z.object({
      url: z.string(),
      name: z.string(),
      description: z.string().optional(),
      official: z.boolean().default(false).optional(),
    })
  ])
)

// Component installation result
export const installationResultSchema = z.object({
  success: z.boolean(),
  component: z.string(),
  version: z.string().optional(),
  filesAdded: z.array(z.string()),
  filesUpdated: z.array(z.string()),
  dependenciesInstalled: z.array(z.string()),
  devDependenciesInstalled: z.array(z.string()).optional(),
  dependenciesFailed: z.array(z.string()).optional(),
  errors: z.array(z.string()).optional(),
  warnings: z.array(z.string()).optional(),
  installTime: z.number().optional(),
  registry: z.string().optional(),
})

// Component status tracking
export const componentStatusSchema = z.object({
  name: z.string(),
  type: z.string(),
  status: z.enum(['not-installed', 'partially-installed', 'installed', 'outdated']),
  version: z.string().optional(),
  installedVersion: z.string().optional(),
  registry: z.string().optional(),
  files: z.object({
    total: z.number(),
    installed: z.number(),
    missing: z.number(),
    existingFiles: z.array(z.string()),
    missingFiles: z.array(z.string()),
  }),
  dependencies: z.object({
    total: z.number(),
    installed: z.number(),
    missing: z.number(),
  }).optional(),
  lastUpdated: z.string().optional(),
})

// Export all types
export type RegistryItem = z.infer<typeof registryItemSchema>
export type RegistryItemFile = z.infer<typeof registryItemFileSchema>
export type Registry = z.infer<typeof registrySchema>
export type Config = z.infer<typeof configSchema>
export type RawConfig = z.infer<typeof rawConfigSchema>
export type InstallationResult = z.infer<typeof installationResultSchema>
export type ComponentStatus = z.infer<typeof componentStatusSchema>
export type SearchResults = z.infer<typeof searchResultsSchema>
export type SearchResultItem = z.infer<typeof searchResultItemSchema>
export type RegistryConfigItem = z.infer<typeof registryConfigItemSchema>

// Utility functions
export function detectFileType(filename: string): string {
  const ext = filename.split('.').pop()?.toLowerCase()
  const name = filename.toLowerCase()
  
  // Registry-prefixed types for better organization
  if (name.startsWith('use-') || name.includes('hook')) return 'registry:hook'
  if (name.includes('icon') || ext === 'svg') return 'registry:icon'
  if (name.includes('util') || name.includes('helper')) return 'registry:util'
  if (ext === 'ts' && name.includes('type')) return 'registry:type'
  if (ext === 'css' || ext === 'scss' || ext === 'sass') return 'registry:style'
  if (name.includes('config')) return 'registry:config'
  if (name.includes('page')) return 'registry:page'
  if (name.includes('layout')) return 'registry:layout'
  if (name.includes('api')) return 'registry:api'
  if (name.includes('block')) return 'registry:block'
  
  return 'registry:component'
}

export function getTargetDirForFileType(
  fileType: string, 
  config: Config
): string {
  switch (fileType) {
    case 'registry:hook':
    case 'hooks':
      return config.aliases.hooks || "@/hooks"
    case 'registry:util':
    case 'utils':
      return config.aliases.utils || "@/lib/utils"
    case 'registry:icon':
    case 'icons':
      return config.aliases.icons || `${config.aliases.components}/icons`
    case 'registry:type':
    case 'types':
      return config.aliases.types || `${config.aliases.lib}/types`
    case 'registry:style':
      return 'styles'
    case 'registry:config':
      return '.'
    case 'registry:page':
    case 'pages':
      return 'app'
    case 'registry:layout':
    case 'layouts':
      return 'app'
    case 'registry:api':
      return 'app/api'
    case 'registry:ui':
    case 'components':
      return config.aliases.ui || "@/components/ui"
    case 'registry:component':
    case 'registry:block':
    case 'blocks':
    default:
      return config.aliases.components || "@/components"
  }
}

// Validation helpers
export function validateRegistryItem(item: unknown): RegistryItem {
  return registryItemSchema.parse(item)
}

export function validateConfig(config: unknown): Config {
  return configSchema.parse(config)
}

export function validateRawConfig(config: unknown): RawConfig {
  return rawConfigSchema.parse(config)
}

export function validateRegistry(registry: unknown): Registry {
  return registrySchema.parse(registry)
}

// Registry URL helpers
export function resolveRegistryUrl(
  registryName: string,
  itemName: string,
  registries: Record<string, RegistryConfigItem>
): string {
  const registry = registries[registryName]
  if (!registry) {
    throw new Error(`Registry ${registryName} not found`)
  }
  
  if (typeof registry === 'string') {
    return registry.replace('{name}', itemName)
  }
  
  return registry.url.replace('{name}', itemName)
}

// Component name helpers
export function parseComponentName(name: string): {
  registry: string | null
  component: string
} {
  if (name.startsWith('@')) {
    const [registry, component] = name.split('/')
    return { registry, component }
  }
  
  return { registry: null, component: name }
}