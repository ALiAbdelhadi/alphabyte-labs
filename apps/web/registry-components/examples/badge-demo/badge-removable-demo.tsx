"use client"
import { Badge } from "@/components/library/badge"
import { useState } from "react"

const BadgeRemoveAbleDemo = () => {
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

export default BadgeRemoveAbleDemo
