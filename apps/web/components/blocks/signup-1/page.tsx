import { SignUpForm } from "./components/signup-form"

export default function SignUpPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center py-10 md:py-16 lg:py-20">
      <SignUpForm className="w-full max-w-md" />
    </div>
  )
}
