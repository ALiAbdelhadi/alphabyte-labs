import { CodeBlockWrapper } from "@/components/CodeBlockWrapper"
import Mermaid from "@/components/library/mermaid"
import Note from "@/components/library/note"
import { Step, StepItem } from "@/components/library/step"
import CodeBlock from "@/components/markdown/CodeBlock"
import ComponentPreview from "@/components/markdown/ComponentPreview"
import FolderTreeExampleMarkdown from "@/components/markdown/FolderTreeExampleMarkdown"
import ProseBadge from "@/components/markdown/ProseBadge"
import Pre from "@/components/ui/pre"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const MdxComponent = {
   Mermaid,
   Note,
   pre: Pre,
   Step,
   StepItem,
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
}
