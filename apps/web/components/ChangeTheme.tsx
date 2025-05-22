"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { LuMoon, LuSun } from "react-icons/lu"

import { Button } from "@/components/ui/button"

const ChangeTheme = () => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  if (!mounted) {
    return (
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <span className="h-5 w-5" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={toggleTheme}
        >
          <span>
            {theme === "light" ? (
              <LuMoon className="!h-5 !w-5 text-[#000]" />
            ) : (
              <LuSun className="!h-5 !w-5 text-gray-100" />
            )}
          </span>
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>
    </div>
  )
}

export default ChangeTheme
