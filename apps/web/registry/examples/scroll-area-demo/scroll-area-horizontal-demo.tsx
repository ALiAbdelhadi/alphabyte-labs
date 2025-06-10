import { ScrollArea } from "@/registry/ui/scroll-area"

export default function ScrollAreaHorizontalDemo() {
  return (
    <div className="w-full max-w-3xl mx-auto p-6 border rounded-md">
      <ScrollArea className="h-[200px] w-full">
        <div className="flex p-4 gap-4">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="flex-shrink-0 !w-[200px] !h-[150px] rounded-md bg-muted flex items-center justify-center"
            >
              Card {i + 1}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}