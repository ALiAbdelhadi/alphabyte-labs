import { Button } from "@/registry/ui/button"
import { toast } from "sonner"

export default function SonnerSuccessDemo() {
  return (
    <Button
      variant="outline"
      onClick={() => toast.success("Event has been created successfully")}
    >
      Show Toast
    </Button>
  )
}