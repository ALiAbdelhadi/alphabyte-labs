"use client"

import { Badge } from "@/registry/ui/badge"
import { useState } from "react"

export default function BadgeRemovableDemo() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) {
    return null
  }

  return (
    <Badge
      variant="outline"
      removable={true}
      onRemove={() => setIsVisible(false)}
    >
      Apple
    </Badge>
  )
}