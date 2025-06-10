import { Button } from "@/registry/ui/button"
import Link from "next/link"

export default function ButtonLinkDemo() {
  return (
    <Button variant="link" asChild>
      <Link href={"/href"}>Link</Link>
    </Button>
  )
}