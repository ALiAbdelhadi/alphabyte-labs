import { cn } from "@/lib/utils"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/custom-tabs"

const TabsLineDemo = ({ className }: { className: string }) => {
  return (
    <Tabs defaultValue="preview" className="mt-4 w-full">
      <TabsList className="inline-flex h-9 items-center text-muted-foreground w-full justify-start rounded-none border-b bg-transparent p-0 mb-2">
        <TabsTrigger value="preview" className="active:shadow-none text-base">
          tab one
        </TabsTrigger>
        <TabsTrigger value="code" className="active:shadow-none text-base">
          tab two
        </TabsTrigger>
      </TabsList>
      <div className="w-full">
        <TabsContent
          value="preview"
          className={cn("border rounded-md p-4", className)}
        >
          <div className="h-16 p-5 text-xl">Content One</div>
        </TabsContent>
        <TabsContent value="code" className="rounded-md border p-4">
          <div className="h-16 p-5 text-xl">Content two</div>
        </TabsContent>
      </div>
    </Tabs>
  )
}

export default TabsLineDemo
