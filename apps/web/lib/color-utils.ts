import type { HslColor, OklchColor, RgbColor } from "@/types"
import {
    rgb,
    hsl,
    oklch,
    formatHex,
    formatRgb as culoriFormatRgb,
    formatHsl as culoriFormatHsl,
    formatCss,
} from "culori"


export function hexToRgb(hex: string): RgbColor | null {
    if (!hex || hex === "") return null

    try {
        const color = rgb(hex)
        if (!color) return null

        return {
            red: Math.round(color.r * 255),
            green: Math.round(color.g * 255),
            blue: Math.round(color.b * 255),
        }
    } catch (error) {
        console.error("Error converting hex to RGB:", error)
        return null
    }
}

export function hexToHSL(hex: string): HslColor | null {
    if (!hex || hex === "") return null

    try {
        const color = hsl(hex)
        if (!color) return null

        return {
            h: Math.round(color.h || 0),
            s: Math.round((color.s || 0) * 100),
            lightness: Math.round((color.l || 0) * 100),
        }
    } catch (error) {
        console.error("Error converting hex to HSL:", error)
        return null
    }
}


export function hexToOklch(hex: string): OklchColor | null {
    if (!hex || hex === "") return null

    try {
        const color = oklch(hex)
        if (!color) return null

        return {
            l: Number(color.l.toFixed(3)),
            c: Number(color.c.toFixed(3)),
            h: Number(color.h?.toFixed(1)),
        }
    } catch (error) {
        console.error("Error converting hex to OKLCH:", error)
        return null
    }
}


export function formatRgb(rgb: RgbColor): string {
    return `rgb(${rgb.red}, ${rgb.green}, ${rgb.blue})`
}

export function formatHsl(hsl: HslColor): string {
    return `hsl(${hsl.h}, ${hsl.s}%, ${hsl.lightness}%)`
}
export function formatOklch(oklch: OklchColor): string {
    return `oklch(${oklch.l} ${oklch.c} ${oklch.h})`
}
function culoriFormatOklch(color: any) {
    return formatCss(oklch(color))
}
export function convertColor(color: string, format: "rgb" | "hsl" | "oklch" | "hex") {
    try {
        switch (format) {
            case "rgb":
                return culoriFormatRgb(rgb(color))
            case "hsl":
                return culoriFormatHsl(hsl(color))
            case "oklch":
                return culoriFormatOklch(color)
            case "hex":
                return formatHex(color)
            default:
                return color
        }
    } catch (error) {
        console.error(`Error converting color to ${format}:`, error)
        return null
    }
}

