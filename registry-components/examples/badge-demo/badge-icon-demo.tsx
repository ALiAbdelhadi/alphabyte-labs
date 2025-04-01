import { Badge } from '@/components/library/badge'
import { Lock } from 'lucide-react'

const BadgeIconDemo = () => {
    return (
        <Badge variant="default" icon={<Lock size={12} />}>Secure</Badge>
    )
}

export default BadgeIconDemo