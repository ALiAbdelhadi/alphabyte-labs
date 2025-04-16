import {
  Tabs,
  TabsContainer,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

export default function TabsDemo() {
  return (
    <Tabs defaultValue="tab1" className="w-full max-w-md mx-auto">
      <TabsList className="inline-flex h-9 items-center text-muted-foreground max-w-fit justify-start rounded-none bg-transparent">
        <TabsContainer className="bg-muted rounded-[7px]">
          <TabsTrigger value="tab1" className="text-sm sm:px-3 px-1">
            Tab 1
          </TabsTrigger>
          <TabsTrigger value="tab2" className="text-sm sm:px-3 px-1">
            Tab 2
          </TabsTrigger>
          <TabsTrigger value="tab3" className="text-sm sm:px-3 px-1">
            Tab 3
          </TabsTrigger>
        </TabsContainer>
      </TabsList>
      <TabsContent value="tab1">
        <div className="p-4 bg-gray-100 rounded-md">Content for Tab 1</div>
      </TabsContent>
      <TabsContent value="tab2">
        <div className="p-4 bg-gray-100 rounded-md">Content for Tab 2</div>
      </TabsContent>
      <TabsContent value="tab3">
        <div className="p-4 bg-gray-100 rounded-md">Content for Tab 3</div>
      </TabsContent>
    </Tabs>
  )
}
