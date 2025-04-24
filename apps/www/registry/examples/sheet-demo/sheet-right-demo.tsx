import { Settings } from "lucide-react"

import { Button } from "@/components/library/button"
import { Checkbox } from "@/components/library/checkbox"
import { Label } from "@/components/library/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/library/sheet"

const SheetRightBottom = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Settings size={16} />
          Open Settings
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Settings</SheetTitle>
          <SheetDescription>
            Configure your application preferences here
          </SheetDescription>
        </SheetHeader>
        <div className="py-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label
                htmlFor="dark-mode"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Dark Mode
              </Label>
              <Checkbox id="dark-mood" />
            </div>
            <div className="flex items-center justify-between">
              <Label
                htmlFor="notification"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Notification
              </Label>
              <Checkbox id="notification" />
            </div>
            <div className="flex items-center justify-between">
              <Label
                htmlFor="email-updates"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Email Updates
              </Label>
              <Checkbox id="email-updates" />
            </div>
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button>Save Changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default SheetRightBottom
