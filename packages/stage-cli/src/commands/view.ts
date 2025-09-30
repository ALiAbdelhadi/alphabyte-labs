import { getRegistryItem } from "@/registry/registry-item.js"
import { Command } from "commander"
import { z } from "zod"
import { logger } from "../utils/logger.js"

const viewOptionsSchema = z.object({
  cwd: z.string(),
  component: z.string(),
  type: z.enum(["components", "blocks"]).optional(),
})

export const view = new Command()
  .name("view")
  .description("View details of a specific component or block")
  .argument("<component>", "name of the component or block to view")
  .option("-c, --cwd <cwd>", "The working directory. defaults to the current directory.", process.cwd())
  .option("-t, --type <type>", "Type of item (components, blocks)")
  .action(async (component, options) => {
    const opts = viewOptionsSchema.parse({ component, ...options })

    try {
      await runView(opts)
    } catch (error) {
      logger.error("Failed to view component:", error)
      process.exit(1)
    }
  })

async function runView(options: z.infer<typeof viewOptionsSchema>) {
  const { component, type } = options

  // Try to find the component
  let item = null

  if (type) {
    item = await getRegistryItem(component, type)
  } else {
    // Try both types
    item = await getRegistryItem(component, "components") ||
      await getRegistryItem(component, "blocks")
  }

  if (!item) {
    logger.error(`Component "${component}" not found in registry`)
    logger.info("Use 'alphabyte list' to see available components and blocks")
    return
  }

  // Display component details
  logger.info(`\n📦 ${item.name}`)
  logger.info(`Type: ${item.type}`)

  if (item.description) {
    logger.info(`Description: ${item.description}`)
  }

  // category removed per schema

  if (item.tags && item.tags.length > 0) {
    logger.info(`Tags: ${item.tags.join(", ")}`)
  }

  if (item.dependencies && item.dependencies.length > 0) {
    logger.info(`\nDependencies:`)
    item.dependencies.forEach(dep => {
      logger.info(`  • ${dep}`)
    })
  }

  if (item.devDependencies && item.devDependencies.length > 0) {
    logger.info(`\nDev Dependencies:`)
    item.devDependencies.forEach(dep => {
      logger.info(`  • ${dep}`)
    })
  }

  logger.info(`\nFiles:`)
  item.files?.forEach(file => {
    // file.path is canonical per schema
    logger.info(`  • ${file.path} (${(file as any).type || 'unknown'})`)
  })

  logger.info(`\n💡 Usage:`)
  logger.info(`  alphabyte add ${item.name}`)
}
