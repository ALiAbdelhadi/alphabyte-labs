import { toast } from "sonner"

import { Button } from "@/components/library/button"

const SonnerWarningDemo = () => {
  return (
    <Button
      variant="outline"
      onClick={() => toast.warning("You can't undo this action")}
    >
      Show Toast
    </Button>
  )
}

export default SonnerWarningDemo
