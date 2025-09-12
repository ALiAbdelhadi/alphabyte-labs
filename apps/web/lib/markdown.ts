import { Settings } from "@/config/meta"
import { components } from "@/lib/components"
import { getPageRoutes } from "@/lib/pageRoutes"
import { GitHubLink } from "@/settings/settings"
import { promises as fs } from "fs"
import matter from "gray-matter"
import { Element, Text } from "hast"
import { compileMDX } from "next-mdx-remote/rsc"
import path from "path"
import { ComponentType } from "react"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeCodeTitles from "rehype-code-titles"
import rehypeKatex from "rehype-katex"
import rehypePrism from "rehype-prism-plus"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"
import { Node } from "unist"
import { visit } from "unist-util-visit"

declare module "hast" {
  interface Element {
    raw?: string
  }
}

type BaseMdxFrontmatter = {
  title: string
  description: string
  keywords: string
  [key: string]: any
}

async function parseMdx<Frontmatter>(rawMdx: string) {
  return await compileMDX<Frontmatter>({
    source: rawMdx,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        rehypePlugins: [
          preCopy,
          rehypeCodeTitles,
          rehypeKatex,
          rehypePrism,
          rehypeSlug,
          rehypeAutolinkHeadings,
          postCopy,
        ],
        remarkPlugins: [remarkGfm],
      },
    },
    components: components as Record<string, ComponentType<any>>,
  })
}

function computeDocumentPath(slug: string, locale?: string) {
  // Handle empty slug case
  if (!slug || slug === '' || slug === '/') {
    slug = 'introduction'
  }

  // Clean the slug
  slug = slug.replace(/^\/+|\/+$/g, '') // Remove leading and trailing slashes

  const segments = slug.split("/").filter(Boolean)
  const lastSegment = segments[segments.length - 1] || 'introduction'

  // Build base path parts: prefer localized folder if provided
  const localDocsBase = locale ? path.join("contents", locale, "docs") : path.join("contents", "docs")

  return Settings.gitload
    ? (locale
        ? `${GitHubLink.href}/raw/main/contents/${locale}/docs/${slug}/${lastSegment}.mdx`
        : `${GitHubLink.href}/raw/main/contents/docs/${slug}/${lastSegment}.mdx`)
    : path.join(process.cwd(), localDocsBase, slug, `${lastSegment}.mdx`)
}

const getDocumentPath = (() => {
  const cache = new Map<string, string>()
  return (slug: string, locale?: string) => {
    // Normalize slug for caching; include locale tag to prevent collisions
    const normalizedSlug = slug || 'introduction'
    const cacheKey = locale ? `${locale}__${normalizedSlug}` : normalizedSlug

    if (!cache.has(cacheKey)) {
      cache.set(cacheKey, computeDocumentPath(normalizedSlug, locale))
    }
    return cache.get(cacheKey)!
  }
})()

