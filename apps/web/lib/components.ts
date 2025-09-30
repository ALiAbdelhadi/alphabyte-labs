import BlockPreview from "@/components/block-preview"
import { CodeBlockWrapper } from "@/components/code-block-wrapper"
import { ComponentsList } from "@/components/components-list"
import { CliCodeTabs } from "@/components/markdown/cli-code-tabs"
import { CodeCommands } from "@/components/markdown/code-commands"
import ComponentPreview from "@/components/markdown/component-preview"
import ComponentSource from "@/components/markdown/component-source-code"
import ComponentUtils, {
  ComponentUtilsText,
} from "@/components/markdown/component-utils"
import MdxBadge from "@/components/markdown/mdx-badge"
import Pre from "@/components/pre"
import { Step, StepItem } from "@/components/step"
import { TabsContent, TabsList, TabsTrigger } from "@/components/ui/custom-tabs"
import { Note } from "@/components/ui/note"
import FolderTreeDemo from "@/registry/examples/folder-tree-demo"
import StatusBar from "@/registry/view/status-bar-1/components/status-bar"
import StatusPage from "@/registry/view/status-bar-1/page"
import { ChevronRightIcon } from "lucide-react"
import { MDXComponents } from "mdx/types"

export const components: MDXComponents = {
  Pre,
  ComponentPreview,
  ComponentSource,
  MdxBadge,
  ComponentUtils,
  FolderTreeDemo,
  CodeBlockWrapper,
  Step,
  StepItem,
  Note,
  ComponentUtilsText,
  ComponentsList,
  // Blocks
  BlockPreview,
  // icons
  ChevronRightIcon,

  // Custom blocks
  // Add any custom blocks or components here
  StatusPage,
  StatusBar,
  CliCodeTabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  CodeCommands
}


export function buildAddCommands(slug: string) {
  return {
    pnpm: `pnpm dlx alphabyte-cli@latest add ${slug}`,
    npm: `npx alphabyte-cli@latest add ${slug}`,
    yarn: `yarn dlx alphabyte-cli@latest add ${slug}`,
    bun: `bunx alphabyte-cli@latest add ${slug}`,
    deno: `deno run -A npm:alphabyte-cli add ${slug}`,
  }
}

export function buildInitCommands() {
  return {
    pnpm: `pnpm dlx alphabyte-cli@latest init --yes`,
    npm: `npx alphabyte-cli@latest init --yes`,
    yarn: `yarn dlx alphabyte-cli@latest init --yes`,
    bun: `bunx alphabyte-cli@latest init --yes`,
    deno: `deno run -A npm:alphabyte-cli init --yes`,
  }
}