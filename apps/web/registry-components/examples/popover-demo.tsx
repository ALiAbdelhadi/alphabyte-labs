import { Button } from "@/components/library/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/library/popover"

export default function PopoverDemo() {
  return (
    <div className="flex justify-center">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Click for Information</Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="space-y-2">
            <h3 className="font-medium">What is a Popover?</h3>
            <p className="text-sm text-gray-500">
              A popover is a floating card that appears when a user interacts
              with a trigger element. It's commonly used for additional
              information or controls.
            </p>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
