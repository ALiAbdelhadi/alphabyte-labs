import { Checkbox } from "@/components/library/checkbox"
import { Label } from "@/components/library/label"

const LabelDemo = () => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <Label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Accept terms and conditions
      </Label>
    </div>
  )
}

export default LabelDemo
