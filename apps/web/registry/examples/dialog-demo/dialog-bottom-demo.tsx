import { Button } from "@/components/library/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/library/dialog"

const DialogBottomDemo = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Bottom Dialog</Button>
      </DialogTrigger>
      <DialogContent position="bottom">
        <DialogHeader>
          <DialogTitle>Bottom Dialog</DialogTitle>
          <DialogDescription>
            This is an example of a dialog positioned at the bottom.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default DialogBottomDemo
