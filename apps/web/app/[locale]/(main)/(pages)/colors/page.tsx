"use client"

import { ColorFormatToggle } from "@/components/color-format-toggle"
import ColorPalettes from "@/components/color-palettes"
import Container from "@/components/Container"
import { Button } from "@/components/ui/button"
import { colorsData } from "@/constant/colors/color"
import { ColorFormat } from "@/types"
import { Link } from "@/i18n/navigation"
import { useState } from "react"

const ColorsPage = () => {
  const [colorFormat, setColorFormat] = useState<ColorFormat>("hex")

  return (
    <div className="min-h-screen bg-background">
      <Container>
        <section className="py-12 md:py-16 space-y-8">
          <div className="space-y-2">
            <h1 className="text-2xl lg:text-4xl md:text-3xl font-bold">
              Colors Library
            </h1>
            <p className="text-base md:text-lg lg:text-xl font-normal max-w-2xl text-foreground opacity-80">
              A comprehensive collection of Tailwind CSS colors in RGB, HSL,
              OKLCH, and HEX formats.
            </p>
          </div>
          <div className="space-x-2">
            <Link href="#browse-colors">
              <Button className="lg:h-10 lg:px-7 px-3 h-8">
                Browse Colors
              </Button>
            </Link>
            <Link href="/docs/themes">
              <Button variant={"ghost"} className="lg:h-10 lg:px-7 px-3 h-8">
                Documentation
              </Button>
            </Link>
          </div>
          <div className="sticky top-4 z-10 flex justify-end py-2">
            <div className="bg-background/80 backdrop-blur-sm p-2 rounded-lg shadow-sm border">
              <ColorFormatToggle
                onFormatChange={(value) => setColorFormat(value)}
              />
            </div>
          </div>
          <div className="space-y-8 pb-16" id="browse-colors">
            <ColorPalettes
              colorPalettes={colorsData}
              colorFormat={colorFormat}
            />
          </div>
        </section>
      </Container>
    </div>
  )
}

export default ColorsPage
