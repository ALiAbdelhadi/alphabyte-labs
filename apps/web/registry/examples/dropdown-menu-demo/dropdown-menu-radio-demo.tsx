"use client"

import { useState } from "react"

import { Button } from "@/components/library/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/library/dropdown-menu"

const DropdownRadioDemo = () => {
  const [selectedPlan, setSelectedPlan] = useState("basic")
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Select Plan</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Subscription Plan</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={selectedPlan}
          onValueChange={setSelectedPlan}
        >
          <DropdownMenuRadioItem value="basic">Basic</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="pro">Pro</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="enterprise">
            Enterprise
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default DropdownRadioDemo
