import { Command } from "commander"
import { promises as fs } from "fs"
import ora from "ora"
import path from "path"
import prompts from "prompts"
import { z } from "zod"
import { isNextAppPresent, scaffoldNextApp } from "../utils/scaffold.js"
import { configExists, createConfig } from "../utils/config.js"
import { logger } from "../utils/logger.js"
import {
  getPackageManager,
  installDependencies,
  getAvailablePackageManagers,
  runInstall,
  hasLockfile
} from "../utils/package-manager.js"

const initOptionsSchema = z.object({
  cwd: z.string(),
  yes: z.boolean(),
  default: z.boolean(),
  baseColor: z.string().optional(),
  css: z.string().optional(),
  tailwindConfig: z.string().optional(),
  tailwindCss: z.string().optional(),
  components: z.string().optional(),
  utils: z.string().optional(),
  ui: z.string().optional(),
  lib: z.string().optional(),
  hooks: z.string().optional(),
  iconLibrary: z.enum(["lucide", "radix", "heroicons"]).optional(),
  packageManager: z.enum(["npm", "yarn", "pnpm", "bun", "deno"]).optional(),
})

export const init = new Command()
  .name("init")
  .description("Initialize your project and install dependencies")
  .option("-y, --yes", "Skip confirmation prompt.", false)
  .option("--default", "Skip all prompts and use defaults.", false)
  .option("-c, --cwd <cwd>", "The working directory. defaults to the current directory.", process.cwd())
  .option("--base-color <baseColor>", "The base color.", "slate")
  .option("--css <css>", "The CSS file to use.", "app/globals.css")
  .option("--tailwind-config <tailwindConfig>", "The tailwind config file.", "tailwind.config.js")
  .option("--tailwind-css <tailwindCss>", "The tailwind css file.", "app/globals.css")
  .option("--components <components>", "The components directory.", "@/components")
  .option("--utils <utils>", "The utils directory.", "@/lib/utils")
  .option("--ui <ui>", "The ui directory.", "@/components/ui")
  .option("--lib <lib>", "The lib directory.", "@/lib")
  .option("--hooks <hooks>", "The hooks directory.", "@/hooks")
  .option("--icon-library <iconLibrary>", "The icon library to use.", "lucide")
  .option("--package-manager <packageManager>", "The package manager to use.")
  .action(async (options) => {
    const opts = initOptionsSchema.parse(options)

    try {
      await runInit(opts)
    } catch (error) {
      logger.error("Failed to initialize project:", error)
      process.exit(1)
    }
  })

