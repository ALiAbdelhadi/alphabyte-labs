import { Fragment } from "react"
import { Link } from "@/i18n/navigation"

import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  showLogoText?: boolean
  showBeta?: boolean
  href?: string
}

const Logo = ({
  className,
  showLogoText = true,
  showBeta = true,
  href = "/",
}: LogoProps) => {
  return (
    <Link href={href} className="group relative flex items-center">
      <div className="relative flex items-center space-x-2 md:space-x-3 py-2">
        {showLogoText && (
          <div className="flex items-center justify-center space-x-1">
            <span className={cn("font-bold tracking-tight ", className)}>
              Alphabyte-labs
            </span>
            <span className="mt-[3.5px]">
              {showBeta && (
                <div
                  className={cn(
                    "inline-flex items-center justify-center",
                    "bg-gradient-to-r from-[#0898f4]/20 via-[#f34d7a]/20 to-[#f95032]/20",
                    "text-transparent bg-clip-text bg-gradient-to-r from-[#0898f4] from-[10%] via-[#f34d7a] to-[#f95032]",
                    "rounded-full px-2 py-0.5",
                    "text-xs font-medium",
                    "border border-[#f34d7a]/30",
                    "shadow-sm",
                    "select-none"
                  )}
                >
                  beta
                </div>
              )}
            </span>
          </div>
        )}
      </div>
    </Link>
  )
}

export default Logo
