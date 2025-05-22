"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { ColorFormat } from "@/types"
import { Check, ChevronDown } from 'lucide-react'
import { useState } from "react"

interface ColorFormatToggleProps {
  onFormatChange: (format: ColorFormat) => void
}

export function ColorFormatToggle({ onFormatChange }: ColorFormatToggleProps) {
  const [format, setFormat] = useState<ColorFormat>("hex")

  const handleFormatChange = (newFormat: ColorFormat) => {
    setFormat(newFormat)
    onFormatChange(newFormat)
  }

  const formatLabels: Record<ColorFormat, string> = {
    hex: "HEX (#ffffff)",
    rgb: "RGB (255, 255, 255)",
    hsl: "HSL (0, 0%, 100%)",
    oklch: "OKLCH (1, 0, 0)",
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button  className="flex items-center gap-2 h-6 px-1.5">
          <span className="font-medium">Format:</span>
          <span className="text-muted-foreground font-mono uppercase">{format}</span>
          <ChevronDown className="h-4 w-4 text-muted-foreground ml-1" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Color Format</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {(Object.keys(formatLabels) as ColorFormat[]).map((formatKey) => (
          <DropdownMenuItem
            key={formatKey}
            onClick={() => handleFormatChange(formatKey)}
            className="flex items-center justify-between py-2"
          >
            <div className="flex flex-col">
              <span className="font-medium uppercase">{formatKey}</span>
              <span className="text-xs text-muted-foreground font-mono">
                {formatLabels[formatKey]}
              </span>
            </div>
            {format === formatKey && <Check className="h-4 w-4 ml-2" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
