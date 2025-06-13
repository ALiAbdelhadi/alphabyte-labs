"use client"

import { cn } from "@/lib/utils"
import { GitHubLink } from "@/settings/settings"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function Footer() {
  const routeName = usePathname()
  const isDocsRoute = routeName.match("/docs")
  return (
    <footer
      className={cn("w-full h-16", isDocsRoute && "border-t border-grid")}
    >
      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-0 w-full h-full mx-auto container text-sm text-muted-foreground">
        <p className="text-center text-muted-foreground">
          &copy; {new Date().getFullYear()}{" "}
          Built by the team behind{" "}
          <Link
            className="font-semibold underline "
            target="_blank"
            href={"https://alphabyte-labs.vercel.app"}
          >
            Alphabyte-labs{" "}
          </Link>
          The source code is available on{" "}
          <Link href={GitHubLink.href} target="_blank" className="underline">
            Github
          </Link>
          .
        </p>
      </div>
    </footer>
  )
}
