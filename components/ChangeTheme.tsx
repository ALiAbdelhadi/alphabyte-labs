import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { LuArrowLeft, LuArrowRight, LuMoon, LuSun } from 'react-icons/lu'
import { Button } from './library/Button'
import { useTheme } from 'next-themes'

const ChangeTheme = () => {
   const { theme, setTheme } = useTheme()
   const toggleTheme = () => {
      setTheme(theme === 'light' ? 'dark' : 'light')
   }
   return (
      <div className="flex items-center justify-between">
         <div className="flex items-center space-x-1">
            <Button
               variant="ghost"
               size="icon"
               className="h-8 w-8"
               onClick={toggleTheme}
            >
               {theme === "light" ?
                  <LuMoon className="h-4 w-4" /> :
                  <LuSun className="h-4 w-4" />
               }
               <span className="sr-only">Toggle theme</span>
            </Button>
         </div>
      </div>
   )
}

export default ChangeTheme