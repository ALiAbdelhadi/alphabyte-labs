import { Button } from "@/registry/ui/button"
import { Input } from "@/registry/ui/input"

export default function InputWithButtonDemo() {
  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input type="email" placeholder="Email" />
      <Button type="submit" size={"sm"}>
        Subscribe
      </Button>
    </div>
  )
}
