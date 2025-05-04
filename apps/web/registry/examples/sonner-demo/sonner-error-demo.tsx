import { toast } from "sonner"

import { Button } from "@/components/library/button"

const SonnerErrorDemo = () => {
  return (
    <Button
      variant="outline"
      onClick={() => toast.error("Unexpected error white creating event")}
    >
      Show Toast
    </Button>
  )
}

export default SonnerErrorDemo