export async function getDocument(slug: string, locale?: string) {
  try {
    // Handle empty or undefined slug
    if (!slug || slug.trim() === '' || slug === '/') {
      slug = 'introduction'
    }

    // Clean the slug
    slug = slug.replace(/^\/+|\/+$/g, '')

    console.log(`[getDocument] Processing slug: "${slug}"`)

    const contentPath = getDocumentPath(slug, locale)
    console.log(`[getDocument] Content path: ${contentPath}`)

    let rawMdx = ""
    let lastUpdated: string | null = null

    if (Settings.gitload) {
      const response = await fetch(contentPath)
      if (!response.ok) {
        throw new Error(
          `Failed to fetch content from GitHub: ${response.statusText}`
        )
      }
      rawMdx = await response.text()
      lastUpdated = response.headers.get("Last-Modified") ?? null
    } else {
      // Check if file exists first
      try {
        await fs.access(contentPath, fs.constants.F_OK)
        rawMdx = await fs.readFile(contentPath, "utf-8")
        const stats = await fs.stat(contentPath)
        lastUpdated = stats.mtime.toISOString()
      } catch (accessError) {
        console.error(`Document file not found: ${contentPath}`)

        // Try alternative paths for different routing structures
        const localizedBase = locale ? path.join(process.cwd(), "contents", locale, "docs") : null
        const defaultBase = path.join(process.cwd(), "contents", "docs")
        const altBases = [localizedBase, defaultBase].filter(Boolean) as string[]

        const alternativePaths = altBases.flatMap((base) => [
          // For components routes that might be structured differently
          path.join(base, slug.replace('components/', ''), `${slug.split('/').pop()}.mdx`),
          // For root level files
          path.join(base, `${slug}.mdx`),
          // For nested structures
          path.join(base, slug, `index.mdx`),
        ])

        let foundAlternative = false
        for (const altPath of alternativePaths) {
          try {
            console.log(`[getDocument] Trying alternative path: ${altPath}`)
            await fs.access(altPath, fs.constants.F_OK)
            rawMdx = await fs.readFile(altPath, "utf-8")
            const stats = await fs.stat(altPath)
            lastUpdated = stats.mtime.toISOString()
            foundAlternative = true
            console.log(`[getDocument] Found alternative path: ${altPath}`)
            break
          } catch (altError) {
            // Continue to next alternative
            continue
          }
        }

        if (!foundAlternative) {
          console.error(`[getDocument] No alternative paths found for slug: ${slug}`)
          return null
        }
      }
    }

    if (!rawMdx) {
      console.error(`[getDocument] No content found for slug: ${slug}`)
      return null
    }

    console.log(`[getDocument] Successfully loaded content for slug: ${slug}`)
    const parsedMdx = await parseMdx<BaseMdxFrontmatter>(rawMdx)
    const tocs = await getTableOfContents(slug, locale)

    return {
      docs: parsedMdx.frontmatter,
      content: parsedMdx.content,
      tocs,
      lastUpdated,
    }
  } catch (err) {
    console.error(`[getDocument] Error processing slug: ${slug}`, err)
    return null
  }
}

const headingsRegex = /^(#{2,4})\s(.+)$/gm

export async function getTableOfContents(
  slug: string,
  locale?: string
): Promise<Array<{ level: number; text: string; href: string }>> {
  const extractedHeadings: Array<{
    level: number
    text: string
    href: string
  }> = []

  // Handle empty slug
  if (!slug || slug.trim() === '' || slug === '/') {
    slug = 'introduction'
  }

  // Clean the slug
  slug = slug.replace(/^\/+|\/+$/g, '')

  let rawMdx = ""
  const segments = slug.split("/").filter(Boolean)
  const lastSegment = segments[segments.length - 1] || 'introduction'

  console.log(`[getTableOfContents] Processing slug: "${slug}", lastSegment: "${lastSegment}"`)

  if (Settings.gitload) {
    const contentPath = locale
      ? `${GitHubLink.href}/raw/main/contents/${locale}/docs/${slug}/${lastSegment}.mdx`
      : `${GitHubLink.href}/raw/main/contents/docs/${slug}/${lastSegment}.mdx`
    try {
      const response = await fetch(contentPath)
      if (!response.ok) {
        throw new Error(
          `Failed to fetch content from GitHub: ${response.statusText}`
        )
      }
      rawMdx = await response.text()
    } catch (error) {
      console.error("Error fetching content from GitHub:", error)
      return []
    }
  } else {
    const baseDir = locale
      ? path.join(process.cwd(), "contents", locale, "docs")
      : path.join(process.cwd(), "contents", "docs")
    const contentPath = path.join(
      baseDir,
      slug,
      `${lastSegment}.mdx`
    )

    try {
      try {
        await fs.access(contentPath, fs.constants.F_OK)
        rawMdx = await fs.readFile(contentPath, "utf-8")
      } catch (fileError) {
        console.error(`[getTableOfContents] File does not exist: ${contentPath}`)

        // Try alternative paths
        const localizedBase = locale ? path.join(process.cwd(), "contents", locale, "docs") : null
        const defaultBase = path.join(process.cwd(), "contents", "docs")
        const altBases = [localizedBase, defaultBase].filter(Boolean) as string[]
        const alternativePaths = altBases.flatMap((base) => [
          path.join(base, slug.replace('components/', ''), `${slug.split('/').pop()}.mdx`),
          path.join(base, `${slug}.mdx`),
          path.join(base, slug, `index.mdx`),
        ])

        let foundAlternative = false
        for (const altPath of alternativePaths) {
          try {
            await fs.access(altPath, fs.constants.F_OK)
            rawMdx = await fs.readFile(altPath, "utf-8")
            foundAlternative = true
            console.log(`[getTableOfContents] Found alternative path: ${altPath}`)
            break
          } catch (altError) {
            continue
          }
        }

        if (!foundAlternative) {
          console.error(`[getTableOfContents] No alternative paths found for slug: ${slug}`)
          return []
        }
      }
    } catch (error) {
      console.error("Error reading local file:", error)
      return []
    }
  }

  if (!rawMdx) {
    console.log(`[getTableOfContents] No content found for slug: ${slug}`)
    return []
  }

  let match
  while ((match = headingsRegex.exec(rawMdx)) !== null) {
    const level = match[1].length
    const text = match[2].trim()
    extractedHeadings.push({
      level,
      text,
      href: `#${sluggify(text)}`,
    })
  }

  console.log(`[getTableOfContents] Found ${extractedHeadings.length} headings for slug: ${slug}`)
  return extractedHeadings
}

function sluggify(text: string) {
  return text
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9\u4e00-\u9fa5\-_]/g, "")
}

