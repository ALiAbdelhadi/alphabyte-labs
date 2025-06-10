import fs from "fs/promises";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { fixImport } from "./fixImport.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = path.resolve(__dirname, "../");
const componentsDemoDir = path.join(projectRoot, "registry/examples");
const componentsDir = path.join(projectRoot, "registry/ui");
const blocksDir = path.join(projectRoot, "registry/view");
const outputFile = path.join(projectRoot, "registry/component-examples.ts");
const registryOutputFile = path.join(projectRoot, "registry/index.ts");
const sourceMapDemoOutputFile = path.join(projectRoot, "registry/component-demo-source-map.json");
const sourceMapOutputFile = path.join(projectRoot, "registry/component-source-map.json");
const outputBlocksView = path.join(projectRoot, "registry/blocks-examples.ts");
const outputBlocksViewSourceMap = path.join(projectRoot, "registry/blocks-view-source-map.json");

const SILENT_MODE = true;

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

async function fileExists(filePath) {
  try {
    const stats = await fs.stat(filePath)
    return stats.isFile()
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
    const layoutPath = path.join(blockPath, "layout.tsx")
    const pageExists = await fileExists(pagePath)
    const layoutExists = await fileExists(layoutPath)

    if (!pageExists) continue

    const target = toImportPath(pagePath)
    let layout = null

    const components = []
    const constant = []
    const lib = []
    const context = []
    const hooks = []
    const types = []
    const styles = []

    if (!blockSourceMap[dirName]) {
      blockSourceMap[dirName] = {
        components: {},
        constant: {},
        lib: {},
        context: {},
        hooks: {},
        types: {},
        styles: {},
        layout: {}
      }
    }

    if (pageExists) {
      const pageContent = await readFileContent(pagePath)
      if (pageContent) {
        blockSourceMap[dirName][target] = {
          content: pageContent,
          language: getLanguageFromExtension(pagePath)
        }
      }
    }

    if (layoutExists) {
      layout = toImportPath(layoutPath)
      const layoutContent = await readFileContent(layoutPath)
      if (layoutContent) {
        blockSourceMap[dirName].layout[layout] = {
          content: layoutContent,
          language: getLanguageFromExtension(layoutPath)
        }
      }
    }

    const subdirectories = [
      { name: 'components', array: components, key: 'components' },
      { name: 'constant', array: constant, key: 'constant' },
      { name: 'constants', array: constant, key: 'constant' },
      { name: 'lib', array: lib, key: 'lib' },
      { name: 'context', array: context, key: 'context' },
      { name: 'hooks', array: hooks, key: 'hooks' },
      { name: 'types', array: types, key: 'types' },
      { name: 'styles', array: styles, key: 'styles' }
    ]

    for (const subdir of subdirectories) {
      const subdirPath = path.join(blockPath, subdir.name)

      if (await dirExists(subdirPath)) {
        let files = []

        if (subdir.name === 'components') {
          files = await getAllTSXFiles(subdirPath)
        } else if (subdir.name === 'styles') {
          files = await getAllFiles(subdirPath, ['.css', '.scss', '.less'])
        } else {
          files = await getAllFiles(subdirPath)
        }

        for (const file of files) {
          const importPath = toImportPath(file)
          subdir.array.push(importPath)
          const content = await readFileContent(file)
          if (content) {
            blockSourceMap[dirName][subdir.key][importPath] = {
              content,
              language: getLanguageFromExtension(file)
            }
          }
        }
      }
    }

    const blockObj = {
      name: dirName,
      target,
      components,
      constant,
      lib,
      context,
      hooks,
      types,
      styles
    }

    if (layout) {
      blockObj.layout = layout
    }

    blocks.push(blockObj)
  }

  return { blocks, blockSourceMap }
}

async function generateFiles() {
  const ComponentFile = await getAllTSXFiles(componentsDir)
  const demoComponentFile = await getAllTSXFiles(componentsDemoDir)

  const registryItems = []
  const componentSourceMap = {}
  const componentDemoSourceMap = {}

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

  for (const file of demoComponentFile) {
    const fileName = path.basename(file, ".tsx")
    const match = fileName.match(/^(.+?)(?:-(.+?))?-demo$/)
    if (!match) continue

    const baseName = match[1]
    const variant = match[2] || null

    const componentFile = ComponentFile.find(f => {
      const componentBaseName = path.basename(f, path.extname(f))
      return componentBaseName === baseName || componentBaseName.startsWith(baseName + "-")
    })

    const componentImportPath = componentFile ? toImportPath(componentFile) : `@/components/ui/${baseName}`
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
  console.log(`📦 Generated ${blocks.length} blocks`)
  console.log(`🧩 Generated ${registryItems.length} component examples`)
}

generateFiles().catch((err) => {
  console.error("Error generating files:", err)
  process.exit(1)
})
