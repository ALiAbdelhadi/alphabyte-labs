import { ColorFormat, colorPalettes } from "@/types"
import { ColorSwatch } from "./color-swatch"

interface ColorPalettesProps {
  colorPalettes: colorPalettes[]
  colorFormat?: ColorFormat
}

const ColorPalettes = ({ colorPalettes, colorFormat }: ColorPalettesProps) => {
  return (
    <div className="space-y-6">
      {colorPalettes.map((colorPalette) => (
        <div
          className="border rounded-2xl overflow-hidden"
          key={colorPalette.title}
        >
          <div className="flex items-center justify-between p-4">
            <h2 className="text-lg font-medium capitalize">
              {colorPalette.title}
            </h2>
          </div>
          {colorPalette.title && (
            <div className="grid grid-cols-1 sm:grid-cols-5 md:grid-cols-11 p-4">
              {colorPalette.colors.map((color) => (
                <ColorSwatch
                  key={color.name}
                  color={color}
                  globalFormat={colorFormat}
                />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default ColorPalettes
