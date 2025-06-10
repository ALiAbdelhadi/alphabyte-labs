import { Button } from "@/registry/ui/button"
import { toast } from "sonner"

export default function SonnerErrorDemo() {
  return (
    <Button
      variant="outline"
      onClick={() => toast.error("Unexpected error while creating event")}
    >
      Show Toast
    </Button>
  )
}
