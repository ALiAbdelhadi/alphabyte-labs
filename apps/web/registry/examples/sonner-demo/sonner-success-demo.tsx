import { toast } from "sonner"

import { Button } from "@/components/ui/button"

const SonnerSuccessDemo = () => {
  return (
    <Button
      variant="outline"
      onClick={() => toast.success("Event has been created successfully")}
    >
      Show Toast
    </Button>
  )
}

export default SonnerSuccessDemo
