import { HslColor, OklchColor, RgbColor } from "@/types"
import { formatHex, oklch } from "culori"

import { hexToHSL } from "./color-utils"
export function hexToHSLImproved(hex: string): HslColor | null {
  if (!hex || !hex.startsWith("#")) return null

  try {
    const color = hexToHSL(hex)
    if (color) {
      return {
        h: Math.round(color.h || 0),
        s: Math.round((color.s || 0) * 100),
        lightness: Math.round((color.lightness || 0) * 100),
      }
    }
    let r = 0,
      g = 0,
      b = 0
    if (hex.length === 4) {
      r = parseInt(hex[1] + hex[1], 16)
      g = parseInt(hex[2] + hex[2], 16)
      b = parseInt(hex[3] + hex[3], 16)
    } else if (hex.length === 7) {
      r = parseInt(hex.substring(1, 3), 16)
      g = parseInt(hex.substring(3, 5), 16)
      b = parseInt(hex.substring(5, 7), 16)
    } else {
      return null 
    }

    r /= 255
    g /= 255
    b /= 255

    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h = 0,
      s = 0
    const l = (max + min) / 2

    if (max !== min) {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0)
          break
        case g:
          h = (b - r) / d + 2
          break
        case b:
          h = (r - g) / d + 4
          break
      }

      h /= 6
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      lightness: Math.round(l * 100),
    }
  } catch (error) {
    console.error("Error in hexToHSL:", error)
    return null
  }
}

export function rgbToHex(rgb: RgbColor): string {
  try {
    const color = {
      mode: "rgb",
      r: rgb.red / 255,
      g: rgb.green / 255,
      b: rgb.blue / 255,
    }
    return formatHex(color)
  } catch (error) {
    console.error("Error converting RGB to hex:", error)
    return "#000000"
  }
}

