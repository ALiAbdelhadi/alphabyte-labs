import { Badge } from "@/registry/ui/badge"
import { Lock } from "lucide-react"

export default function BadgeIconDemo() {
  return (
    <Badge variant="default" icon={<Lock size={12} />}>
      Secure
    </Badge>
  )
}