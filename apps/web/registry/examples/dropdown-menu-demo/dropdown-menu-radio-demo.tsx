"use client"

import { Button } from "@/registry/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/registry/ui/dropdown-menu"
import { useState } from "react"

export default function DropdownMenuRadioDemo() {
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