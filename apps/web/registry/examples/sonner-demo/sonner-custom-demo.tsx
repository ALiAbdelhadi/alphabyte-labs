import { Button } from "@/components/library/button"
import { toast } from "sonner"

const SonnerCustomDemo = () => {
  const promise = () => new Promise((resolve) => setTimeout(() => resolve({ name: 'Sonner' }), 2000));
  return (
    <Button
      variant="outline"
      onClick={() =>
        toast.promise(promise, {
          loading: 'Loading...',
          success: () => {
            return `Sonner toast has been added`;
          },
          error: 'Error',
        }
        )
      }
    >
      Show Toast
    </Button>
  )
}

export default SonnerCustomDemo
