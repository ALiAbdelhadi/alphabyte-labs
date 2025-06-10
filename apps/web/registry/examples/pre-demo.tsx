import { cn } from "@/lib/utils"
import Pre from "@/registry/ui/pre"

export default function PreDemo({ className }: { className?: string }) {
  const ExampleCode = `function MyComponent(props) {
   return (
      <div>
         <h1>Hello, {props.name}!</h1>
         <p>This is an example React component.</p>
      </div>
   )};`
  return (
    <Pre
      className={cn("", className)}
      highlightLines={[4]}
      showLineNumbers={true}
    >
      {ExampleCode}
    </Pre>
  )
}