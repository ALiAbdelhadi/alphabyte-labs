import { Input } from "@/components/library/input"
import { Label } from "@/components/library/label"

export default function InputFileDemo() {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="picture">Picture</Label>
      <Input id="picture" type="file" />
    </div>
  )
}
