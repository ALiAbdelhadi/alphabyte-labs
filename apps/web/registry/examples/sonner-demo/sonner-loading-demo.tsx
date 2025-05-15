import { toast } from "sonner"

import { Button } from "@/components/ui/button"

const SonnerLoadingDemo = () => {
  return (
    <Button variant="outline" onClick={() => toast.loading("Event is loading")}>
      Show Toast
    </Button>
  )
}

export default SonnerLoadingDemo
