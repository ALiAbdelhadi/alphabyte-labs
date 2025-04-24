"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { GitHubLink } from "@/settings/navigation"

import { Company } from "@/config/meta"
import { cn } from "@/lib/utils"

export function Footer() {
  const routeName = usePathname()
  const isDocsRoute = routeName.match("/docs")
  return (
    <footer
      className={cn("w-full h-16", isDocsRoute && "border-t border-grid")}
    >
      <div className="flex flex-wrap items-center justify-center sm:justify-between gap-4 sm:gap-0 w-full h-full mx-auto container text-sm text-muted-foreground">
        <p className="text-center text-muted-foreground">
          &copy; {new Date().getFullYear()}{" "}
          <Link
            className="font-semibold underline "
            target="_blank"
            href={Company.link}
          >
            {Company.name}{" "}
          </Link>
          The source code is available on{" "}
          <Link href={GitHubLink.href} target="_blank" className="underline">
            Github
          </Link>
          .
        </p>
        {Company.branding !== false && (
          <div className="text-center hidden md:block">
            <p className="font-semibold">Alphabyte-labs</p>
          </div>
        )}
      </div>
    </footer>
  )
}
