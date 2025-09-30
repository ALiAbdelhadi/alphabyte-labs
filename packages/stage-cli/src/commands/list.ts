import { Command } from "commander"
import { z } from "zod"
import { logger } from "../utils/logger.js"
import { getRegistry } from "@/registry/get-registry.js"

const listOptionsSchema = z.object({
  cwd: z.string(),
  type: z.enum(["components", "blocks", "all"]).optional(),
  search: z.string().optional(),
})

export const list = new Command()
  .name("list")
  .description("List all available components and blocks")
  .option("-c, --cwd <cwd>", "The working directory. defaults to the current directory.", process.cwd())
  .option("-t, --type <type>", "Filter by type (components, blocks, all)", "all")
  .option("-s, --search <search>", "Search for specific components or blocks")
  .action(async (options) => {
    const opts = listOptionsSchema.parse(options)
    
    try {
      await runList(opts)
    } catch (error) {
      logger.error("Failed to list components:", error)
      process.exit(1)
    }
  })

async function runList(options: z.infer<typeof listOptionsSchema>) {
  const { type, search } = options

  const registry = await getRegistry()
  let items = registry.items

  // Filter by type
  if (type !== "all") {
    items = items.filter(item => item.type === type)
  }

  // Filter by search term
  if (search) {
    const searchTerm = search.toLowerCase()
    items = items.filter(item => 
      item.name.toLowerCase().includes(searchTerm) ||
      item.description?.toLowerCase().includes(searchTerm) ||
      item.tags?.some(tag => tag.toLowerCase().includes(searchTerm))
    )
  }

  if (items.length === 0) {
    logger.info("No components or blocks found.")
    return
  }

  // Group by type
  const components = items.filter(item => item.type === "components")
  const blocks = items.filter(item => item.type === "blocks")

  logger.info(`\n📦 Alphabyte Labs Registry (${registry.version})`)
  logger.info(`Found ${items.length} items\n`)

  if (components.length > 0) {
    logger.info("🎨 Components:")
    components.forEach(component => {
      logger.info(`  • ${component.name}`)
      if (component.description) {
        logger.info(`    ${component.description}`)
      }
      if (component.tags && component.tags.length > 0) {
        logger.info(`    Tags: ${component.tags.join(", ")}`)
      }
      logger.info("")
    })
  }

  if (blocks.length > 0) {
    logger.info("🧱 Blocks:")
    blocks.forEach(block => {
      logger.info(`  • ${block.name}`)
      if (block.description) {
        logger.info(`    ${block.description}`)
      }
      if (block.tags && block.tags.length > 0) {
        logger.info(`    Tags: ${block.tags.join(", ")}`)
      }
      logger.info("")
    })
  }

  logger.info("💡 Usage:")
  logger.info("  alphabyte add [component-name]")
  logger.info("  alphabyte add [block-name]")
  logger.info("  alphabyte add --all")
}