export function hslToHex(hsl: HslColor): string {
  try {
    const color = {
      mode: "hsl",
      h: hsl.h,
      s: hsl.s / 100,
      l: hsl.lightness / 100,
    }
    return formatHex(color)
  } catch (error) {
    console.error("Error converting HSL to hex:", error)
    return "#000000"
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

export function hslToCssVar(hsl: HslColor): string {
  if (!hsl) {
    console.error("Invalid HSL value:", hsl)
    return "0 0% 0%" // قيمة افتراضية
  }
  return `${hsl.h} ${hsl.s}% ${hsl.lightness}%`
}

export function generatePalette(baseHex: string, steps = 10): string[] {
  const baseHsl = hexToHSL(baseHex) || hexToHSLImproved(baseHex)
  if (!baseHsl) {
    console.error("Could not convert hex to HSL:", baseHex)
    return []
  }

  const palette: string[] = []

  try {
    // توليد ظلال أفتح
    for (let i = 1; i <= steps; i++) {
      const lightness = Math.min(
        baseHsl.lightness + (i * (100 - baseHsl.lightness)) / steps,
        98
      )
      const saturation = Math.max(
        baseHsl.s - (i * baseHsl.s) / (steps * 2),
        baseHsl.s / 2
      )
      palette.push(
        hslToHex({
          h: baseHsl.h,
          s: saturation,
          lightness,
        })
      )
    }

    palette.push(baseHex)

    for (let i = 1; i <= steps; i++) {
      const lightness = Math.max(
        baseHsl.lightness - (i * baseHsl.lightness) / steps,
        5
      )
      const saturation = Math.min(
        baseHsl.s + (i * (100 - baseHsl.s)) / (steps * 2),
        baseHsl.s * 1.2
      )

      palette.push(
        hslToHex({
          h: baseHsl.h,
          s: saturation,
          lightness,
        })
      )
    }

    return palette
  } catch (error) {
    console.error("Error generating palette:", error)
    return [baseHex]
  }
}

export function generateTheme(primaryHex: string): Record<string, string> {
  console.log("Generating theme from primary color:", primaryHex)

  const primary = hexToHSL(primaryHex) || hexToHSLImproved(primaryHex)
  if (!primary) {
    console.error("Could not convert primary hex to HSL:", primaryHex)
    return {}
  }

  try {
    const complementaryHue = (primary.h + 180) % 360

    const analogous1Hue = (primary.h + 30) % 360
    const analogous2Hue = (primary.h - 30 + 360) % 360

    const triadic1Hue = (primary.h + 120) % 360
    const triadic2Hue = (primary.h + 240) % 360

    const theme = {
      background: hslToCssVar({ h: primary.h, s: 15, lightness: 98 }),
      foreground: hslToCssVar({ h: primary.h, s: 10, lightness: 15 }),
      primary: hslToCssVar(primary),
      "primary-foreground": hslToCssVar({ h: primary.h, s: 5, lightness: 98 }),
      secondary: hslToCssVar({
        h: primary.h,
        s: Math.max(primary.s - 30, 10),
        lightness: 65,
      }),
      "secondary-foreground": hslToCssVar({
        h: primary.h,
        s: 10,
        lightness: 20,
      }),

      accent: hslToCssVar({ h: analogous1Hue, s: primary.s, lightness: 45 }),
      "accent-foreground": hslToCssVar({
        h: analogous1Hue,
        s: 5,
        lightness: 98,
      }),

      muted: hslToCssVar({ h: primary.h, s: 10, lightness: 85 }),
      "muted-foreground": hslToCssVar({ h: primary.h, s: 10, lightness: 35 }),

      destructive: hslToCssVar({ h: 350, s: 70, lightness: 45 }),
      "destructive-foreground": hslToCssVar({ h: 350, s: 5, lightness: 98 }),

      border: hslToCssVar({ h: primary.h, s: 10, lightness: 70 }),
      input: hslToCssVar({ h: 0, s: 0, lightness: 100 }),
      ring: hslToCssVar({ h: primary.h, s: 70, lightness: 55 }),

      "chart-1": hslToCssVar(primary),
      "chart-2": hslToCssVar({ h: analogous1Hue, s: 60, lightness: 50 }),
      "chart-3": hslToCssVar({ h: analogous2Hue, s: 60, lightness: 50 }),
      "chart-4": hslToCssVar({ h: triadic1Hue, s: 60, lightness: 50 }),
      "chart-5": hslToCssVar({ h: triadic2Hue, s: 60, lightness: 50 }),
    }

    console.log("Generated theme:", theme)
    return theme
  } catch (error) {
    console.error("Error generating theme:", error)
    return {}
  }
}

export function generateDarkTheme(
  lightTheme: Record<string, string>
): Record<string, string> {
  const darkTheme: Record<string, string> = {}

  try {
    Object.entries(lightTheme).forEach(([key, value]) => {
      if (!value) {
        console.warn(`Missing value for key: ${key}`)
        darkTheme[key] = "0 0% 0%"
        return
      }
      const parts = value.split(" ")
      if (parts.length !== 3) {
        console.warn(`Invalid HSL format for key ${key}: ${value}`)
        darkTheme[key] = "0 0% 0%"
        return
      }

      const h = Number.parseInt(parts[0], 10)
      const s = Number.parseInt(parts[1], 10)
      const l = Number.parseInt(parts[2], 10)
      let darkLightness: number
      if (key === "background") {
        darkLightness = 10 
      } else if (key === "foreground") {
        darkLightness = 90 
      } else if (key.includes("foreground")) {
        darkLightness = Math.min(l + 70, 95)
      } else if (key.includes("muted")) {
        darkLightness = Math.max(l - 70, 15)
      } else if (key.includes("destructive")) {
        darkLightness = Math.min(l + 15, 60)
      } else if (key.includes("chart")) {
        darkLightness = Math.min(l + 20, 65)
      } else {
        darkLightness = 100 - l
        if (darkLightness < 15) darkLightness = 15
        if (darkLightness > 85) darkLightness = 85
      }
      let darkSaturation = s
      if (!key.includes("foreground") && !key.includes("background")) {
        darkSaturation = Math.min(s + 10, 100)
      }

      darkTheme[key] = `${h} ${darkSaturation}% ${darkLightness}%`
    })

    return darkTheme
  } catch (error) {
    console.error("Error generating dark theme:", error)
    return {}
  }
}
