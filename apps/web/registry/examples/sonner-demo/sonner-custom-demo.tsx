import { toast } from "sonner"
import { Button } from "@/components/ui/button"

const SonnerCustomDemo = () => {
  const promise = () =>
    new Promise((resolve) =>
      setTimeout(() => resolve({ name: "Sonner" }), 2000)
    )
  return (
    <Button
      variant="outline"
      onClick={() =>
        toast.promise(promise, {
          loading: "Loading...",
          success: () => {
            return `Sonner toast has been added`
          },
          error: "Error",
        })
      }
    >
      Show Toast
    </Button>
  )
}

export default SonnerCustomDemo
