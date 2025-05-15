import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

const HorizontalScrollDemo = () => {
  return (
    <div className="w-full max-w-3xl mx-auto p-6">
      <ScrollArea className="h-32 w-full rounded-md border">
        <div className="flex gap-4 p-4">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-40 h-20 rounded-md bg-gray-100 flex items-center justify-center"
            >
              <span className="text-gray-500">Item {i + 1}</span>
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}

export default HorizontalScrollDemo
