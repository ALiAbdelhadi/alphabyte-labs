import { CustomImage } from "@/components/custome-image"
import { FileJson2, Terminal } from "lucide-react"
import type { JSX } from "react"

export const languageIcons: Record<string, JSX.Element> = {
  javascript: (
    <CustomImage
      src="/icons/javascript.svg"
      className="w-4 h-4"
      alt="javascript"
      width={10}
      height={10}
      quality={100}
    />
  ),
  js: (
    <CustomImage
      src="/icons/javascript.svg"
      className="w-4 h-4"
      alt="javascript"
      width={10}
      height={10}
      quality={100}
    />
  ),
  jsx: (
    <CustomImage
      src="/icons/javascript.svg"
      className="w-4 h-4"
      alt="jsx"
      width={10}
      height={10}
      quality={100}
    />
  ),
  typescript: (
    <CustomImage
      src="/icons/typescript.svg"
      className="w-4 h-4"
      alt="typescript"
      width={10}
      height={10}
      quality={100}
    />
  ),
  ts: (
    <CustomImage
      src="/icons/typescript.svg"
      className="w-4 h-4"
      alt="typescript"
      width={10}
      height={10}
      quality={100}
    />
  ),
  tsx: (
    <CustomImage
      src="/icons/typescript.svg"
      className="w-4 h-4"
      alt="typescript"
      width={10}
      height={10}
      quality={100}
    />
  ),
  html: (
    <CustomImage
      src="/icons/html.svg"
      alt="html"
      className="w-4 h-4"
      width={10}
      height={10}
      quality={100}
    />
  ),
  css: (
    <CustomImage
      src="/icons/css.svg"
      alt="css"
      className="w-4 h-4"
      width={10}
      height={10}
      quality={100}
    />
  ),
  bash: <Terminal className="w-4 h-4 dark:text-gray-100 text-gray-950 rounded-lg" />,
  json: <FileJson2 className="w-4 h-4 text-yellow-500 rounded-lg" />
}
