import React from "react"
import { Link } from "@/i18n/routing"

import { Button } from "@/components/library/button"

const ButtonLinkDemo = () => {
  return (
    <Button variant="link" asChild>
      <Link href={"/href"}>Link button</Link>
    </Button>
  )
}

export default ButtonLinkDemo
