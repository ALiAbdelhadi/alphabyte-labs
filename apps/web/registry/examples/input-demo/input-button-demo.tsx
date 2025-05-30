import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

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
