declare module "next-mdx-remote/rsc" {
  import { ComponentType, ReactNode } from "react"

  interface CompileMDXResult<TFrontmatter> {
    frontmatter: TFrontmatter
    content: ReactNode
  }

  export function compileMDX<TFrontmatter>(options: {
    source: string
    options?: {
      parseFrontmatter?: boolean
      mdxOptions?: {
        rehypePlugins?: any[]
        remarkPlugins?: any[]
      }
    }
    components?: Record<string, ComponentType<any>>
  }): Promise<CompileMDXResult<TFrontmatter>>
}
