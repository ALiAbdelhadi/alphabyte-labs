"use client"

import { Separator } from "@/components/ui/separator"

const SeparatorDemo = () => {
  return (
    <div className="p-4 rounded-lg">
      <div className="p-4">Content Above</div>
      <Separator weight="regular" />
      <div className="p-4">Content Below</div>
    </div>
  )
}

export default SeparatorDemo
