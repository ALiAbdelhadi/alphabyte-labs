import { useEffect, useState } from "react"
import type { Color, ColorFormat } from "@/types"
import { Check, Copy } from "lucide-react"
import { toast } from "sonner"

import {
  formatHsl,
  formatOklch,
  formatRgb,
  hexToHSL,
  hexToOklch,
  hexToRgb,
} from "@/lib/color-utils"
import { cn } from "@/lib/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/library/tooltip"

interface ColorSwatchProps {
  color: Color
  globalFormat?: ColorFormat
}

export function ColorSwatch({ color, globalFormat }: ColorSwatchProps) {
  const [copied, setCopied] = useState(false)
  const [format, setFormat] = useState<ColorFormat>("hex")
  useEffect(() => {
    if (globalFormat && globalFormat !== "hex") {
      setFormat(globalFormat)
    }
  }, [globalFormat])
  const { name, hex } = color
  const rgb = hexToRgb(hex)
  const hsl = hexToHSL(hex)
  const oklch = hexToOklch(hex)
  const formatMap = {
    hex,
    rgb: rgb ? formatRgb(rgb) : "",
    hsl: hsl ? formatHsl(hsl) : "",
    oklch: oklch ? formatOklch(oklch) : "",
  }
  const currentValue = formatMap[format] || hex
  const copyToClipboard = () => {
    if (!currentValue) return
    navigator.clipboard.writeText(currentValue)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast.message(`Copied ${currentValue} to clipboard`, {
      duration: 2000,
    })
  }
  const cycleFormat = () => {
    if (globalFormat && globalFormat !== "hex") return
    const formats: ColorFormat[] = ["hex", "rgb", "hsl", "oklch"]
    const currentIndex = formats.indexOf(format)
    const nextIndex = (currentIndex + 1) % formats.length
    setFormat(formats[nextIndex])
  }

  const isDark = hex
    ? Number.parseInt(hex.replace("#", ""), 16) < 0xffffff / 1.8
    : false

  return (
    <div className="group flex flex-col">
      <div
        className="relative group aspect-[3/1] overflow-hidden w-full flex-1 flex-col sm:aspect-[3/3] sm:h-auto sm:w-auto [&>svg]:absolute [&>svg]:right-4 [&>svg]:top-4 [&>svg]:h-3.5 [&>svg]:w-3.5 [&>svg]:opacity-0 [&>svg]:transition-opacity"
        style={{ backgroundColor: hex || "#ffffff" }}
      >
        <div
          className={cn(
            "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2",
            "bg-black/10 backdrop-blur-sm"
          )}
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={copyToClipboard}
                  className="h-8 w-8 rounded-full bg-white/90 flex items-center justify-center text-black hover:bg-white"
                >
                  {copied ? (
                    <Check
                      strokeWidth={2.3}
                      className="h-4 w-4 text-green-500"
                    />
                  ) : (
                    <Copy strokeWidth={2.3} className="h-4 w-4" />
                  )}
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Copy {format.toUpperCase()} value</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      <div className="p-2 text-xs cursor-pointer" onClick={cycleFormat}>
        <h4 className="font-medium truncate text-center font-mono transition-colors  text-muted-foreground group-hover:text-foreground">
          {name}
        </h4>
        <p className="font-mono text-center text-xs mt-1 truncate  transition-colors text-muted-foreground/80 group-hover:text-foreground/80">
          {currentValue.replace(/\s/g, "")}
        </p>
      </div>
    </div>
  )
}
