import React from "react"

import { Separator } from "@/components/ui/separator"

const SeparatorUltralightDemo = () => {
  return (
    <div className="p-4 rounded-lg ">
      <div className="p-4">Content Above</div>
      <Separator weight="ultralight" />
      <div className="p-4">Content Below</div>
    </div>
  )
}

export default SeparatorUltralightDemo
