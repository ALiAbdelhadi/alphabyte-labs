"use client"

import React, { useEffect, useState } from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export type ProductColorTemp = "warm" | "cool" | "white"

export interface ColorTemperatureOption {
  value: ProductColorTemp
  label: string
  icon?: React.ReactNode
}

const DEFAULT_OPTIONS: ColorTemperatureOption[] = [
  { value: "warm", label: "Warm" },
  { value: "cool", label: "Cool" },
  { value: "white", label: "White" },
]

interface ColorTemperatureSelectorProps {
  value: ProductColorTemp
  onValueChange: (newValue: ProductColorTemp) => void
  options?: ColorTemperatureOption[]
  title?: string
  disabled?: boolean
  className?: string
  buttonClassName?: string
}

export function ColorTemperatureSelector({
  value,
  onValueChange,
  options = DEFAULT_OPTIONS,
  title = "Color Temperature",
  disabled = false,
  className,
  buttonClassName,
}: ColorTemperatureSelectorProps) {
  const [selectedValue, setSelectedValue] = useState<ProductColorTemp>(value)

  useEffect(() => {
    setSelectedValue(value)
  }, [value])

  const handleSelectionChange = (newValue: ProductColorTemp) => {
    if (disabled || newValue === selectedValue) return

    setSelectedValue(newValue)
    onValueChange(newValue)
  }

  return (
    <div className={cn("space-y-2", className)}>
      {title && <h3 className="text-lg font-semibold mb-2">{title}</h3>}
      <div className="grid grid-cols-3 gap-2">
        {options.map((option) => (
          <Button
            key={option.value}
            onClick={() => handleSelectionChange(option.value)}
            variant={selectedValue === option.value ? "default" : "outline"}
            disabled={disabled}
            className={cn(
              "flex items-center justify-center p-0 m-0 rounded-full transition-all duration-200",
              selectedValue === option.value
                ? "bg-primary text-primary-foreground shadow-lg"
                : "bg-background hover:bg-secondary",
              disabled && "opacity-50 cursor-not-allowed",
              buttonClassName
            )}
          >
            {option.label}
          </Button>
        ))}
      </div>
    </div>
  )
}
