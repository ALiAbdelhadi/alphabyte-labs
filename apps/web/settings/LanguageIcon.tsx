import { CustomImage } from "@/components/custome-image"
import { Terminal } from "lucide-react"
import type { JSX } from "react"

export const languageIcons: Record<string, JSX.Element> = {
  javascript: (
    <CustomImage
      src="/icons/javascript.svg"
      className="w-[18px] h-[18px]"
      alt="javascript"
      width={10}
      height={10}
      quality={100}
    />
  ),
  js: (
    <CustomImage
      src="/icons/javascript.svg"
      className="w-[18px] h-[18px]"
      alt="javascript"
      width={10}
      height={10}
      quality={100}
    />
  ),
  jsx: (
    <CustomImage
      src="/icons/javascript.svg"
      className="w-[18px] h-[18px]"
      alt="jsx"
      width={10}
      height={10}
      quality={100}
    />
  ),
  typescript: (
    <CustomImage
      src="/icons/typescript.svg"
      className="w-[18px] h-[18px]"
      alt="typescript"
      width={10}
      height={10}
      quality={100}
    />
  ),
  ts: (
    <CustomImage
      src="/icons/typescript.svg"
      className="w-[18px] h-[18px]"
      alt="typescript"
      width={10}
      height={10}
      quality={100}
    />
  ),
  tsx: (
    <CustomImage
      src="/icons/typescript.svg"
      className="w-[18px] h-[18px]"
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
      className="w-[18px] h-[18px]"
      width={10}
      height={10}
      quality={100}
    />
  ),
  css: (
    <CustomImage
      src="/icons/css.svg"
      alt="css"
      className="w-[18px] h-[18px]"
      width={10}
      height={10}
      quality={100}
    />
  ),
  bash: <Terminal className="w-[18px] h-[18px] text-gray-100 rounded-lg" />,
}
