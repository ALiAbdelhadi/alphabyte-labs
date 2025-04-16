import Container from '@/components/Container'
import '@/styles/globals.css'
import '@/styles/prism-theme.css'

const BlockLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="block-layout-container w-full h-full">
            <Container className="max-w-full p-0">
                {children}
            </Container>
        </div>
    )
}

export default BlockLayout