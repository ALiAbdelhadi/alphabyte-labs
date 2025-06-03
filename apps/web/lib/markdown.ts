import { Settings } from "@/config/meta"
import { components } from "@/lib/components"
import { PageRoutes } from "@/lib/pageRoutes"
import { GitHubLink } from "@/settings/settings"
import { createReadStream, promises as fs } from "fs"
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

function computeDocumentPath(slug: string) {
  const segments = slug.split("/")
  const lastSegment = segments[segments.length - 1]
  return Settings.gitload
    ? `${GitHubLink.href}/raw/main/contents/docs/${slug}/${lastSegment}.mdx`
    : path.join(process.cwd(), "contents/docs", slug, `${lastSegment}.mdx`)
}

const getDocumentPath = (() => {
  const cache = new Map<string, string>()
  return (slug: string) => {
    if (!cache.has(slug)) {
      cache.set(slug, computeDocumentPath(slug))
    }
    return cache.get(slug)!
  }
})()

export async function getDocument(slug: string) {
  try {
    const contentPath = getDocumentPath(slug)
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
      rawMdx = await fs.readFile(contentPath, "utf-8")
      const stats = await fs.stat(contentPath)
      lastUpdated = stats.mtime.toISOString()
    }

    const parsedMdx = await parseMdx<BaseMdxFrontmatter>(rawMdx)
    const tocs = await getTableOfContents(slug)

    return {
      docs: parsedMdx.frontmatter,
      content: parsedMdx.content,
      tocs,
      lastUpdated,
    }
  } catch (err) {
    console.error(err)
    return null
  }
}

const headingsRegex = /^(#{2,4})\s(.+)$/gm

export async function getTableOfContents(
  slug: string
): Promise<Array<{ level: number; text: string; href: string }>> {
  const extractedHeadings: Array<{
    level: number
    text: string
    href: string
  }> = []
  let rawMdx = ""
  const segments = slug.split("/")
  const lastSegment = segments[segments.length - 1]

  if (Settings.gitload) {
    const contentPath = `${GitHubLink.href}/raw/main/contents/docs/${slug}/${lastSegment}.mdx`
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
    const contentPath = path.join(
      process.cwd(),
      "contents/docs",
      slug,
      `${lastSegment}.mdx`
    )
    try {
      try {
        await fs.access(contentPath, fs.constants.F_OK)
      } catch (fileError) {
        console.error(`File does not exist: ${contentPath}`)
        return []
      }

      const stream = createReadStream(contentPath, { encoding: "utf-8" })
      for await (const chunk of stream) {
        rawMdx += chunk
      }
    } catch (error) {
      console.error("Error reading local file:", error)
      return []
    }
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

  return extractedHeadings
}

function sluggify(text: string) {
  return text
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9\u4e00-\u9fa5\-_]/g, "")
}


const pathIndexMap = new Map(
  PageRoutes.map((route, index) => [route.href, index])
)

export function getPreviousNext(path: string) {
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  let index = pathIndexMap.get(cleanPath)
  
  if (index === undefined) {
    index = pathIndexMap.get(path)
  }
  
  if (index === undefined) {
    for (const [routePath, routeIndex] of pathIndexMap.entries()) {
      if (routePath.includes(path) || path.includes(routePath.replace(/^\//, ''))) {
        index = routeIndex
        break
      }
    }
  }


  if (index === undefined || index === -1) {
    return { prev: null, next: null }
  }

  const prev = index > 0 ? PageRoutes[index - 1] : null
  const next = index < PageRoutes.length - 1 ? PageRoutes[index + 1] : null  
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
function getBlocksContentPath(slug: string) {
  const segments = slug.split("/")
  const lastSegment = segments[segments.length - 1]

  return path.join(process.cwd(), "contents/blocks", `${lastSegment}.mdx`)
}

export async function getBlocksForSlug(slug: string) {
  try {
    const contentPath = getBlocksContentPath(slug)
    try {
      await fs.access(contentPath, fs.constants.F_OK)
    } catch (error) {
      console.error(`Block file does not exist: ${contentPath}`)
      return null
    }

    const rawMdx = await fs.readFile(contentPath, "utf-8")
    return await parseMdx<BaseMdxFrontmatter>(rawMdx)
  } catch (err) {
    console.error("Error in getBlocksForSlug:", err)
    return null
  }
}

export async function getAllBlocks() {
  const blocksFolder = path.join(process.cwd(), "/contents/blocks/")
  try {
    await fs.access(blocksFolder, fs.constants.F_OK)
  } catch (error) {
    console.error(`Blocks folder does not exist: ${blocksFolder}`)
    return []
  }

  const files = await fs.readdir(blocksFolder)
  const uncheckedRes = await Promise.all(
    files.map(async (file) => {
      const filePath = path.join(blocksFolder, file)
      const stats = await fs.stat(filePath)
      if (!stats.isDirectory()) return undefined
      const mdxPath = path.join(filePath, `${file}.mdx`)
      try {
        await fs.access(mdxPath, fs.constants.F_OK)
      } catch (error) {
        console.warn(`MDX file not found in directory: ${mdxPath}`)
        return undefined
      }
      const rawMdx = await fs.readFile(mdxPath, "utf-8")
      return {
        ...(matter(rawMdx).data as BaseMdxFrontmatter),
        slug: file,
      }
    })
  )
  return uncheckedRes.filter((it) => !!it) as (BaseMdxFrontmatter & {
    slug: string
  })[]
}
