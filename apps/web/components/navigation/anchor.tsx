"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ComponentProps } from "react"

type AnchorProps = ComponentProps<typeof Link> & {
  absolute?: boolean
  activeClassName?: string
  disabled?: boolean
}

export default function Anchor({
  absolute,
  className = "",
  activeClassName = "",
  disabled,
  children,
  ...props
}: AnchorProps) {
  const path = usePathname()
  let hrefString = props.href ? props.href.toString() : ""

  let isMatch = absolute
    ? hrefString.split("/")[1] == path.split("/")[1]
    : path === props.href

  if (hrefString.includes("https")) isMatch = false

  if (disabled)
    return <div className={cn(className, "cursor-not-allowed")}>{children}</div>

  return (
    <Link className={cn(className, isMatch && activeClassName)} {...props}>
      {children}
    </Link>
  )
}
