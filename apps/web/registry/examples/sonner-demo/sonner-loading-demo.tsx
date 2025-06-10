import { Button } from "@/registry/ui/button"
import { toast } from "sonner"

export default function SonnerLoadingDemo() {
  return (
    <Button variant="outline" onClick={() => toast.loading("Event is loading")}>
      Show Toast
    </Button>
  )
}