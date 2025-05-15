import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const DialogBottomDemo = () => {
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

export default DialogBottomDemo