type SimplePage = { title: string; href: string }

// Cache routes per-locale to avoid mixing languages across requests
let cachedRoutesByLocale: Map<string | undefined, SimplePage[]> | null = null
let cachedIndexMapByLocale: Map<string | undefined, Map<string, number>> | null = null

async function ensureRoutesIndexed(locale?: string) {
  if (!cachedRoutesByLocale) {
    cachedRoutesByLocale = new Map()
  }
  if (!cachedIndexMapByLocale) {
    cachedIndexMapByLocale = new Map()
  }

  const localeKey = locale
  if (!cachedRoutesByLocale.has(localeKey)) {
    const routes = await getPageRoutes()
    cachedRoutesByLocale.set(localeKey, routes)
  }

  if (!cachedIndexMapByLocale.has(localeKey)) {
    const routes = cachedRoutesByLocale.get(localeKey) as SimplePage[]
    cachedIndexMapByLocale.set(
      localeKey,
      new Map(routes.map((route, index) => [route.href, index]))
    )
  }
}

export async function getPreviousNext(path: string, locale?: string) {
  await ensureRoutesIndexed(locale)

  const routes = (cachedRoutesByLocale as Map<string | undefined, SimplePage[]>).get(locale) as SimplePage[]
  const indexMap = (cachedIndexMapByLocale as Map<string | undefined, Map<string, number>>).get(locale) as Map<string, number>

  const cleanPath = path.startsWith('/') ? path : `/${path}`
  let index = indexMap.get(cleanPath)

  if (index === undefined) {
    index = indexMap.get(path)
  }

  if (index === undefined) {
    for (const [routePath, routeIndex] of indexMap.entries()) {
      const normalizedRoutePath = routePath.replace(/^\/+|\/+$/g, '')
      const normalizedPath = path.replace(/^\/+|\/+$/g, '')
      if (
        normalizedRoutePath.includes(normalizedPath) ||
        normalizedPath.includes(normalizedRoutePath)
      ) {
        index = routeIndex
        break
      }
    }
  }

  if (index === undefined || index === -1) {
    console.log(`[getPreviousNext] No index found for path: ${path}`)
    return { prev: null as SimplePage | null, next: null as SimplePage | null }
  }

  const prev = index > 0 ? routes[index - 1] : null
  const next = index < routes.length - 1 ? routes[index + 1] : null

  console.log(
    `[getPreviousNext] Path: ${path}, Index: ${index}, Prev: ${prev?.title}, Next: ${next?.title}`
  )
  return { prev, next }
}

const preCopy = () => (tree: Node) => {
  visit(tree, "element", (node: Element) => {
    if (node.tagName === "pre") {
      const [codeEl] = node.children as Element[]
      if (codeEl?.tagName === "code") {
        const textNode = codeEl.children?.[0] as Text
        node.raw = textNode?.value || ""
      }
    }
  })
}

