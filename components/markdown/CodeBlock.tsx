import { cn } from "@/lib/utils"
import Pre from "../ui/pre"

const CodeBlock = ({ className }: { className: string }) => {
   const ExampleCode = `function MyComponent(props) {
   return (
      <div>
         <h1>Hello, {props.name}!</h1>
         <p>This is an example React component.</p>
      </div>
   )};`
   return (
      <Pre className={cn("", className)} highlightLines={[4]}>
         {ExampleCode}
      </Pre>
   )
}

export default CodeBlock