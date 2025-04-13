import React from "react"
import Link from "next/link"

import { Button } from "@/components/library/button"

const ButtonLinkDemo = () => {
  return (
    <Button variant="link" asChild>
      <Link href={"/href"}>Link button</Link>
    </Button>
  )
}

export default ButtonLinkDemo
