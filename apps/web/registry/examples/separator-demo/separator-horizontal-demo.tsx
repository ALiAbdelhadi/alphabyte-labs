import { Separator } from "@/registry/ui/separator"

export default function SeparatorHorizontalDemo() {
  return (
    <div className="p-4 rounded-lg">
      <div className="p-4">Content Above</div>
      <Separator weight="regular" orientation="horizontal" />
      <div className="p-4">Content Below</div>
    </div>
  )
}