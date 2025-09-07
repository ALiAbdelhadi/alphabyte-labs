import { Button } from "@/registry/ui/button"
import { Link } from "@/i18n/navigation"

export default function ButtonLinkDemo() {
  return (
    <Button variant="link" asChild>
      <Link href={"/href"}>Link</Link>
    </Button>
  )
}