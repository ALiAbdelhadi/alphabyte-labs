import Container from '@/components/Container'
import { SignUpForm } from './components/signup-1'

const page = () => {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10 bg-gradient-to-br from-primary/20 via-background to-secondary/20">
            <Container className="w-full max-w-sm md:max-w-3xl">
                <SignUpForm />
            </Container>
        </div>
    )
}

export default page