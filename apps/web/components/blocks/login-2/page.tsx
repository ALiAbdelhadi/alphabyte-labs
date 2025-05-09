import Container from "@/components/Container"
import { LoginForm } from "./components/login-form"

export default function LogInPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10 bg-gradient-to-br from-primary/20 via-background to-secondary/20">
      <Container className="w-full max-w-sm md:max-w-3xl">
        <LoginForm />
      </Container>
    </div>
  )
}
