"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export function SplashScreen() {
   const [progress, setProgress] = useState(0)
   const [matrixText, setMatrixText] = useState("")
   const [isVisible, setIsVisible] = useState(true)

   useEffect(() => {
      const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@%"
      let matrixInterval: NodeJS.Timeout
      let startTime: number
      matrixInterval = setInterval(() => {
         setMatrixText(
            Array.from({ length: 8 }, () =>
               characters.charAt(Math.floor(Math.random() * characters.length))
            ).join('')
         )
      }, 50)
      startTime = Date.now()
      const duration = 2000
      const updateProgress = () => {
         const elapsed = Date.now() - startTime
         const currentProgress = (elapsed / duration) * 100
         setProgress(Math.min(currentProgress, 100))
         if (currentProgress >= 100) {
            handleCompletion()
            return
         }
         requestAnimationFrame(updateProgress)
      }
      requestAnimationFrame(updateProgress)
      const handleCompletion = () => {
         clearInterval(matrixInterval)
         setIsVisible(false)
      }
      return () => {
         clearInterval(matrixInterval)
      }
   }, [])
   return (
      <div
         className={cn(
            "fixed inset-0 z-[60] flex flex-col items-center justify-center bg-black",
            "transition-opacity duration-1000 ease-in-out",
            isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
         )}
      >
         <div className="font-mono text-white mb-4 h-6">
            LOADING_SYSTEM: {matrixText}
         </div>
         <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
            <div
               className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-100"
               style={{ width: `${progress}%` }}
            />
         </div>
         <div className="mt-2 font-mono text-sm text-blue-400">
            {`${Math.floor(progress)}%`}
         </div>
      </div>
   )
}
