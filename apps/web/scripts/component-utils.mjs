import fs from "fs/promises"
import path, { dirname } from "path"
import { fileURLToPath } from "url"
import { fixImport } from "./fixImport.mjs";

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const projectRoot = path.resolve(__dirname, "../")
const componentsDemoDir = path.join(projectRoot, "registry/examples")
const componentsDir = path.join(projectRoot, "components/ui")
const blocksDir = path.join(projectRoot, "registry/view")
const outputFile = path.join(projectRoot, "registry/component-examples.ts")
const registryOutputFile = path.join(projectRoot, "registry/index.ts")
const sourceMapDemoOutputFile = path.join(projectRoot, "registry/component-demo-source-map.json")
const sourceMapOutputFile = path.join(projectRoot, "registry/component-source-map.json")
const outputBlocksView = path.join(projectRoot, "registry/blocks-examples.ts")
const outputBlocksViewSourceMap = path.join(projectRoot, "registry/blocks-view-source-map.json")

const SILENT_MODE = true

/**
 * Determines the language based on file extension
 * @param {string} filePath -
 * @returns {string} 
 */
function getLanguageFromExtension(filePath) {
  const extension = filePath.split('.').pop()?.toLowerCase();

  const extensionMap = {
    'ts': 'typescript',
    'tsx': 'tsx',
    'js': 'javascript',
    'jsx': 'jsx',
    'css': 'css',
    'scss': 'scss',
    'less': 'less',
    'json': 'json',
    'html': 'html',
    'md': 'markdown',
    'mdx': 'mdx',
  };

  return extension && extension in extensionMap
    ? extensionMap[extension]
    : 'typescript'; // Default to typescript
}

async function getAllTSXFiles(dir) {
  try {
    let entries = await fs.readdir(dir, { withFileTypes: true })
    let files = await Promise.all(
      entries.map((entry) => {
        const fullPath = path.join(dir, entry.name)
        if (entry.isDirectory()) {
          return getAllTSXFiles(fullPath)
        } else if (entry.isFile() && (entry.name.endsWith(".tsx") || entry.name.endsWith(".jsx"))) {
          return [fullPath]
        } else {
          return []
        }
      })
    )
    return files.flat()
  } catch (error) {
    if (!SILENT_MODE || !error.code || error.code !== 'ENOENT') {
      console.log(`Error reading directory ${dir}: ${error.message}`)
    }
    return []
  }
}

function toImportPath(filePath) {
  const relativePath = path.relative(projectRoot, filePath).replace(/\\/g, "/")
  return `@/${relativePath.replace(/\.(tsx|jsx)$/, "")}`
}

async function readFileContent(filePath) {
  try {
    let content = await fs.readFile(filePath, "utf-8");
    content = fixImport(content);
    return content;
  } catch (error) {
    if (!SILENT_MODE || !error.code || error.code !== 'ENOENT') {
      console.log(`Error reading file ${filePath}: ${error.message}`);
    }
    return null;
  }
}

async function getAllFiles(dir, extensions = []) {
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true })
    let files = []

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        const subFiles = await getAllFiles(fullPath, extensions)
        files = [...files, ...subFiles]
      } else if (entry.isFile()) {
        if (extensions.length === 0 || extensions.some(ext => entry.name.endsWith(ext))) {
          files.push(fullPath)
        }
      }
    }

    return files
  } catch (error) {
    if (!SILENT_MODE || !error.code || error.code !== 'ENOENT') {
      console.log(`Error getting all files from ${dir}: ${error.message}`)
    }
    return []
  }
}

async function dirExists(dirPath) {
  try {
    const stats = await fs.stat(dirPath)
    return stats.isDirectory()
  } catch {
    return false
  }
}

