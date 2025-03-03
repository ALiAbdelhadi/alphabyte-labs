import { Settings } from "@/lib/meta";
import { DocsRouting } from "@/settings/DocsRouting";
import { GitHubLink } from "@/settings/navigation";
import { createReadStream, promises as fs } from "fs";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import path from "path";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeCodeTitles from "rehype-code-titles";
import rehypeKatex from "rehype-katex";
import rehypePrism from "rehype-prism-plus";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { visit } from "unist-util-visit";
import { component } from "./component";
// Types for routing
export interface Page {
  title: string;
  href: string;
}

export interface EachRoute {
  title: string;
  href: string;
  heading?: string;
  items?: EachRoute[];
  noLink?: boolean;
  spacer?: boolean;
}

export type Paths = EachRoute;

// Routing configuration


// Helper function to get all links recursively
function getRecursiveAllLinks(node: EachRoute): Page[] {
  const ans: Page[] = [];
  if (!node.noLink && !node.spacer) {
    ans.push({ title: node.title, href: node.href });
  }
  node.items?.forEach((subNode) => {
    const temp = { ...subNode, href: `${node.href}${subNode.href}` };
    ans.push(...getRecursiveAllLinks(temp));
  });
  return ans;
}

// Generate flattened page routes
export const page_routes = DocsRouting.filter(route => !route.spacer)
  .map((it) => getRecursiveAllLinks(it))
  .flat();

// Types
interface BaseMdxFrontmatter {
  title: string;
  description: string;
  keywords: string;
}

interface BlogMdxFrontmatter extends BaseMdxFrontmatter {
  date: string;
  author: string;
}

// Cache for document paths
const pathCache = new Map<string, string>();
const pathIndexMap = new Map(
  page_routes.map((route, index) => [route.href, index])
);

// MDX Parsing
async function parseMdx<Frontmatter>(rawMdx: string) {
  return await compileMDX<Frontmatter>({
    source: rawMdx,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        rehypePlugins: [
          preProcess,
          rehypeCodeTitles,
          rehypeKatex,
          rehypePrism,
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            {
              properties: {
                className: ["subheading-anchor"],
                ariaLabel: "Link to section",
              },
            },
          ],
          postProcess,
        ],
        remarkPlugins: [remarkGfm],
      },
    },
    components: component,
  });
}

// Path Helpers
function computeDocumentPath(slug: string) {
  return Settings.gitload
    ? `${GitHubLink.href}/raw/main/contents/docs/${slug}/index.mdx`
    : path.join(process.cwd(), "/contents/docs/", `${slug}/index.mdx`);
}

function getDocumentPath(slug: string) {
  if (!pathCache.has(slug)) {
    pathCache.set(slug, computeDocumentPath(slug));
  }
  return pathCache.get(slug)!;
}
// Document Processing
export async function getDocument(slug: string) {
  try {
    const contentPath = getDocumentPath(slug)
    let rawMdx = ""
    let lastUpdated: string | null = null

    if (Settings.gitload) {
      const response = await fetch(contentPath)
      if (!response.ok) {
        throw new Error(`Failed to fetch content from GitHub: ${response.statusText}`)
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
      frontmatter: parsedMdx.frontmatter,
      content: parsedMdx.content,
      tocs,
      lastUpdated,
    }
  } catch (err) {
    console.error("Error in getDocument:", err)
    return null
  }
}

// Table of Contents
const headingsRegex = /^(#{2,4})\s(.+)$/gm;

export async function getTableOfContents(
  slug: string
): Promise<Array<{ level: number; text: string; href: string }>> {
  const extractedHeadings: Array<{
    level: number;
    text: string;
    href: string;
  }> = [];
  let rawMdx = "";

  if (Settings.gitload) {
    const contentPath = `${GitHubLink.href}/raw/main/contents/docs/${slug}/index.mdx`;
    try {
      const response = await fetch(contentPath);
      if (!response.ok) {
        throw new Error(`Failed to fetch content from GitHub: ${response.statusText}`);
      }
      rawMdx = await response.text();
    } catch (error) {
      console.error("Error fetching content from GitHub:", error);
      return [];
    }
  } else {
    const contentPath = path.join(process.cwd(), "/contents/docs/", `${slug}/index.mdx`);
    try {
      const stream = createReadStream(contentPath, { encoding: "utf-8" });
      for await (const chunk of stream) {
        rawMdx += chunk;
      }
    } catch (error) {
      console.error("Error reading local file:", error);
      return [];
    }
  }

  let match;
  while ((match = headingsRegex.exec(rawMdx)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    extractedHeadings.push({
      level,
      text,
      href: `#${sluggify(text)}`,
    });
  }

  return extractedHeadings;
}

// Navigation
export function getPreviousNext(path: string) {
  const index = pathIndexMap.get(`/${path}`);
  if (index === undefined || index === -1) {
    return { prev: null, next: null };
  }
  const prev = index > 0 ? page_routes[index - 1] : null;
  const next = index < page_routes.length - 1 ? page_routes[index + 1] : null;
  return { prev, next };
}

// Blocks Handling
export async function getBlocksForSlug(slug: string) {
  try {
    const contentPath = getBlocksContentPath(slug);
    const rawMdx = await fs.readFile(contentPath, "utf-8");
    return await parseMdx<BaseMdxFrontmatter>(rawMdx);
  } catch (err) {
    console.error(err);
    return null;
  }
}
function getBlocksContentPath(slug: string) {
  return path.join(process.cwd(), "/contents/blocks/", `${slug}/index.mdx`);
}
export async function getAllBlocks() {
  const blocksFolder = path.join(process.cwd(), "/contents/blocks/");
  const files = await fs.readdir(blocksFolder);
  const uncheckedRes = await Promise.all(
    files.map(async (file) => {
      if (!file.endsWith(".mdx")) return undefined;
      const filepath = path.join(process.cwd(), `/contents/blocks/${file}`);
      const rawMdx = await fs.readFile(filepath, "utf-8");
      return {
        ...matter(rawMdx).data as BaseMdxFrontmatter,
        slug: file.split(".")[0],
      };
    })
  );
  return uncheckedRes.filter((it) => !!it) as (BaseMdxFrontmatter & {
    slug: string;
  })[];
}
// Utility Functions
function sluggify(text: string) {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9\u4e00-\u9fa5\-_]/g, "");
}
// Code Copy Helpers
const preProcess = () => (tree: any) => {
  visit(tree, (node) => {
    if (node?.type === "element" && node?.tagName === "pre") {
      const [codeEl] = node.children;
      if (codeEl.tagName !== "code") return;
      node.raw = codeEl.children?.[0].value;
    }
  });
};

const postProcess = () => (tree: any) => {
  visit(tree, "element", (node) => {
    if (node?.type === "element" && node?.tagName === "pre") {
      node.properties = node.properties || {};
      node.properties["raw"] = node.raw;
    }
  });
};