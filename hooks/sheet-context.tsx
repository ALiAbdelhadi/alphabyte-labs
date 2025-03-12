"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

type SheetContextType = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

const SheetContext = createContext<SheetContextType | undefined>(undefined)

export const SheetProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <SheetContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </SheetContext.Provider>
  )
}

export const useSheet = () => {
  const context = useContext(SheetContext)
  if (context === undefined) {
    throw new Error("useSheet must be used within a SheetProvider")
  }
  return context
}
