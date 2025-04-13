import Link from "next/link"

import { Settings } from "@/lib/meta"

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <h1 className="text-md font-semibold">{Settings.title}</h1>
    </Link>
  )
}
