"use client"

import { useEffect, useState } from "react"
import { ArrowDownToLine, Copy, Download } from "lucide-react"
import { toast } from "sonner"

import { generateDarkTheme, generateTheme } from "@/lib/color-generation-utils"
import Container from "@/components/Container"
import { Button } from "@/components/library/button"
import { Input } from "@/components/library/input"
import { Label } from "@/components/library/label"
import { Note } from "@/components/library/note"
import { Separator } from "@/components/library/separator"
import Pre from "@/components/pre"

export default function ThemeGenerator() {
  const [primaryColor, setPrimaryColor] = useState("#0066CC")
  const [defaultRadius, setDefaultRadius] = useState("0.3")
  const [lightTheme, setLightTheme] = useState<Record<string, string>>({})
  const [darkTheme, setDarkTheme] = useState<Record<string, string>>({})
  const [previewMode, setPreviewMode] = useState<"light" | "dark">("light")
  const [themeVersion, setThemeVersion] = useState(0)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    generateThemes()
  }, [primaryColor])

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--radius",
      `${defaultRadius}rem`
    )
  }, [defaultRadius])

  const generateThemes = () => {
    try {
      const light = generateTheme(primaryColor)
      const dark = generateDarkTheme(light)
      setLightTheme(light)
      setDarkTheme(dark)
      setThemeVersion((prev) => prev + 1)
    } catch (error) {
      console.error("Error generating themes:", error)
      if (typeof toast !== "undefined") {
        toast.error("Error generating theme", {
          description: "Please enter a valid color value",
        })
      }
    }
  }

  const formatCssVariables = (
    theme: Record<string, string>,
    isDark = false
  ) => {
    let css = isDark ? ".dark {\n" : ":root {\n"
    css += `  --radius: ${defaultRadius === "full" ? "9999px" : `${defaultRadius}rem`};\n`

    Object.entries(theme).forEach(([key, value]) => {
      css += `  --${key}: ${value};\n`
    })

    css += "}"
    return css
  }

  const getPreviewStyle = (variable: string) => {
    const theme = previewMode === "light" ? lightTheme : darkTheme
    const value = theme[variable]
    if (!value) return {}

    return {
      backgroundColor: `hsl(${value})`,
      color: variable.includes("foreground")
        ? `hsl(${theme[variable.replace("-foreground", "")] || ""})`
        : undefined,
      borderRadius: `var(--radius)`,
    }
  }

  const colorPresets = [
    { name: "Blue", value: "#0066CC" },
    { name: "Purple", value: "#5E5CE6" },
    { name: "Pink", value: "#FF2D55" },
    { name: "Red", value: "#FF3B30" },
    { name: "Orange", value: "#FF9500" },
    { name: "Yellow", value: "#FFCC00" },
    { name: "Green", value: "#34C759" },
    { name: "Teal", value: "#5AC8FA" },
  ]

  const roundedBorder = [
    { name: "None", value: "0" },
    { name: "Small", value: "0.3" },
    { name: "Medium", value: "0.5" },
    { name: "Large", value: "0.7" },
    { name: "XL", value: "1.0" },
    { name: "Full", value: "full" },
  ]

  const cssContent = `${formatCssVariables(lightTheme)}\n${formatCssVariables(darkTheme, true)}`

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(cssContent)
      .then(() => {
        setCopied(true)
        if (typeof toast !== "undefined") {
          toast("Copied!", {
            description: "Theme CSS variables copied to clipboard",
            duration: 2000,
          })
        }
        setTimeout(() => setCopied(false), 2000)
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err)
        if (typeof toast !== "undefined") {
          toast.error("Copy failed", {
            description: "Please try again",
          })
        }
      })
  }

  const downloadCSS = () => {
    const blob = new Blob([cssContent], { type: "text/css" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "theme-variables.css"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    if (typeof toast !== "undefined") {
      toast("Downloaded!", {
        description: "Theme CSS file downloaded successfully",
        duration: 2000,
      })
    }
  }

  return (
    <div className="bg-gradient-to-b from-background to-background/60 min-h-screen pb-16">
      <Container>
        <section className="py-14 md:py-16 space-y-4">
          <div className="space-y-3 max-w-3xl">
            <h1 className="text-3xl lg:text-5xl md:text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Design Your Vision, Effortlessly.
            </h1>
            <p className="text-base md:text-lg lg:text-xl font-normal max-w-2xl text-foreground/80 leading-relaxed">
              Build beautiful, consistent color themes for your applications
              starting with a single primary color. Unleash your creativity and
              fully customize every detail.
            </p>
          </div>
        </section>
        <div className="mb-16">
          <div className="space-y-6">
            <div className="flex md:flex-row flex-col items-end md:items-center justify-between gap-6 md:gap-2 ">
              <div className="flex gap-4">
                <div className="flex flex-wrap gap-2">
                  {colorPresets.map((preset) => (
                    <Button
                      key={preset.name}
                      size={"sm"}
                      variant={
                        primaryColor === preset.value ? "default" : "outline"
                      }
                      onClick={() => setPrimaryColor(preset.value)}
                      className="flex items-center space-x-2 rounded-lg border-none shadow-sm transition-colors"
                    >
                      <span
                        className={`w-4 h-4 rounded-full flex items-center justify-center overflow-hidden`}
                        title={preset.name}
                        style={{ backgroundColor: preset.value }}
                      />
                      <span>{preset.name}</span>
                    </Button>
                  ))}
                </div>
                <Separator
                  orientation="vertical"
                  className="shrink-0 bg-border w-[1.5px] h-9 md:block hidden rounded-full"
                />
                <div className="flex flex-wrap gap-2">
                  {roundedBorder.map((rounded) => (
                    <Button
                      key={rounded.value}
                      size={"sm"}
                      variant={
                        defaultRadius === rounded.value ? "default" : "outline"
                      }
                      onClick={() => setDefaultRadius(rounded.value)}
                      className="transition-all duration-300 ease-in-out min-w-16 border-none shadow-sm"
                    >
                      {rounded.name}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <Label
                  htmlFor="primary-color"
                  className="text-sm font-medium mb-2 block"
                >
                  Custom Color
                </Label>
                <div className="flex gap-2 items-center">
                  <div
                    className="w-12 h-12 rounded-lg shadow-sm border overflow-hidden"
                    style={{ backgroundColor: primaryColor }}
                  />
                  <div className="flex-1">
                    <Input
                      id="primary-color"
                      type="text"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="font-mono text-sm h-12"
                    />
                  </div>
                  <Input
                    type="color"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="w-12 p-1 h-12 rounded-lg cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-24">
          <div className="space-y-6 lg:col-span-5">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-semibold">Theme Preview</h3>
                <p className="text-foreground/70 text-sm">
                  Visualize your color palette
                </p>
              </div>
            </div>
            <div
              className="p-6 rounded-xl border shadow-sm transition-colors duration-200"
              style={{ borderRadius: `var(--radius)` }}
            >
              <div className="grid grid-cols-2 gap-3">
                {Object.keys(lightTheme).map((key, index) => (
                  <div key={key} className="flex flex-col gap-1.5">
                    <div className="text-xs font-medium opacity-70 text-primary capitalize">
                      {key}
                    </div>
                    <div
                      className="h-16 flex items-center justify-center text-xs font-mono shadow-sm border transition-all"
                      style={getPreviewStyle(key)}
                    >
                      {key.includes("foreground") ? "Text" : ""}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div
              className="p-6 rounded-xl border shadow-sm transition-colors duration-200"
              style={{ borderRadius: `var(--radius)` }}
            >
              <h4 className="text-sm font-medium mb-4">Component Previews</h4>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Button variant="default">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="destructive">Destructive</Button>
                </div>
                <div className="h-10">
                  <Input placeholder="Input field" className="w-full" />
                </div>
                <div className="flex items-center gap-3 p-4 border rounded-lg bg-card">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                    UI
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium">Card Component</h4>
                    <p className="text-xs text-muted-foreground">
                      Styled with your theme
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-6 lg:col-span-7">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-semibold">CSS Variables</h3>
                <p className="text-foreground/70 text-sm">
                  Copy these variables to your CSS file
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={downloadCSS}
                  className="gap-2"
                >
                  <Download className="h-4 w-4" />
                  Download
                </Button>
                <Button
                  variant={copied ? "secondary" : "default"}
                  size="sm"
                  onClick={copyToClipboard}
                  className="gap-2"
                >
                  <Copy className="h-4 w-4" />
                  {copied ? "Copied!" : "Copy CSS"}
                </Button>
              </div>
            </div>
            <div className="relative">
              <Pre
                folderPath="globals.css"
                className="language-css max-h-[500px] overflow-auto"
                contentKey={themeVersion}
              >
                {cssContent}
              </Pre>
            </div>
            <Note
              variant="normal"
              className="bg-muted/50 border rounded-lg p-4"
            >
              <div className="flex gap-3">
                <div>
                  <ArrowDownToLine className="h-5 w-5 text-primary mt-0.5" />
                </div>
                <div>
                  <h4 className="font-medium text-sm">How to use</h4>
                  <p className="text-sm text-foreground/70 mt-1">
                    Copy these CSS variables into your{" "}
                    <code className="px-1.5 py-0.5 bg-secondary rounded text-xs">
                      globals.css
                    </code>{" "}
                    file. The variables will be automatically applied to all
                    components that use the design system.
                  </p>
                  <div className="mt-3 space-y-2">
                    <p className="text-sm text-foreground/70">
                      <strong>Quick Install:</strong> Download the CSS file or
                      copy the variables to your project.
                    </p>
                    <p className="text-sm text-foreground/70">
                      <strong>Tailwind Config:</strong> Make sure your Tailwind
                      config is set up to use CSS variables.
                    </p>
                  </div>
                </div>
              </div>
            </Note>
          </div>
        </div>
      </Container>
    </div>
  )
}