async function runInit(options: z.infer<typeof initOptionsSchema>) {
  const { cwd, yes, default: useDefaults } = options
  // If not a Next.js app, scaffold one first
  if (!(await isNextAppPresent(cwd))) {
    logger.info("No Next.js app detected. Scaffolding Next.js (App Router) with Tailwind...")
    await scaffoldNextApp(cwd)
  }

  // Check if config already exists
  if (await configExists(cwd)) {
    if (!yes && !useDefaults) {
      const { overwrite } = await prompts({
        type: "confirm",
        name: "overwrite",
        message: "components.json already exists. Do you want to overwrite it?",
        initial: false,
      })

      if (!overwrite) {
        logger.info("Initialization cancelled.")
        return
      }
    }
  }

  // Detect or choose package manager
  let selectedPackageManager = options.packageManager
  if (!selectedPackageManager && !useDefaults && !yes) {
    const availableManagers = await getAvailablePackageManagers()
    const detectedManager = await getPackageManager(cwd, { withFallback: false })

    if (availableManagers.length > 1) {
      const { packageManager } = await prompts({
        type: "select",
        name: "packageManager",
        message: `Which package manager would you like to use? (detected: ${detectedManager || 'none'})`,
        choices: availableManagers.map(pm => ({
          title: pm === detectedManager ? `${pm} (detected)` : pm,
          value: pm
        })),
        initial: detectedManager ? availableManagers.indexOf(detectedManager) : 0,
      })
      selectedPackageManager = packageManager
    } else {
      selectedPackageManager = detectedManager
    }
  }

  if (!selectedPackageManager) {
    selectedPackageManager = await getPackageManager(cwd, { withFallback: true })
  }

  logger.info(`Using package manager: ${selectedPackageManager}`)

  let config: any = {}

  if (!useDefaults && !yes) {
    const responses = await prompts([
      {
        type: "select",
        name: "baseColor",
        message: "Which color would you like to use as base color?",
        choices: [
          { title: "Slate", value: "slate" },
          { title: "Gray", value: "gray" },
          { title: "Zinc", value: "zinc" },
          { title: "Neutral", value: "neutral" },
          { title: "Stone", value: "stone" },
        ],
        initial: 0,
      },
      {
        type: "text",
        name: "css",
        message: "Where is your global CSS file?",
        initial: "app/globals.css",
      },
      {
        type: "text",
        name: "tailwindConfig",
        message: "Where is your tailwind.config.js located?",
        initial: "tailwind.config.js",
      },
      {
        type: "text",
        name: "components",
        message: "Configure the import alias for components:",
        initial: "@/components",
      },
      {
        type: "text",
        name: "utils",
        message: "Configure the import alias for utils:",
        initial: "@/lib/utils",
      },
      {
        type: "text",
        name: "ui",
        message: "Configure the import alias for ui:",
        initial: "@/components/ui",
      },
      {
        type: "text",
        name: "lib",
        message: "Configure the import alias for lib:",
        initial: "@/lib",
      },
      {
        type: "text",
        name: "hooks",
        message: "Configure the import alias for hooks:",
        initial: "@/hooks",
      },
      {
        type: "select",
        name: "iconLibrary",
        message: "Which icon library would you like to use?",
        choices: [
          { title: "Lucide", value: "lucide" },
          { title: "Radix", value: "radix" },
          { title: "Heroicons", value: "heroicons" },
        ],
        initial: 0,
      },
    ])

    config = {
      rsc: true,
      tsx: true,
      tailwind: {
        config: responses.tailwindConfig,
        css: responses.css,
        baseColor: responses.baseColor,
        cssVariables: true,
        prefix: "",
      },
      aliases: {
        components: responses.components,
        utils: responses.utils,
        ui: responses.ui,
        lib: responses.lib,
        hooks: responses.hooks,
      },
      iconLibrary: responses.iconLibrary,
      packageManager: selectedPackageManager,
    }
  } else {
    // Use provided options or defaults
    config = {
      rsc: true,
      tsx: true,
      tailwind: {
        config: options.tailwindConfig || "tailwind.config.js",
        css: options.tailwindCss || "app/globals.css",
        baseColor: options.baseColor || "slate",
        cssVariables: true,
        prefix: "",
      },
      aliases: {
        components: options.components || "@/components",
        utils: options.utils || "@/lib/utils",
        ui: options.ui || "@/components/ui",
        lib: options.lib || "@/lib",
        hooks: options.hooks || "@/hooks",
      },
      iconLibrary: options.iconLibrary || "lucide",
      packageManager: selectedPackageManager,
    }
  }

  // Create components.json
  const configPath = await createConfig(config, cwd)

  logger.success(`Configuration saved to ${configPath}`)

  // Create necessary directories and files
  await createProjectFiles(cwd, config)

  // Install dependencies
  await installProjectDependencies(cwd, config, selectedPackageManager)

  logger.success("🎉 Project initialized successfully!")
  logger.info("\n📋 Next steps:")
  logger.info("1. Add components: alphabyte add [component-name]")
  logger.info("2. Browse registry: alphabyte list")
  logger.info("3. Update components: alphabyte update")
}

async function createProjectFiles(cwd: string, config: any) {
  const spinner = ora("Creating project structure...").start()

  try {
    // Create lib directory
    const libDir = path.join(cwd, "lib")
    await fs.mkdir(libDir, { recursive: true })

    // Create utils.ts file
    const utilsContent = `import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
`

    const utilsPath = path.join(libDir, "utils.ts")

    // Only create utils.ts if it doesn't exist
    try {
      await fs.access(utilsPath)
      spinner.text = "utils.ts already exists, skipping..."
    } catch {
      await fs.writeFile(utilsPath, utilsContent)
      spinner.text = "Created utils.ts..."
    }

    // Create components directory
    const componentsDir = path.join(cwd, "components")
    await fs.mkdir(componentsDir, { recursive: true })

    // Create ui directory
    const uiDir = path.join(componentsDir, "ui")
    await fs.mkdir(uiDir, { recursive: true })

    // Create hooks directory if specified
    if (config.aliases.hooks) {
      const hooksDir = path.join(cwd, "hooks")
      await fs.mkdir(hooksDir, { recursive: true })
    }

    spinner.succeed("✅ Project structure created")
  } catch (error) {
    spinner.fail("❌ Failed to create project structure")
    logger.warn("Failed to create some project files:", error)
  }
}

