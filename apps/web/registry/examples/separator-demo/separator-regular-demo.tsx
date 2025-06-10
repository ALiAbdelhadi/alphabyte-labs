import { Separator } from "@/registry/ui/separator"

export default function SeparatorRegularDemo() {
  return (
    <div className="p-4 rounded-lg ">
      <div className="p-4">Content Above</div>
      <Separator weight="regular" />
      <div className="p-4">Content Below</div>
    </div>
  )
}