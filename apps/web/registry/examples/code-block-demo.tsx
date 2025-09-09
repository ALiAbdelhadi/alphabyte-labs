import { cn } from "@/lib/utils"
import Pre from "@/components/pre"

export default function CodeBlockDemo({ className }: { className?: string }) {
  const exampleCode = `import React from 'react'
import { Button } from '@/components/ui/button'

interface Props {
  title: string
  description?: string
  onAction?: () => void
}

export function MyComponent({ title, description, onAction }: Props) {
  return (
    <div className="p-6 bg-background border rounded-lg">
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      {description && (
        <p className="text-muted-foreground mb-4">{description}</p>
      )}
      <Button onClick={onAction} className="w-full">
        Click me
      </Button>
    </div>
  )
}`

  return (
    <Pre
      className={cn("language-tsx", className)}
      title="MyComponent.tsx"
      description="A reusable React component with TypeScript"
      highlightLines={[4, 12]}
      showLineNumbers={true}
      enableSearch={true}
      maxHeight={400}
    >
      {exampleCode}
    </Pre>
  )
}
