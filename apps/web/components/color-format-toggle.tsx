"use client"

import { useState } from "react"
import type { ColorFormat } from "@/types"
import { Check, ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface ColorFormatToggleProps {
  onFormatChange: (format: ColorFormat) => void
}

export function ColorFormatToggle({ onFormatChange }: ColorFormatToggleProps) {
  const [format, setFormat] = useState<ColorFormat>("hex")

  const handleFormatChange = (newFormat: ColorFormat) => {
    setFormat(newFormat)
    onFormatChange(newFormat)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center justify-between">
          <p className="text-xs">
            Formate :{" "}
            <span className="text-muted-foreground">
              {format === "hex" ? "hex" : format}
            </span>
          </p>
          <ChevronDown className="text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        <DropdownMenuItem
          onClick={() => handleFormatChange("hex")}
          className="flex items-center justify-between text-[13px]"
        >
          hex
          {format === "hex" && <Check className="h-4 w-4 ml-2" />}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleFormatChange("rgb")}
          className="flex items-center justify-between text-[13px]"
        >
          rgb
          {format === "rgb" && <Check className="h-4 w-4 ml-2" />}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleFormatChange("hsl")}
          className="flex items-center justify-between text-[13px]"
        >
          hsl
          {format === "hsl" && <Check className="h-4 w-4 ml-2" />}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleFormatChange("oklch")}
          className="flex items-center justify-between text-[13px]"
        >
          olkch
          {format === "oklch" && <Check className="h-4 w-4 ml-2" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
