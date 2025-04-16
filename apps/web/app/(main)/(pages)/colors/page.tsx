"use client"

import { useState } from "react"
import Link from "next/link"
import { colorsData } from "@/constant/colors/color"
import { ColorFormat } from "@/types"

import { ColorFormatToggle } from "@/components/color-format-toggle"
import ColorPalettes from "@/components/color-palettes"
import Container from "@/components/Container"
import { Button } from "@/components/library/button"

const ColorsPage = () => {
  const [colorFormat, setColorFormat] = useState<ColorFormat>("hex")
  return (
    <div>
      <Container>
        <section className="my-14 md:my-16 space-y-3">
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
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-end">
            <ColorFormatToggle
              onFormatChange={(value) => setColorFormat(value)}
            />
          </div>
          <div className="space-y-8" id="browse-colors">
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
