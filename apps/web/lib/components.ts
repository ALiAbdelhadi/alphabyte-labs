import BlockPreview from "@/components/block-preview"
import { CodeBlockWrapper } from "@/components/code-block-wrapper"
import ComponentSource from "@/components/component-source-code"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/library/alert-dialog"
import { Button } from "@/components/library/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/library/dialog"
import { Input } from "@/components/library/input"
import { Label } from "@/components/library/label"
import Mermaid from "@/components/library/mermaid"
import { Note } from "@/components/library/note"
import ProductCard from "@/components/library/product-card"
import { Step, StepItem } from "@/components/library/steps"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/library/tabs"
import ComponentPreview from "@/components/markdown/component-preview"
import ComponentUtils, { ComponentUtilsText } from "@/components/markdown/component-utils"
import MdxBadge from "@/components/markdown/mdx-badge"
import Pre from "@/components/pre"
import CodeBlockDemo from "@/registry-components/examples/code-block-demo"
import { ChevronRightIcon } from "lucide-react"
import { MDXComponents } from "mdx/types"
export const components: MDXComponents = {
  Pre,
  // Tab 1
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  // Markdown Components
  ComponentPreview,
  ComponentSource,
  CodeBlockDemo,
  MdxBadge,
  CodeBlockWrapper,
  ComponentUtils,
  ComponentUtilsText,
  // custom components
  Button,
  ProductCard,
  Step,
  StepItem,
  Mermaid,
  Note,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Input,
  Label,
  // Blocks
  BlockPreview,
  // icons
  ChevronRightIcon,
}
