type servicesLinksProps = {
  title: string
  description: string
  href: string
}

type LinkItems = {
  title: string
  href: string
}

type CodeViewProps = {
  children?: React.ReactNode
  className?: string
  raw?: string
  language?: string
}

type ComponentPreviewProps = {
  children?: React.ReactNode
  code: string
  language?: string
  showPreview?: boolean
  className?: string
  name: string
}
type BlockPreview = {
  children?: React.ReactNode
  code: string
  language?: string
  showPreview?: boolean
  className?: string
  id: string
  BlockName: String
  BlockId: string
}

type search = {
  title: string
  href: string
  snippet?: string
  description?: string
  relevance?: number
}
type PathWithItems = {
  heading?: string
  title?: string
  href: string
  noLink?: boolean
  items?: Paths[]
}

type PathSpacer = {
  spacer: boolean
}

type TocProps = {
  tocs: { href: string; level: number; text: string }[]
}
type EachRoute = {
  title: string
  href: string
  noLink?: true
  items?: EachRoute[]
}
type Page = {
  title: string
  href: string
}

// for [[...slug]]/page.tsx
type Params = {
  params: Promise<{
    slug: string
  }>
}
import type React from "react"
// MDX and Document Types
export interface BaseMdxFrontmatter {
  title: string
  description: string
  keywords: string
}

export interface BlogMdxFrontmatter extends BaseMdxFrontmatter {
  date: string
  author: string
}

export interface TableOfContentsItem {
  level: number
  text: string
  href: string
}

export interface DocumentData {
  frontmatter: BaseMdxFrontmatter
  content: React.ReactNode
  tocs: TableOfContentsItem[]
  lastUpdated: string | null
}

// Routing Types
export interface Page {
  title: string
  href: string
}

export interface EachRoute {
  title: string
  href: string
  heading?: string
  items?: EachRoute[]
  noLink?: boolean
  spacer?: boolean
}

export type Paths = EachRoute

// Props Types
export interface DocsPageProps {
  params: Promise<{ slug?: string[] }>
}
// For colors groups
export interface Color {
  name: string
  hex: string
}

export interface colorPalettes {
  title: string
  colors: Color[]
}

export interface RgbColor {
  red: number
  green: number
  blue: number
}

export interface HslColor {
  h: number
  s: number
  lightness: number
}

export interface OklchColor {
  l: number
  c: number
  h: number
}

export type ColorFormat = "hex" | "rgb" | "hsl" | "oklch"
// sidebar
export interface NavItem {
  id?: string
  title: string
  href?: string
  disabled?: boolean
  external?: boolean
  icon?: keyof typeof Icons
  label?: string
}
export interface NavItemWithChildren extends NavItem {
  items?: NavItemWithChildren[]
}

export interface MainNavItem extends NavItem { }

export interface SidebarItem extends NavItemWithChildren { }