const postCopy = () => (tree: Node) => {
  visit(tree, "element", (node: Element) => {
    if (node.tagName === "pre" && node.raw) {
      node.properties = node.properties || {}
      node.properties["raw"] = node.raw
    }
  })
}

// Start Blocks
function getBlocksContentPath(slug: string, locale?: string) {
  const segments = slug.split("/").filter(Boolean)
  const lastSegment = segments[segments.length - 1]

  const baseDir = locale
    ? path.join(process.cwd(), "contents", locale, "blocks")
    : path.join(process.cwd(), "contents", "blocks")
  return path.join(baseDir, `${lastSegment}.mdx`)
}

export async function getBlocksForSlug(slug: string, locale?: string) {
  try {
    const contentPath = getBlocksContentPath(slug, locale)
    console.log(`[getBlocksForSlug] Checking blocks path: ${contentPath}`)

    try {
      await fs.access(contentPath, fs.constants.F_OK)
    } catch (error) {
      // fallback to default blocks dir if locale file not found
      const fallbackPath = getBlocksContentPath(slug)
      try {
        await fs.access(fallbackPath, fs.constants.F_OK)
        const rawMdx = await fs.readFile(fallbackPath, "utf-8")
        return await parseMdx<BaseMdxFrontmatter>(rawMdx)
      } catch {
        console.error(`Block file does not exist: ${contentPath}`)
        return null
      }
    }

    const rawMdx = await fs.readFile(contentPath, "utf-8")
    return await parseMdx<BaseMdxFrontmatter>(rawMdx)
  } catch (err) {
    console.error("Error in getBlocksForSlug:", err)
    return null
  }
}

export async function getAllBlocks(locale?: string) {
  const localizedFolder = locale
    ? path.join(process.cwd(), "contents", locale, "blocks")
    : path.join(process.cwd(), "contents", "blocks")
  const defaultFolder = path.join(process.cwd(), "contents", "blocks")
  console.log(`[getAllBlocks] Checking blocks folder: ${localizedFolder}`)

  try {
    await fs.access(localizedFolder, fs.constants.F_OK)
  } catch (error) {
    console.error(`Blocks folder does not exist: ${localizedFolder}`)
    try {
      await fs.access(defaultFolder, fs.constants.F_OK)
      console.log(`[getAllBlocks] Falling back to default folder: ${defaultFolder}`)
    } catch {
      console.error(`Blocks folder does not exist: ${defaultFolder}`)
      return []
    }
  }

  try {
    const base = (await fs.access(localizedFolder).then(() => true).catch(() => false))
      ? localizedFolder
      : defaultFolder
    const files = await fs.readdir(base)
    console.log(`[getAllBlocks] Found ${files.length} items in blocks folder: ${base}`)

    const uncheckedRes = await Promise.all(
      files.map(async (file) => {
        const filePath = path.join(base, file)
        const stats = await fs.stat(filePath)

        if (!stats.isDirectory()) {
          // Handle direct .mdx files
          if (file.endsWith('.mdx')) {
            try {
              const rawMdx = await fs.readFile(filePath, "utf-8")
              const slug = file.replace('.mdx', '')
              return {
                ...(matter(rawMdx).data as BaseMdxFrontmatter),
                slug,
              }
            } catch (error) {
              console.warn(`Error reading MDX file: ${filePath}`)
              return undefined
            }
          }
          return undefined
        }

        // Handle directory structure
        const mdxPath = path.join(filePath, `${file}.mdx`)
        try {
          await fs.access(mdxPath, fs.constants.F_OK)
          const rawMdx = await fs.readFile(mdxPath, "utf-8")
          return {
            ...(matter(rawMdx).data as BaseMdxFrontmatter),
            slug: file,
          }
        } catch (error) {
          console.warn(`MDX file not found in directory: ${mdxPath}`)
          return undefined
        }
      })
    )

    const validBlocks = uncheckedRes.filter((it) => !!it) as (BaseMdxFrontmatter & {
      slug: string
    })[]

    console.log(`[getAllBlocks] Found ${validBlocks.length} valid blocks`)
    return validBlocks
  } catch (error) {
    console.error("Error reading blocks folder:", error)
    return []
  }
}