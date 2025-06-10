import React from "react"
import { ChevronRightIcon } from "lucide-react"
import { Button } from "@/registry/ui/button"

export default function ButtonIconDemo() {
  return (
    <Button variant="default" icon={<ChevronRightIcon size={16} />}>
      Next
    </Button>
  )
}
