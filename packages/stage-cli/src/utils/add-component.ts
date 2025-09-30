import fsExtra from "fs-extra"
import path from "path"
import {
  Config,
  detectFileType,
  getTargetDirForFileType,
  RegistryItem,
  RegistryItemFile
} from "../schema/index.js"
import { logger } from "./logger.js"
import { getPackageManager, installDependencies } from "./package-manager.js"


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
    if (!component.files?.length) {
      if (!silent) logger.warn(`Component ${component.name} has no files`)
      return
    }

    const filesToAdd: string[] = []
    const filesToUpdate: string[] = []
    const fileOperations: Array<{
      file: string
      targetDir: string
      action: 'add' | 'update'
    }> = []

    for (const file of component.files) {
      let targetDir: string

      if ((file as any).target) {
        targetDir = (file as any).target as string
      } else if (targetPath) {
        targetDir = targetPath
      } else {
        targetDir = determineTargetDirectory(component, file, config)
      }

      const fullTargetDir = path.resolve(cwd, targetDir.replace("@/", ""))
      const fileName = path.basename(file.path)
      const filePath = path.join(fullTargetDir, fileName)

      let fileAction: 'add' | 'update' = 'add'
      const exists = await fsExtra.pathExists(filePath)
      if (exists) {
        fileAction = 'update'
        if (!overwrite) {
          if (!silent) {
            logger.warn(`📄 File ${fileName} already exists. Use --overwrite to replace it.`)
          }
          continue
        }
        filesToUpdate.push(fileName)
      } else {
        filesToAdd.push(fileName)
      }

      await fsExtra.ensureDir(fullTargetDir)

      const processedContent = processFileContent(file.content || "", config, component)
      await fsExtra.writeFile(filePath, processedContent)

      fileOperations.push({ file: fileName, targetDir, action: fileAction })

      if (!silent) {
        const actionIcon = fileAction === 'add' ? '✅' : '🔄'
        const actionText = fileAction === 'add' ? 'Added' : 'Updated'
        logger.success(`${actionIcon} ${actionText}: ${fileName} → ${targetDir}`)
      }
    }

    await ensureRequiredDirectories(component, config, cwd, { silent })

    let dependenciesResult = { success: true, installed: [] as string[], failed: [] as string[] }
    if (component.dependencies && component.dependencies.length > 0) {
      const res = await installDependenciesForComponent(
        component.dependencies,
        cwd,
        { silent }
      )
      if (res) {
        dependenciesResult = {
          success: (res as any).success,
          installed: (res as any).installed || [],
          failed: (res as any).failed || []
        }
      }
    }

    let devDependenciesResult = { success: true, installed: [] as string[], failed: [] as string[] }
    if (component.devDependencies && component.devDependencies.length > 0) {
      const res = await installDependenciesForComponent(
        component.devDependencies,
        cwd,
        { silent, dev: true }
      )
      if (res) {
        devDependenciesResult = {
          success: (res as any).success,
          installed: (res as any).installed || [],
          failed: (res as any).failed || []
        }
      }
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
  const fileType = (file as any).type || detectFileType(file.path)

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
  const dirsToCreate = new Set<string>()

  // Add standard directories based on file types
  for (const file of (component.files ?? [])) {
    const filePath = file.path || (file as any).name
    const fileType = file.type || detectFileType(filePath)
    const targetDir = getTargetDirForFileType(fileType, config)
    dirsToCreate.add(targetDir)
  }

  // Create directories
  for (const dir of dirsToCreate) {
    const fullPath = path.resolve(cwd, dir.replace("@/", ""))
    try {
      await fsExtra.ensureDir(fullPath)
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

  for (const file of (component.files ?? [])) {
    const targetDir = determineTargetDirectory(component, file, config)
    const fullTargetDir = path.resolve(cwd, targetDir.replace("@/", ""))
    const filePath = path.join(fullTargetDir, path.basename(file.path))

    try {
      await fsExtra.access(filePath)
      existingFiles.push(file.path)
    } catch {
      missingFiles.push(file.path)
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
    (component.files ?? []).map(file => determineTargetDirectory(component, file, config))
  ))

  return {
    name: component.name,
    type: component.type,
    description: component.description,
    files: (component.files ?? []).length,
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

  // Remove component files
  for (const file of (component.files ?? [])) {
    const targetDir = determineTargetDirectory(component, file, config)
    const fullTargetDir = path.resolve(cwd, targetDir.replace("@/", ""))
    const filePath = path.join(fullTargetDir, path.basename(file.path))

    try {
      await fsExtra.unlink(filePath)
      removedFiles.push(file.path)

      if (!silent) {
        logger.info(`🗑️  Removed: ${file.path}`)
      }
    } catch (error) {
      failedFiles.push(file.path)

      if (!silent) {
        logger.warn(`⚠️  Failed to remove: ${file.path}`)
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