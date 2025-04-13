import BlockPreview from "@/components/block-preview"
import { CodeBlockWrapper } from "@/components/code-block-wrapper"
import { Note } from "@/components/library/note"
import { Step, StepItem } from "@/components/library/step"
import ComponentPreview from "@/components/markdown/component-preview"
import ComponentSource from "@/components/markdown/component-source-code"
import ComponentUtils, { ComponentUtilsText } from "@/components/markdown/component-utils"
import MdxBadge from "@/components/markdown/mdx-badge"
import Pre from "@/components/pre"
import FolderTreeDemo from "@/registry-components/examples/folder-tree-demo"
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
  // Blocks
  BlockPreview,
  // icons
  ChevronRightIcon,
}
