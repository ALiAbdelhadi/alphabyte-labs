import { Button } from "@/registry/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/ui/dialog"

export default function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Top Dialog</Button>
      </DialogTrigger>
      <DialogContent position="top">
        <DialogHeader>
          <DialogTitle>Top Dialog</DialogTitle>
          <DialogDescription>
            This is an example of a dialog positioned at the top.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}