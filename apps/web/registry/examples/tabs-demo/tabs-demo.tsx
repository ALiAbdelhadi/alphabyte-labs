import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/ui/tabs"

export default function TabsDemo() {
  return (
    <Tabs defaultValue="tab1">
      <TabsList>
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        <TabsTrigger value="tab3">Tab 3</TabsTrigger>
        <TabsTrigger value="tab4">Tab 4</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <div className="p-4 border rounded-lg">
          <h3 className="font-medium">First Tab</h3>
          <div className="text-muted-foreground">Content for the first tab.</div>
        </div>
      </TabsContent>
      <TabsContent value="tab2">
        <div className="p-4 border rounded-lg">
          <h3 className="font-medium">Second Tab</h3>
          <div className="text-muted-foreground">Content for the second tab.</div>
        </div>
      </TabsContent>
      <TabsContent value="tab3">
        <div className="p-4 border rounded-lg">
          <h3 className="font-medium">Third Tab</h3>
          <div className="text-muted-foreground">Content for the third tab.</div>
        </div>
      </TabsContent>
      <TabsContent value="tab4">
        <div className="p-4 border rounded-lg">
          <h3 className="font-medium">Fourth Tab</h3>
          <div className="text-muted-foreground">Content for the fourth tab.</div>
        </div>
      </TabsContent>
    </Tabs>
  )
}
