import BlockPreview from "@/components/blocks/BlockPreview"
import { Carousel } from "@/components/blocks/Carousel/Carousel"
import CarouselCompForProject from "@/components/blocks/Carousel/CarouselBigContainer"
import CarouselContainer from "@/components/blocks/Carousel/CarouselContainer"
import Timeline from "@/components/blocks/Timeline"
import { CodeBlockWrapper } from "@/components/CodeBlockWrapper"
import Mermaid from "@/components/library/mermaid"
import Note from "@/components/library/note"
import ProductCard from "@/components/library/ProductCard"
import { Step, StepItem } from "@/components/library/step"
import CodeBlock from "@/components/markdown/CodeBlock"
import ComponentPreview from "@/components/markdown/ComponentPreview"
import FolderTreeExampleMarkdown from "@/components/markdown/FolderTreeExampleMarkdown"
import ProseBadge from "@/components/markdown/ProseBadge"
import Pre from "@/components/ui/pre"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/CustomeTab"

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
   ProductCard,
   Step,
   StepItem,
   Mermaid,
   Note,
   // Blocks
   // Block preview 
   BlockPreview,
   Carousel,
   Timeline,
   CarouselContainer,
   CarouselCompForProject
}
