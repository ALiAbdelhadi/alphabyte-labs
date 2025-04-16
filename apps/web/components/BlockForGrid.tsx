import { ReactNode } from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"

import { CustomImage } from "./custome-image"

const BlockForGrid = ({
  href,
  children,
  className,
  title,
  src,
}: {
  href: string
  children?: ReactNode
  className?: string
  title: string
  src: string
}) => {
  return (
    <Link href={href} className={cn("group relative w-full py-5", className)}>
      <div className="border text-card-foreground shadow-sm hover:shadow-md rounded-md border-muted/20 bg-muted/20 group-hover:bg-muted/60 transition-shadow">
        <div className="flex flex-col space-y-1.5 p-6 pb-1" />
        <div className="p-6 pt-0 text-left">
          <div className="flex items-center">
            <h4 className="text-lg font-semibold">{title}</h4>
          </div>
        </div>
        <div>
          <div className="flex items-center p-6 pt-0 justify-end rounded-md pb-0 pr-0 shadow-sm">
            <CustomImage
              width={288}
              height={160}
              quality={100}
              className="sm:h-72 lg:h-40 w-full rounded-br-lg rounded-tl-lg border-l border-t object-cover object-left-top"
              src={src}
              alt={title}
            />
          </div>
          <div>{children}</div>
        </div>
      </div>
    </Link>
  )
}

export default BlockForGrid
