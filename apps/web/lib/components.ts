import BlockPreview from "@/components/block-preview"
import { CodeBlockWrapper } from "@/components/code-block-wrapper"
import { ComponentsList } from "@/components/components-list"
import ComponentPreview from "@/components/markdown/component-preview"
import ComponentSource from "@/components/markdown/component-source-code"
import ComponentUtils, {
  ComponentUtilsText,
} from "@/components/markdown/component-utils"
import MdxBadge from "@/components/markdown/mdx-badge"
import Pre from "@/components/pre"
import { Step, StepItem } from "@/components/step"
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
}
