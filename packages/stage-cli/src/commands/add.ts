
import { getRegistry } from "@/registry/get-registry.js"
import { getRegistryPath } from "@/registry/index.js"
import { createConfig, getConfig } from "@/utils/config.js"
import { Command } from "commander"
import { promises as fs } from "fs"
import path from "path"
import {
  Config,
  detectFileType,
  getTargetDirForFileType,
  RegistryItem,
  RegistryItemFile
} from "../schema/index.js"
import { logger } from "../utils/logger.js"
import { getPackageManager, installDependencies } from "../utils/package-manager.js"
import { isNextAppPresent, scaffoldNextApp } from "../utils/scaffold.js"

/**
 * Process file content to replace placeholders and apply config
 */

function processFileContent(
  content: string,
  config: Config,
  component: RegistryItem
): string {
  let processedContent = content

  // Replace import aliases based on config
  const aliases = config.aliases

  // Replace @/ aliases
  Object.entries(aliases).forEach(([alias, aliasPath]) => {
    if (aliasPath) {
      const pattern = new RegExp(`from ["']@/${alias}`, "g")
      processedContent = processedContent.replace(pattern, `from "${aliasPath}`)

      const importPattern = new RegExp(`import\\s+.*\\s+from\\s+["']@/${alias}`, "g")
      processedContent = processedContent.replace(importPattern, match =>
        match.replace(`@/${alias}`, aliasPath)
      )
    }
  })

  // Replace Tailwind prefix if configured
  if (config.tailwind?.prefix) {
    const prefix = config.tailwind.prefix
    // Replace className patterns
    processedContent = processedContent.replace(
      /className={`([^`]*)`}/g,
      (match, classes) => {
        const prefixedClasses = classes
          .split(' ')
          .map((cls: string) => cls.trim() ? `${prefix}${cls}` : cls)
          .join(' ')
        return `className={\`${prefixedClasses}\`}`
      }
    )

    processedContent = processedContent.replace(
      /className="([^"]*)"/g,
      (match, classes) => {
        const prefixedClasses = classes
          .split(' ')
          .map((cls: string) => cls.trim() ? `${prefix}${cls}` : cls)
          .join(' ')
        return `className="${prefixedClasses}"`
      }
    )
  }

  // Replace color scheme based on config
  if (config.tailwind?.baseColor && config.tailwind.baseColor !== "slate") {
    processedContent = processedContent.replace(
      /slate-(\d+)/g,
      `${config.tailwind.baseColor}-$1`
    )
  }

  // Replace icon imports based on icon library
  if (config.iconLibrary) {
    switch (config.iconLibrary) {
      case "lucide":
        processedContent = processedContent.replace(
          /from ["']@radix-ui\/react-icons["']/g,
          'from "lucide-react"'
        )
        processedContent = processedContent.replace(
          /from ["']@heroicons\/react\/[\w\/]+["']/g,
          'from "lucide-react"'
        )
        break
      case "radix":
        processedContent = processedContent.replace(
          /from ["']lucide-react["']/g,
          'from "@radix-ui/react-icons"'
        )
        processedContent = processedContent.replace(
          /from ["']@heroicons\/react\/[\w\/]+["']/g,
          'from "@radix-ui/react-icons"'
        )
        break
      case "heroicons":
        processedContent = processedContent.replace(
          /from ["']lucide-react["']/g,
          'from "@heroicons/react/24/outline"'
        )
        processedContent = processedContent.replace(
          /from ["']@radix-ui\/react-icons["']/g,
          'from "@heroicons/react/24/outline"'
        )
        break
    }
  }

  // Component-specific replacements
  if (component.name) {
    processedContent = processedContent.replace(
      /\{\{COMPONENT_NAME\}\}/g,
      component.name
    )
  }

  // Add CSS variables support if enabled
  if (config.tailwind?.cssVariables) {
    // This would need more sophisticated processing
    // For now, just ensure HSL format is used
    processedContent = processedContent.replace(
      /bg-primary/g,
      'bg-primary'
    )
  }

  return processedContent
}


export async function addComponent(
  component: RegistryItem,
  config: Config,
  cwd: string,
  options: {
    overwrite?: boolean
    silent?: boolean
    targetPath?: string
  } = {}
) {
  const { overwrite = false, silent = false, targetPath } = options

  try {
    // Track files that will be added/updated
    const filesToAdd: string[] = []
    const filesToUpdate: string[] = []
    const fileOperations: Array<{
      file: string
      targetDir: string
      action: 'add' | 'update'
    }> = []

    // Process component files with intelligent directory detection
    if (!component.files?.length) {
      return
    }
    for (const file of component.files) {
      // Determine target directory for this specific file
      let targetDir: string

      if (file.target) {
        // Use explicit target from file config
        targetDir = file.target
      } else if (targetPath) {
        // Use explicit target path from options
        targetDir = targetPath
      } else {
        // Smart detection based on component type and file characteristics
        targetDir = determineTargetDirectory(component, file, config)
      }

      const fullTargetDir = path.resolve(cwd, targetDir.replace("@/", ""))
      const fileName = path.basename(file.path)
      const filePath = path.join(fullTargetDir, fileName)

      // Check if file exists
      let fileAction: 'add' | 'update' = 'add'
      try {
        await fs.access(filePath)
        fileAction = 'update'
        if (!overwrite) {
          if (!silent) {
            logger.warn(`📄 File ${fileName} already exists. Use --overwrite to replace it.`)
          }
          continue
        }
        filesToUpdate.push(fileName)
      } catch {
        // File doesn't exist
        filesToAdd.push(fileName)
      }

      // Ensure directory exists
      await fs.mkdir(fullTargetDir, { recursive: true })

      // Process file content with config substitutions
      const fileContent = file.content || ""
      const processedContent = processFileContent(fileContent, config, component)
      await fs.writeFile(filePath, processedContent, "utf8")

      fileOperations.push({
        file: fileName,
        targetDir,
        action: fileAction
      })

      if (!silent) {
        const actionIcon = fileAction === 'add' ? '✅' : '🔄'
        const actionText = fileAction === 'add' ? 'Added' : 'Updated'
        logger.success(`${actionIcon} ${actionText}: ${fileName} → ${targetDir}`)
      }
    }

    // Create additional directories if needed
    await ensureRequiredDirectories(component, config, cwd, { silent })

    // Include ancillary assets for specific components (e.g., CSS for pre)
    if (component.name === "pre") {
      const stylesDir = path.resolve(cwd, "styles")
      const prismCssTarget = path.join(stylesDir, "prism-theme.css")
      try {
        await fs.access(prismCssTarget)
      } catch {
        try {
          const registryBase = await getRegistryPath()
          const assetPath = path.join(registryBase, "assets", "styles", "prism-theme.css")
          // Fallback minimal theme if asset not bundled
          let cssContent = `:root{--code-background:#1e1e1e;--code-text-color:#e8e8e8}pre[class*="language-"]{background:var(--code-background);color:var(--code-text-color);padding:0.8rem;border-radius:8px;overflow:auto}`
          try {
            const buf = await fs.readFile(assetPath, "utf8")
            if (buf && buf.length > 0) cssContent = buf
          } catch {}
          await fs.mkdir(stylesDir, { recursive: true })
          await fs.writeFile(prismCssTarget, cssContent, "utf8")
          if (!silent) {
            logger.success(`✅ Added CSS asset: styles/prism-theme.css`)
          }
        } catch (e) {
          if (!silent) {
            logger.warn("⚠️  Failed to add prism-theme.css automatically. Please create styles/prism-theme.css")
          }
        }
      }
    }

    // Install dependencies
    let dependenciesResult = { success: true, installed: [], failed: [] }
    if (component.dependencies && component.dependencies.length > 0) {
      const res = await installDependenciesForComponent(
        component.dependencies,
        cwd,
        { silent }
      )
      dependenciesResult = res
        ? { success: (res as any).success, installed: (res as any).installed || [], failed: (res as any).failed || [] }
        : { success: true, installed: [], failed: [] }
    }

    // Install dev dependencies
    let devDependenciesResult = { success: true, installed: [], failed: [] }
    if (component.devDependencies && component.devDependencies.length > 0) {
      const res = await installDependenciesForComponent(
        component.devDependencies,
        cwd,
        { silent, dev: true }
      )
      devDependenciesResult = res
        ? { success: (res as any).success, installed: (res as any).installed || [], failed: (res as any).failed || [] }
        : { success: true, installed: [], failed: [] }
    }

    const result = {
      success: true,
      component: component.name,
      filesAdded: filesToAdd,
      filesUpdated: filesToUpdate,
      fileOperations,
      dependenciesInstalled: [...dependenciesResult.installed, ...devDependenciesResult.installed],
      dependenciesFailed: [...dependenciesResult.failed, ...devDependenciesResult.failed],
      totalFiles: filesToAdd.length + filesToUpdate.length,
      totalDependencies: (component.dependencies?.length || 0) + (component.devDependencies?.length || 0)
    }

    if (!silent && result.totalFiles > 0) {
      logger.success(`🎉 Successfully processed ${component.name} (${result.totalFiles} files)`)
    }

    return result

  } catch (error) {
    if (!silent) {
      logger.error(`❌ Failed to add component ${component.name}:`, error)
    }
    throw error
  }
}

/**
 * Determine the appropriate target directory for a file
 */
function determineTargetDirectory(
  component: RegistryItem,
  file: RegistryItemFile,
  config: Config
): string {
  // If file has explicit type, use it
  const fileType = (file as any).type || detectFileType((file as any).path)

  // For blocks, use app directory structure
  if (component.type === "blocks") {
    if (file.path.includes('/')) {
      // Preserve directory structure for blocks
      const dir = path.dirname(file.path)
      return path.join("app", component.name, dir)
    }
    return `app/${component.name}`
  }

  // For other component types, use file type detection
  switch (fileType) {
    case 'registry:hook':
      return config.aliases.hooks || "@/hooks"
    case 'registry:util':
      return config.aliases.lib || "@/lib"
    case 'registry:icon':
      return config.aliases.icons || path.join(config.aliases.components, "icons")
    case 'registry:type':
      return config.aliases.types || path.join(config.aliases.lib || "@/lib", "types")
    case 'registry:style':
      return 'styles'
    case 'registry:config':
      return '.'
    case 'registry:page':
      return 'app'
    case 'registry:layout':
      return 'app'
    case 'registry:api':
      return 'app/api'
    case 'registry:component':
    default:
      // Main components go to UI directory
      if (component.type === "components") {
        return config.aliases.ui || "@/components/ui"
      }
      return config.aliases.components || "@/components"
  }
}

/**
 * Ensure required directories exist for component
 */
async function ensureRequiredDirectories(
  component: RegistryItem,
  config: Config,
  cwd: string,
  options: { silent?: boolean } = {}
): Promise<void> {
  if (!component.files || component.files.length === 0) {
    return
  }

  const dirsToCreate = new Set<string>()

  // Add standard directories based on file types
  for (const file of component.files) {
    const filePath = file.path || (file as any).name
    const fileType = file.type || detectFileType(filePath)
    const targetDir = getTargetDirForFileType(fileType, config)
    dirsToCreate.add(targetDir)
  }

  // Create directories
  for (const dir of dirsToCreate) {
    const fullPath = path.resolve(cwd, dir.replace("@/", ""))
    try {
      await fs.mkdir(fullPath, { recursive: true })
      if (!options.silent) {
        logger.debug(`📁 Ensured directory: ${dir}`)
      }
    } catch (error) {
      if (!options.silent) {
        logger.warn(`⚠️  Failed to create directory ${dir}:`, error)
      }
    }
  }
}



/**
 * Install dependencies for a component with enhanced error handling
 */
async function installDependenciesForComponent(
  dependencies: string[],
  cwd: string,
  options: {
    silent?: boolean
    dev?: boolean
    exact?: boolean
  } = {}
) {
  const { silent = false, dev = false, exact = false } = options

  if (dependencies.length === 0) {
    return
  }

  try {
    if (!silent) {
      const depType = dev ? "dev dependencies" : "dependencies"
      logger.info(`📦 Installing ${depType}: ${dependencies.join(", ")}`)
    }

    // Use enhanced package manager
    await installDependencies(dependencies, cwd, {
      dev,
      exact,
      silent
    })

    if (!silent) {
      logger.success(`✅ Successfully installed ${dependencies.length} ${dev ? "dev " : ""}dependencies`)
    }

    return { success: true, installed: dependencies }

  } catch (error) {
    // Get package manager for manual installation message
    const packageManager = await getPackageManager(cwd, { withFallback: true })

    const depType = dev ? "dev dependencies" : "dependencies"
    logger.warn(`⚠️  Failed to install ${depType}: ${dependencies.join(", ")}`)

    if (!silent) {
      logger.info("💡 Please install them manually:")

      // Show appropriate command based on package manager
      if (packageManager === "npm") {
        const flag = dev ? "--save-dev" : ""
        const exactFlag = exact ? "--save-exact" : ""
        logger.info(`npm install ${flag} ${exactFlag} ${dependencies.join(" ")}`.trim())
      } else if (packageManager === "yarn") {
        const flag = dev ? "--dev" : ""
        const exactFlag = exact ? "--exact" : ""
        logger.info(`yarn add ${flag} ${exactFlag} ${dependencies.join(" ")}`.trim())
      } else if (packageManager === "pnpm") {
        const flag = dev ? "-D" : ""
        const exactFlag = exact ? "--save-exact" : ""
        logger.info(`pnpm add ${flag} ${exactFlag} ${dependencies.join(" ")}`.trim())
      } else if (packageManager === "bun") {
        const flag = dev ? "-D" : ""
        logger.info(`bun add ${flag} ${dependencies.join(" ")}`)
      } else if (packageManager === "deno") {
        logger.info(`deno add ${dependencies.join(" ")}`)
      }
    }

    // Return partial success - component files are installed, dependencies failed
    return {
      success: false,
      installed: [],
      failed: dependencies,
      error: error instanceof Error ? error.message : String(error)
    }
  }
}

/**
 * Batch install multiple component dependencies
 */
export async function batchInstallDependencies(
  components: RegistryItem[],
  cwd: string,
  options: {
    silent?: boolean
    exact?: boolean
  } = {}
): Promise<{
  success: boolean
  installed: string[]
  failed: string[]
}> {
  const { silent = false, exact = false } = options

  // Collect all unique dependencies
  const allDependencies = new Set<string>()
  const allDevDependencies = new Set<string>()

  components.forEach(component => {
    component.dependencies?.forEach(dep => allDependencies.add(dep))
    component.devDependencies?.forEach(dep => allDevDependencies.add(dep))
  })

  const dependencies = Array.from(allDependencies)
  const devDependencies = Array.from(allDevDependencies)

  const results = {
    success: true,
    installed: [] as string[],
    failed: [] as string[]
  }

  // Install runtime dependencies
  if (dependencies.length > 0) {
    try {
      await installDependencies(dependencies, cwd, { exact, silent })
      results.installed.push(...dependencies)
    } catch (error) {
      results.success = false
      results.failed.push(...dependencies)

      if (!silent) {
        logger.warn(`Failed to install dependencies: ${dependencies.join(", ")}`)
      }
    }
  }

  // Install dev dependencies
  if (devDependencies.length > 0) {
    try {
      await installDependencies(devDependencies, cwd, { dev: true, exact, silent })
      results.installed.push(...devDependencies)
    } catch (error) {
      results.success = false
      results.failed.push(...devDependencies)

      if (!silent) {
        logger.warn(`Failed to install dev dependencies: ${devDependencies.join(", ")}`)
      }
    }
  }

  return results
}

/**
 * Check if component files already exist
 */
export async function checkComponentExists(
  component: RegistryItem,
  config: Config,
  cwd: string
): Promise<{
  exists: boolean
  existingFiles: string[]
  missingFiles: string[]
}> {
  const existingFiles: string[] = []
  const missingFiles: string[] = []

  if (!component.files || component.files.length === 0) {
    return { exists: false, existingFiles, missingFiles }
  }

  for (const file of component.files) {
    const filePath = file.path || (file as any).name
    const targetDir = determineTargetDirectory(component, file, config)
    const fullTargetDir = path.resolve(cwd, targetDir.replace("@/", ""))
    const fullFilePath = path.join(fullTargetDir, path.basename(filePath))

    try {
      await fs.access(fullFilePath)
      existingFiles.push(filePath)
    } catch {
      missingFiles.push(filePath)
    }
  }

  return {
    exists: existingFiles.length > 0,
    existingFiles,
    missingFiles
  }
}

/**
 * Get component info with file status
 */
export async function getComponentInfo(
  component: RegistryItem,
  config: Config,
  cwd: string
): Promise<{
  name: string
  type: string
  description?: string
  files: number
  dependencies: number
  devDependencies: number
  targetDirs: string[]
  status: 'not-installed' | 'partially-installed' | 'installed'
  existingFiles: string[]
  missingFiles: string[]
}> {
  const fileStatus = await checkComponentExists(component, config, cwd)

  let status: 'not-installed' | 'partially-installed' | 'installed'

  if (fileStatus.existingFiles.length === 0) {
    status = 'not-installed'
  } else if (fileStatus.missingFiles.length === 0) {
    status = 'installed'
  } else {
    status = 'partially-installed'
  }

  // Get all target directories for this component
  const targetDirs = Array.from(new Set(
    component.files?.map(file => determineTargetDirectory(component, file, config)) || []
  ))

  return {
    name: component.name,
    type: component.type,
    description: component.description,
    files: component.files?.length || 0,
    dependencies: component.dependencies?.length || 0,
    devDependencies: component.devDependencies?.length || 0,
    targetDirs,
    status,
    existingFiles: fileStatus.existingFiles,
    missingFiles: fileStatus.missingFiles
  }
}

/**
 * Remove a component and its files
 */
export async function removeComponent(
  component: RegistryItem,
  config: Config,
  cwd: string,
  options: {
    silent?: boolean
    removeDependencies?: boolean
  } = {}
): Promise<{
  success: boolean
  removedFiles: string[]
  failedFiles: string[]
}> {
  const { silent = false, removeDependencies = false } = options

  const removedFiles: string[] = []
  const failedFiles: string[] = []

  if (!component.files || component.files.length === 0) {
    if (!silent) {
      logger.warn(`Component ${component.name} has no files to remove`)
    }
    return { success: true, removedFiles, failedFiles }
  }

  // Remove component files
  for (const file of component.files) {
    const filePath = file.path || (file as any).name
    const targetDir = determineTargetDirectory(component, file, config)
    const fullTargetDir = path.resolve(cwd, targetDir.replace("@/", ""))
    const fullFilePath = path.join(fullTargetDir, path.basename(filePath))

    try {
      await fs.unlink(fullFilePath)
      removedFiles.push(filePath)

      if (!silent) {
        logger.info(`🗑️  Removed: ${filePath}`)
      }
    } catch (error) {
      failedFiles.push(filePath)

      if (!silent) {
        logger.warn(`⚠️  Failed to remove: ${filePath}`)
      }
    }
  }

  // TODO: Implement dependency removal if requested
  // This would require checking if dependencies are used by other components
  if (removeDependencies) {
    if (!silent) {
      logger.warn("🚧 Automatic dependency removal not yet implemented")
      logger.info("💡 Please remove unused dependencies manually")
    }
  }

  return {
    success: failedFiles.length === 0,
    removedFiles,
    failedFiles
  }
}

export const add = new Command()
  .name("add")
  .description("Add a component or block to your project")
  .argument("[components...]", "names of components or blocks to add")
  .option("-y, --yes", "Skip confirmation prompt.", false)
  .option("-o, --overwrite", "Overwrite existing files.", false)
  .option("-c, --cwd <cwd>", "The working directory. defaults to the current directory.", process.cwd())
  .option("-a, --all", "Add all available components and blocks", false)
  .option("-p, --path <path>", "The path to add the component to.")
  .option("-s, --silent", "Mute output.", false)
  .action(async (componentsArg: string[] | undefined, options) => {
    const cwd = options.cwd || process.cwd()
    const overwrite: boolean = !!options.overwrite
    const all: boolean = !!options.all
    const targetPath: string | undefined = options.path
    const silent: boolean = !!options.silent

    // Ensure Next.js app exists; if not, scaffold automatically
    const hasNext = await isNextAppPresent(cwd)
    if (!hasNext) {
      if (!silent) {
        logger.info("No Next.js app detected. Scaffolding a new Next.js (App Router) project...")
      }
      await scaffoldNextApp(cwd)
    }

    // Ensure config exists (auto-initialize minimal if missing)
    let config = await getConfig(cwd)
    if (!config) {
      if (!silent) {
        logger.info("No components.json found. Creating default configuration...")
      }
      const defaultConfig: any = {
        rsc: true,
        tsx: true,
        tailwind: {
          config: "tailwind.config.js",
          css: "app/globals.css",
          baseColor: "slate",
          cssVariables: true,
          prefix: "",
        },
        aliases: {
          components: "@/components",
          utils: "@/lib/utils",
          ui: "@/components/ui",
          lib: "@/lib",
          hooks: "@/hooks",
        },
        iconLibrary: "lucide",
      }
      await createConfig(defaultConfig, cwd)
      await fs.mkdir(path.join(cwd, "components", "ui"), { recursive: true })
      await fs.mkdir(path.join(cwd, "lib"), { recursive: true })
      const utilsPath = path.join(cwd, "lib", "utils.ts")
      try { await fs.access(utilsPath) } catch {
        const utilsContent = `import { type ClassValue, clsx } from "clsx"\nimport { twMerge } from "tailwind-merge"\n\nexport function cn(...inputs: ClassValue[]) {\n  return twMerge(clsx(inputs))\n}\n`
        await fs.writeFile(utilsPath, utilsContent, "utf8")
      }
      // Ensure core runtime deps for utils.ts are installed
      try {
        await installDependencies(["clsx", "tailwind-merge", "class-variance-authority"], cwd, { silent: true })
        if (!silent) {
          logger.success("Installed core dependencies: clsx, tailwind-merge, class-variance-authority")
        }
      } catch (e) {
        if (!silent) {
          logger.warn("Failed to auto-install core dependencies. Please install: clsx tailwind-merge class-variance-authority")
        }
      }
      config = await getConfig(cwd)
      if (!silent) {
        logger.success("Default configuration created.")
      }
    }

    // Resolve components to add
    let toAdd: string[] = []
    const registry = await getRegistry()
    if (all) {
      toAdd = registry.items.map(i => i.name)
    } else if (Array.isArray(componentsArg) && componentsArg.length > 0) {
      toAdd = componentsArg
    } else {
      if (!silent) {
        logger.info("No components specified. Use --all or provide names.")
      }
      return
    }

    // Add each
    for (const name of toAdd) {
      const item = registry.items.find(i => i.name === name)
      if (!item) {
        if (!silent) logger.warn(`Component "${name}" not found in registry`)
        continue
      }
      await addComponent(item, config as any, cwd, { overwrite, silent, targetPath })
    }

    if (!silent) {
      logger.success(`Successfully added ${toAdd.length} component(s)`)
    }
  })