import Container from "@/components/Container"
import { LoginForm } from "./components/login-form"

export default function LogInPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <Container className="w-full max-w-sm">
        <LoginForm />
      </Container>
    </div>
  )
}
