import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/library/alert-dialog"
import { Button } from "@/components/library/button"

const AlertDialogSmDemo = () => {
  return (
    <div className="flex flex-col gap-4">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline">Small Dialog</Button>
        </AlertDialogTrigger>
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogTitle>Small Dialog</AlertDialogTitle>
            <AlertDialogDescription>
              This is an example of a small dialog.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default AlertDialogSmDemo
