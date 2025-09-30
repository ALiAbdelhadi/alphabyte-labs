import { getBlocks } from "@/registry/get-block.js"
import { getComponents } from "@/registry/get-component.js"
import { Command } from "commander"
import fsExtra from "fs-extra"
import path from "path"
import { z } from "zod"
import { logger } from "../utils/logger.js"

const depsOptionsSchema = z.object({
  cwd: z.string(),
  outDir: z.string().default("alphabyte-deps"),
})

export const deps = new Command()
  .name("deps")
  .description("Generate dependencies manifest for Alphabyte components and blocks")
  .option(
    "-c, --cwd <cwd>",
    "The working directory. defaults to the current directory.",
    process.cwd()
  )
  .option(
    "-o, --out-dir <outDir>",
    "Output directory for dependency manifests (relative to cwd)",
    "alphabyte-deps"
  )
  .action(async (options) => {
    const opts = depsOptionsSchema.parse(options)
    try {
      await runDeps(opts)
    } catch (error) {
      logger.error("Failed to generate dependency manifests:", error)
      process.exit(1)
    }
  })

async function runDeps(options: z.infer<typeof depsOptionsSchema>) {
  const { cwd, outDir } = options
  const outputRoot = path.resolve(cwd, outDir)
  const compsDir = path.join(outputRoot, "components")
  const blocksDir = path.join(outputRoot, "blocks")

  await fsExtra.ensureDir(compsDir)
  await fsExtra.ensureDir(blocksDir)

  const [components, blocks] = await Promise.all([getComponents(), getBlocks()])

  // Write per-item manifests
  for (const comp of components) {
    const filePath = path.join(compsDir, `${comp.name}.json`)
    await fsExtra.writeJSON(
      filePath,
      {
        name: comp.name,
        type: comp.type,
        dependencies: comp.dependencies ?? [],
        files: comp.files?.map((f) => ({ type: f.type, path: f.path })) ?? [],
        description: comp.description ?? "",
        tags: comp.tags ?? [],
      },
      { spaces: 2 }
    )
  }

  for (const block of blocks) {
    const filePath = path.join(blocksDir, `${block.name}.json`)
    await fsExtra.writeJSON(
      filePath,
      {
        name: block.name,
        type: block.type,
        dependencies: block.dependencies ?? [],
        files: block.files?.map((f) => ({ type: f.type, path: f.path, target: (f as any).target })) ?? [],
        description: block.description ?? "",
        tags: block.tags ?? [],
      },
      { spaces: 2 }
    )
  }

  // Write top-level summary manifest
  const manifestPath = path.join(outputRoot, "manifest.json")
  await fsExtra.writeJSON(
    manifestPath,
    {
      generatedAt: new Date().toISOString(),
      counts: {
        components: components.length,
        blocks: blocks.length,
      },
      components: components.map((c) => ({
        name: c.name,
        dependencies: c.dependencies ?? [],
        tags: c.tags ?? [],
      })),
      blocks: blocks.map((b) => ({
        name: b.name,
        dependencies: b.dependencies ?? [],
        tags: b.tags ?? [],
      })),
    },
    { spaces: 2 }
  )

  logger.info("✅ Dependency manifests generated at:")
  logger.info(`  ${manifestPath}`)
  logger.info(`  ${compsDir}`)
  logger.info(`  ${blocksDir}`)
}


