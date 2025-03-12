import type { JSX } from "react"
import Image from "next/image"
import { Terminal } from "lucide-react"

export const languageIcons: Record<string, JSX.Element> = {
  javascript: (
    <Image
      src="/icons/javascript.svg"
      className="w-[18px] h-[18px] rounded-sm"
      alt="javascript"
      width={10}
      height={10}
      quality={100}
    />
  ),
  js: (
    <Image
      src="/icons/javascript.svg"
      className="w-[18px] h-[18px] rounded-sm"
      alt="javascript"
      width={10}
      height={10}
      quality={100}
    />
  ),
  jsx: (
    <Image
      src="/icons/javascript.svg"
      className="w-[18px] h-[18px] rounded-sm"
      alt="jsx"
      width={10}
      height={10}
      quality={100}
    />
  ),
  typescript: (
    <Image
      src="/icons/typescript.svg"
      className="w-[18px] h-[18px] rounded-sm"
      alt="typescript"
      width={10}
      height={10}
      quality={100}
    />
  ),
  ts: (
    <Image
      src="/icons/typescript.svg"
      className="w-[18px] h-[18px] rounded-sm"
      alt="typescript"
      width={10}
      height={10}
      quality={100}
    />
  ),
  tsx: (
    <Image
      src="/icons/typescript.svg"
      className="w-[18px] h-[18px] rounded-sm"
      alt="typescript"
      width={10}
      height={10}
      quality={100}
    />
  ),
  html: (
    <Image
      src="/icons/html.svg"
      alt="html"
      className="w-[18px] h-[18px] rounded-sm"
      width={10}
      height={10}
      quality={100}
    />
  ),
  css: (
    <Image
      src="/icons/css.svg"
      alt="css"
      className="w-[18px] h-[18px] rounded-sm"
      width={10}
      height={10}
      quality={100}
    />
  ),
  bash: <Terminal className="w-5 h-5 text-gray-100 rounded-lg" />,
}
