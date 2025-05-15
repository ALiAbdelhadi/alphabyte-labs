"use client"

import { useEffect, useState } from "react"
import { Droplets } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export type ProductIP = "IP20" | "IP44" | "IP54" | "IP65" | "IP68"

const PRODUCT_IP_OPTIONS_MAP: Record<
  ProductIP,
  { label: string; description: string; increaseOnPricePercent: number }
> = {
  IP20: {
    label: "IP 20",
    description: "Protected against solid objects over 12mm",
    increaseOnPricePercent: 0,
  },
  IP44: {
    label: "IP 44",
    description: "Protected against water splashes from all directions",
    increaseOnPricePercent: 0.04,
  },
  IP54: {
    label: "IP 54",
    description: "Protected against dust and water splashes",
    increaseOnPricePercent: 0.06,
  },
  IP65: {
    label: "IP 65",
    description: "Dust tight and protected against water jets",
    increaseOnPricePercent: 0.08,
  },
  IP68: {
    label: "IP 68",
    description: "Dust tight and protected against long periods of immersion",
    increaseOnPricePercent: 0.1,
  },
}

interface ProductIPSelectorProps {
  value: ProductIP
  onValueChange: (newValue: ProductIP, newPrice?: number) => void
  title?: string
  basePrice: number
  disabled?: boolean
}

export function ProductIPSelector({
  value,
  onValueChange,
  title = "Water Resistance (IP Rating)",
  disabled = false,
  basePrice,
}: ProductIPSelectorProps) {
  const [selectedIp, setSelectedIp] = useState<ProductIP>(value)

  useEffect(() => {
    setSelectedIp(value)
  }, [value])

  const handleIpChange = (newIp: ProductIP) => {
    if (disabled) return
    setSelectedIp(newIp)

    const { increaseOnPricePercent } = PRODUCT_IP_OPTIONS_MAP[newIp]
    const additionalPrice = basePrice * increaseOnPricePercent
    onValueChange(newIp, additionalPrice)
  }

  return (
    <div className="space-y-2">
      {title && <h3 className="text-lg font-semibold mb-2">{title}</h3>}
      <div className="grid sm:grid-cols-3 grid-cols-1 gap-2">
        {Object.entries(PRODUCT_IP_OPTIONS_MAP).map(
          ([ip, { label, description }]) => (
            <TooltipProvider key={ip}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={() => handleIpChange(ip as ProductIP)}
                    variant={selectedIp === ip ? "default" : "outline"}
                    disabled={disabled}
                    className={cn(
                      "flex items-center justify-center w-full rounded-full",
                      "transition-colors duration-150 ease-in-out",
                      selectedIp === ip
                        ? "bg-primary text-primary-foreground"
                        : "bg-background hover:bg-secondary text-secondary-foreground",
                      disabled && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    <Droplets className="w-4 h-4 mr-1 flex-shrink-0" />
                    <span className="ml-1 truncate">{label}</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="sm:block hidden font-medium">
                  {description}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )
        )}
      </div>
    </div>
  )
}
