import { SignUpForm } from "./components/signup-form";

export default function SignUpPage() {
    return (
        <div className="container flex h-screen w-full items-center justify-center">
            <SignUpForm className="w-full max-w-md" />
        </div>
    )
}
