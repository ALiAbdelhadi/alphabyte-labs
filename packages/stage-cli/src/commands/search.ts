
import { searchRegistry } from "@/registry/search.js"
import { logger } from "../utils/logger.js"
import { Command } from "commander"
import { z } from "zod"

const searchOptionsSchema = z.object({
  cwd: z.string(),
  query: z.string(),
  type: z.enum(["components", "blocks", "all"]).optional(),
})

export const search = new Command()
  .name("search")
  .description("Search for components and blocks")
  .argument("<query>", "search query")
  .option("-c, --cwd <cwd>", "The working directory. defaults to the current directory.", process.cwd())
  .option("-t, --type <type>", "Filter by type (components, blocks, all)", "all")
  .action(async (query, options) => {
    const opts = searchOptionsSchema.parse({ query, ...options })
    
    try {
      await runSearch(opts)
    } catch (error) {
      logger.error("Failed to search components:", error)
      process.exit(1)
    }
  })

async function runSearch(options: z.infer<typeof searchOptionsSchema>) {
  const { query, type } = options

  const results = await searchRegistry(query)
  let filteredResults = results

  // Filter by type
  if (type !== "all") {
    filteredResults = results.filter(item => item.type === type)
  }

  if (filteredResults.length === 0) {
    logger.info(`No results found for "${query}"`)
    return
  }

  logger.info(`\n🔍 Search results for "${query}" (${filteredResults.length} found)\n`)

  // Group by type
  const components = filteredResults.filter(item => item.type === "components")
  const blocks = filteredResults.filter(item => item.type === "blocks")

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
  logger.info("  alphabyte view [component-name]")
}
