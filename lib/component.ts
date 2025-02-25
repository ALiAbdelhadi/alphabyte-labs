import BlockPreview from "@/components/blocks/BlockPreview"
import CarouselCompForProject from "@/components/blocks/Carousel/CarouselBigContainer"
import CarouselContainer from "@/components/blocks/Carousel/CarouselContainer"
import { Navbar } from "@/components/blocks/NavBar"
import TimelineContainer from "@/components/blocks/timeline/TimelineContainer"
import { CodeBlockWrapper } from "@/components/CodeBlockWrapper"
import { Button } from "@/components/library/Button"
import Mermaid from "@/components/library/mermaid"
import { Note } from "@/components/library/note"
import ProductCard from "@/components/library/ProductCard"
import { Step, StepItem } from "@/components/library/step"
import CodeBlock from "@/components/markdown/CodeBlock"
import ComponentPreview from "@/components/markdown/ComponentPreview"
import FolderTreeExampleMarkdown from "@/components/markdown/FolderTreeExampleMarkdown"
import ProseBadge from "@/components/markdown/ProseBadge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/library/Tab"
import Pre from "@/components/ui/pre"
import { ChevronRightIcon } from "lucide-react"
import TabsMarkdown from "@/components/markdown/TabsMarkdwon"

export const component = {
   pre: Pre,
   Tabs,
   TabsContent,
   TabsList,
   TabsTrigger,
   // Markdown Components
   ComponentPreview,
   CodeBlock,
   ProseBadge,
   CodeBlockWrapper,
   FolderTreeExampleMarkdown,
   // custom components
   Button,
   ProductCard,
   Step,
   StepItem,
   Mermaid,
   Note,
   Pre,
   // Blocks
   // Block preview 
   BlockPreview,
   TimelineContainer,
   CarouselContainer,
   CarouselCompForProject,
   Navbar,
   // icons
   ChevronRightIcon,
   // Markdown
   TabsMarkdown
}
