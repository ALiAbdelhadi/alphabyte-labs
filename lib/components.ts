import BlockPreview from "@/components/blocks/block-preview"
import CarouselCompForProject from "@/components/blocks/Carousel/CarouselBigContainer"
import CarouselContainer from "@/components/blocks/Carousel/CarouselContainer"
import { Navbar } from "@/components/blocks/navbar"
import TimelineContainer from "@/components/blocks/timeline/TimelineContainer"
import { CodeBlockWrapper } from "@/components/CodeBlockWrapper"
import { Button } from "@/components/library/button"
import { Input } from "@/components/library/input"
import { Label } from "@/components/library/label"
import Mermaid from "@/components/library/mermaid"
import { Note } from "@/components/library/note"
import ProductCard from "@/components/library/product-card"
import { Step, StepItem } from "@/components/library/step"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/library/tabs"
import ComponentPreview from "@/components/markdown/component-preview"
import MdxBadge from "@/components/markdown/mdx-badge"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import Pre from "@/components/ui/pre"
import CodeBlockDemo from "@/registry-components/examples/code-block-demo"
import FolderTreeDemo from "@/registry-components/examples/folder-tree-demo"
import TabsDemo from "@/registry-components/examples/tabs-demo"
import { ChevronRightIcon } from "lucide-react"
import { MDXComponents } from "mdx/types"

export const components: MDXComponents = {
   Pre,
   Tabs,
   TabsContent,
   TabsList,
   TabsTrigger,
   // Markdown Components
   ComponentPreview,
   CodeBlockDemo,
   MdxBadge,
   CodeBlockWrapper,
   FolderTreeDemo,
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
   Input,
   Label,
   // Blocks
   BlockPreview,
   TimelineContainer,
   CarouselContainer,
   CarouselCompForProject,
   Navbar,
   // icons
   ChevronRightIcon,
   // Markdown
   TabsDemo
}