import { Lock } from "lucide-react"

import { Badge } from "@/components/library/badge"

const BadgeIconDemo = () => {
  return (
    <Badge variant="default" icon={<Lock size={12} />}>
      Secure
    </Badge>
  )
}

export default BadgeIconDemo
