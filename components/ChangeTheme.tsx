import { useTheme } from "next-themes"
import { LuMoon, LuSun } from "react-icons/lu"

import { Button } from "@/components/library/button"

const ChangeTheme = () => {
  const { theme, setTheme } = useTheme()
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
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
          {theme === "light" ? (
            <LuMoon className="!h-5 !w-5" />
          ) : (
            <LuSun className="!h-5 !w-5" />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>
    </div>
  )
}

export default ChangeTheme
