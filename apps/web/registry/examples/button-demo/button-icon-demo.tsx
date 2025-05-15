import React from "react"
import { ChevronRightIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

const ButtonIconDemo = () => {
  return (
    <Button variant="outline">
      <ChevronRightIcon className="w-6 h-6" />
    </Button>
  )
}

export default ButtonIconDemo
