import React from "react"

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
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/library/button"

const AlertDialogLgDemo = () => {
  return (
    <div className="flex flex-col gap-4">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline">Top Dialog</Button>
        </AlertDialogTrigger>
        <AlertDialogContent position="top">
          <AlertDialogHeader>
            <AlertDialogTitle>Top Dialog</AlertDialogTitle>
            <AlertDialogDescription>
              This is an example of a dialog positioned at the top.
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

export default AlertDialogLgDemo
