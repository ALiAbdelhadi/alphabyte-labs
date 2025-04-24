"use client"

import { useEffect, useState } from "react"
import { ArrowDownToLine, Moon, Paintbrush, Sun } from "lucide-react"

import { generateDarkTheme, generateTheme } from "@/lib/color-generation-utils"
import {
  Tabs,
  TabsContainer,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import Container from "@/components/Container"
import { Button } from "@/components/library/button"
import { Input } from "@/components/library/input"
import { Label } from "@/components/library/label"
import { Separator } from "@/components/library/separator"
import Pre from "@/components/pre"

export default function ThemeGenerator() {
  const [primaryColor, setPrimaryColor] = useState("#0066CC")
  const [lightTheme, setLightTheme] = useState<Record<string, string>>({})
  const [darkTheme, setDarkTheme] = useState<Record<string, string>>({})
  const [previewMode, setPreviewMode] = useState<"light" | "dark">("light")
  const [themeVersion, setThemeVersion] = useState(0)

  useEffect(() => {
    generateThemes()
  }, [primaryColor])

  const generateThemes = () => {
    const light = generateTheme(primaryColor)
    const dark = generateDarkTheme(light)
    setLightTheme(light)
    setDarkTheme(dark)
    setThemeVersion((prev) => prev + 1)
  }

  const formatCssVariables = (
    theme: Record<string, string>,
    isDark = false
  ) => {
    let css = isDark ? ".dark {\n" : ":root {\n"

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
  const cssContent = `${formatCssVariables(lightTheme)}\n${formatCssVariables(darkTheme, true)}`

  return (
    <div className="bg-gradient-to-b from-background to-background/60 min-h-screen">
      <Container>
        <section className="my-14 md:my-16 space-y-3">
          <div className="space-y-2">
            <h1 className="text-2xl lg:text-4xl md:text-3xl font-bold">
              Custom Themes: Design Your Vision, Effortlessly.
            </h1>
            <p className="text-base md:text-lg lg:text-xl font-normal max-w-2xl text-foreground opacity-80">
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
                      className="flex items-center space-x-2 transition-all duration-300 ease-in-out"
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
                <div className="flex gap-2 flex-wrap">
                  <Button size={"sm"} variant={"outline"}>
                    0
                  </Button>
                  <Button size={"sm"} variant={"outline"}>
                    0.3
                  </Button>
                  <Button size={"sm"} variant={"outline"}>
                    0.5
                  </Button>
                  <Button size={"sm"} variant={"outline"}>
                    0.7
                  </Button>
                  <Button size={"sm"} variant={"outline"}>
                    1.0
                  </Button>
                </div>
              </div>
              <Button
                onClick={() => {
                  navigator.clipboard.writeText(cssContent)
                }}
              >
                Copy theme
              </Button>
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
              <div className="flex items-end">
                <Button
                  onClick={generateThemes}
                  className="w-full h-12 gap-2 rounded-lg text-base"
                >
                  <Paintbrush className="h-4 w-4" />
                  Generate Theme
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-semibold">Theme Preview</h3>
                <p className="text-foreground/70 text-sm">
                  Visualize your color palette
                </p>
              </div>
              <Tabs defaultValue={previewMode}>
                <TabsList>
                  <TabsContainer>
                    <TabsTrigger value="light">
                      <span
                        onClick={() => setPreviewMode("light")}
                        className={`flex items-center px-1 h-4 rounded-full ${previewMode === "light" ? "" : "hover:bg-transparent"}`}
                      >
                        <Sun className="h-4 w-4 mr-2" />
                        Light
                      </span>
                    </TabsTrigger>
                    <TabsTrigger value="dark">
                      <span
                        onClick={() => setPreviewMode("dark")}
                        className={`flex items-center px-1 h-4 rounded-full ${previewMode === "dark" ? "" : "hover:bg-transparent"}`}
                      >
                        <Moon className="h-4 w-4 mr-2" />
                        Dark
                      </span>
                    </TabsTrigger>
                  </TabsContainer>
                </TabsList>
              </Tabs>
            </div>
            <div
              className={`${previewMode === "dark" ? "dark bg-zinc-900" : "bg-white"} p-6 rounded-2xl border shadow-sm transition-colors duration-200`}
            >
              <div className="grid grid-cols-2 gap-3">
                {Object.keys(lightTheme).map((key) => (
                  <div key={key} className="flex flex-col gap-1.5">
                    <div className="text-xs font-medium opacity-70 text-primary capitalize">
                      {key}
                    </div>
                    <div
                      className="h-14 rounded-xl flex items-center justify-center text-xs font-mono shadow-sm"
                      style={getPreviewStyle(key)}
                    >
                      {key.includes("foreground") ? "Text" : ""}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold">CSS Variables</h3>
              <p className="text-foreground/70 text-sm">
                Copy these variables to your CSS file
              </p>
            </div>
            <div className="relative">
              <Pre
                folderPath="globals.css"
                className="language-css"
                contentKey={themeVersion}
              >
                {cssContent}
              </Pre>
            </div>
            <div className="p-4 bg-primary/10 rounded-xl border border-primary/20">
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
