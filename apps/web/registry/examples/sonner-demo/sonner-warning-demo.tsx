import { Button } from "@/registry/ui/button"
import { toast } from "sonner"

export default function sonnerWarningDemo() {
  return (
    <Button
      variant="outline"
      onClick={() => toast.warning("You can't undo this action")}
    >
      Show Toast
    </Button>
  )
}   