async function installProjectDependencies(
  cwd: string,
  config: any,
  packageManager: string
) {
  const spinner = ora("Installing dependencies...").start()

  try {
    // Check if package.json exists
    const packageJsonPath = path.join(cwd, "package.json")
    let hasPackageJson = false

    try {
      await fs.access(packageJsonPath)
      hasPackageJson = true
    } catch {
      // package.json doesn't exist, we'll need to create one or warn user
      spinner.warn("⚠️  No package.json found")
      logger.warn("Please make sure you're in a valid Node.js project directory")
      logger.info("Run 'npm init' or equivalent to create a package.json first")
      return
    }

    // Check if we should run install first (if lockfile exists)
    const hasLock = await hasLockfile(cwd)
    if (hasLock) {
      spinner.text = "Running package manager install..."
      await runInstall(cwd, { packageManager: packageManager as any, silent: true })
    }

    // Prepare dependencies based on configuration
    const dependencies = [
      "class-variance-authority",
      "clsx",
      "tailwind-merge",
    ]

    const devDependencies = [
      "tailwindcss",
      "postcss",
      "autoprefixer",
    ]

    // Add icon library dependency
    if (config.iconLibrary === "lucide") {
      dependencies.push("lucide-react")
    } else if (config.iconLibrary === "radix") {
      dependencies.push("@radix-ui/react-icons")
    } else if (config.iconLibrary === "heroicons") {
      dependencies.push("@heroicons/react")
    }

    // Install runtime dependencies
    spinner.text = "Installing runtime dependencies..."
    await installDependencies(dependencies, cwd, {
      packageManager: packageManager as any,
      silent: true
    })

    // Install dev dependencies  
    spinner.text = "Installing development dependencies..."
    await installDependencies(devDependencies, cwd, {
      packageManager: packageManager as any,
      dev: true,
      silent: true
    })

    spinner.succeed("✅ Dependencies installed successfully")

    // Show installed packages summary
    logger.info("\n📦 Installed packages:")
    logger.info(`Runtime: ${dependencies.join(", ")}`)
    logger.info(`Dev: ${devDependencies.join(", ")}`)

  } catch (error) {
    spinner.fail("❌ Failed to install some dependencies")

    // Provide manual installation instructions
    logger.warn("\n⚠️  Some dependencies failed to install. Please install them manually:")

    const allDependencies = [
      "class-variance-authority",
      "clsx",
      "tailwind-merge",
      config.iconLibrary === "lucide" ? "lucide-react" :
        config.iconLibrary === "radix" ? "@radix-ui/react-icons" :
          config.iconLibrary === "heroicons" ? "@heroicons/react" : ""
    ].filter(Boolean)

    const allDevDependencies = [
      "tailwindcss",
      "postcss",
      "autoprefixer"
    ]

    logger.info("\n📋 Manual installation commands:")

    if (packageManager === "npm") {
      logger.info(`npm install ${allDependencies.join(" ")}`)
      logger.info(`npm install --save-dev ${allDevDependencies.join(" ")}`)
    } else if (packageManager === "yarn") {
      logger.info(`yarn add ${allDependencies.join(" ")}`)
      logger.info(`yarn add --dev ${allDevDependencies.join(" ")}`)
    } else if (packageManager === "pnpm") {
      logger.info(`pnpm add ${allDependencies.join(" ")}`)
      logger.info(`pnpm add -D ${allDevDependencies.join(" ")}`)
    } else if (packageManager === "bun") {
      logger.info(`bun add ${allDependencies.join(" ")}`)
      logger.info(`bun add -D ${allDevDependencies.join(" ")}`)
    }
  }
}