async function getBlocksStructure() {
  const blockDirs = await fs.readdir(blocksDir).catch(() => [])
  const blocks = []
  const blockSourceMap = {}

  for (const dirName of blockDirs) {
    const blockPath = path.join(blocksDir, dirName)
    const stat = await fs.stat(blockPath).catch(() => null)
    if (!stat || !stat.isDirectory()) continue

    const pagePath = path.join(blockPath, "page.tsx")
    const pageExists = await fs.access(pagePath).then(() => true).catch(() => false)
    if (!pageExists) continue

    const target = toImportPath(pagePath)

    const components = []
    const constant = []
    const lib = []
    const context = []
    const hooks = []
    if (!blockSourceMap[dirName]) {
      blockSourceMap[dirName] = {
        components: {},
        constant: {},
        lib: {},
        context: {},
        hooks: {}
      }
    }

    if (pageExists) {
      const pageContent = await readFileContent(pagePath)
      if (pageContent) {
        blockSourceMap[dirName][target] = pageContent
      }
    }

    const componentsDir = path.join(blockPath, "components")
    const constantDir = path.join(blockPath, "constant")
    const libDir = path.join(blockPath, "lib")
    const contextDir = path.join(blockPath, "context")
    const hooksDir = path.join(blockPath, "hooks")

    const componentFiles = await getAllTSXFiles(componentsDir)
    for (const file of componentFiles) {
      const importPath = toImportPath(file)
      components.push(importPath)
      const content = await readFileContent(file)
      if (content) {
        // Add language information based on file extension
        blockSourceMap[dirName].components[importPath] = {
          content,
          language: getLanguageFromExtension(file)
        }
      }
    }

    if (await dirExists(constantDir)) {
      const constantFiles = await getAllFiles(constantDir)
      for (const file of constantFiles) {
        const importPath = toImportPath(file)
        constant.push(importPath)
        const content = await readFileContent(file)
        if (content) {
          // Add language information based on file extension
          blockSourceMap[dirName].constant[importPath] = {
            content,
            language: getLanguageFromExtension(file)
          }
        }
      }
    }

    if (await dirExists(libDir)) {
      const libFiles = await getAllFiles(libDir)
      for (const file of libFiles) {
        const importPath = toImportPath(file)
        lib.push(importPath)
        const content = await readFileContent(file)
        if (content) {
          // Add language information based on file extension
          blockSourceMap[dirName].lib[importPath] = {
            content,
            language: getLanguageFromExtension(file)
          }
        }
      }
    }

    if (await dirExists(contextDir)) {
      const contextFiles = await getAllFiles(contextDir, ['.tsx', '.ts', '.jsx', '.js'])
      for (const file of contextFiles) {
        const importPath = toImportPath(file)
        context.push(importPath)
        const content = await readFileContent(file)
        if (content) {
          // Add language information based on file extension
          blockSourceMap[dirName].context[importPath] = {
            content,
            language: getLanguageFromExtension(file)
          }
        }
      }
    }

    if (await dirExists(hooksDir)) {
      const hooksFiles = await getAllFiles(hooksDir, ['.tsx', '.ts', '.jsx', '.js'])
      for (const file of hooksFiles) {
        const importPath = toImportPath(file)
        hooks.push(importPath)
        const content = await readFileContent(file)
        if (content) {
          // Add language information based on file extension
          blockSourceMap[dirName].hooks[importPath] = {
            content,
            language: getLanguageFromExtension(file)
          }
        }
      }
    }

    blocks.push({
      name: dirName,
      target,
      components,
      constant,
      lib,
      context,
      hooks
    })
  }

  return { blocks, blockSourceMap }
}

async function generateFiles() {
  // Get component files
  const ComponentFile = await getAllTSXFiles(componentsDir)
  const demoComponentFile = await getAllTSXFiles(componentsDemoDir)

  const registryItems = []
  const componentSourceMap = {}
  const componentDemoSourceMap = {}

  // Process component files
  for (const file of ComponentFile) {
    const path = toImportPath(file)
    const content = await readFileContent(file)
    if (content) {
      componentSourceMap[path] = {
        content,
        language: getLanguageFromExtension(file)
      }
    }
  }

  // Process demo component files
  for (const file of demoComponentFile) {
    const fileName = path.basename(file, ".tsx")
    const match = fileName.match(/^(.+?)(?:-(.+?))?-demo$/)
    if (!match) continue

    const baseName = match[1]
    const variant = match[2] || null

    // Find the corresponding component file
    const componentFile = ComponentFile.find(f => {
      const componentBaseName = path.basename(f, path.extname(f))
      return componentBaseName === baseName || componentBaseName.startsWith(baseName + "-")
    })

    const componentImportPath = componentFile ? toImportPath(componentFile) : `@/components/library/${baseName}`
    const demoImportPath = toImportPath(file)
    const content = await readFileContent(file)

    registryItems.push({
      name: fileName,
      baseComponent: baseName,
      variant,
      componentPath: componentImportPath,
      componentDemoPath: demoImportPath,
      component: `React.lazy(() => import("${demoImportPath}"))`,
      language: getLanguageFromExtension(file)
    })

    if (content) {
      componentDemoSourceMap[demoImportPath] = {
        content,
        language: getLanguageFromExtension(file)
      }
    }
  }

  const { blocks, blockSourceMap } = await getBlocksStructure()


  const componentExamplesResult = `// This file was automatically generated
import React from "react"
export const componentExamples = { items: [
${registryItems.map((i) => `  {
    name: "${i.name}",
    baseComponent: "${i.baseComponent}",
    variant: ${i.variant ? `"${i.variant}"` : "null"},
    componentPath: "${i.componentPath}",
    componentDemoPath: "${i.componentDemoPath}",
    component: ${i.component},
    language: "${i.language}"
  }`).join(",\n")}
] }`

  const blockExamplesResult = `// This file was automatically generated
export const blockExamples = { items: ${JSON.stringify(blocks, null, 2)} }`

  const registryResult = `// This file was automatically generated
import { componentExamples } from "./component-examples"
import { blockExamples } from "./blocks-examples"
export const REGISTRY = {
  name: "alphabyte-labs",
  items: [...componentExamples.items, ...blockExamples.items]
}`

  await fs.mkdir(path.dirname(outputFile), { recursive: true }).catch(() => { })
  await fs.writeFile(outputFile, componentExamplesResult, "utf-8")
  await fs.writeFile(outputBlocksView, blockExamplesResult, "utf-8")
  await fs.writeFile(registryOutputFile, registryResult, "utf-8")
  await fs.writeFile(sourceMapOutputFile, JSON.stringify(componentSourceMap, null, 2), "utf-8")
  await fs.writeFile(sourceMapDemoOutputFile, JSON.stringify(componentDemoSourceMap, null, 2), "utf-8")
  await fs.writeFile(outputBlocksViewSourceMap, JSON.stringify(blockSourceMap, null, 2), "utf-8")

  console.log("✅ All files generated successfully")
}

generateFiles().catch((err) => {
  console.error("Error generating files:", err)
  process.exit(1)
})