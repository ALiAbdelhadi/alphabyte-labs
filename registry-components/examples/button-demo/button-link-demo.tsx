import { Button } from '@/components/library/button'
import Link from 'next/link'
import React from 'react'

const ButtonLinkDemo = () => {
    return (
        <Button variant="link" asChild>
            <Link href={"/href"}>Link button</Link>
        </Button>
    )
}

export default ButtonLinkDemo 