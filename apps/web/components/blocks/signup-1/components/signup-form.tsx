"use client"

import { useState } from "react"
import type React from "react"
import { Button } from "@/components/library/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/library/card"
import { Input } from "@/components/library/input"
import { Label } from "@/components/library/label"
import { cn } from "@/lib/utils"
import { Progress } from "@/components/library/progress"
import Link from "next/link"
import { FcGoogle } from "react-icons/fc";
import { Eye, EyeOff } from "lucide-react"

export function SignUpForm({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [passwordStrength, setPasswordStrength] = useState({
        score: 0,
        message: "Enter a password",
        color: "bg-gray-200",
    })

    const checkPasswordStrength = (password: string) => {
        // Initialize score
        let score = 0
        let message = ""
        let color = "bg-gray-200"

        // Check if password is empty
        if (password.length === 0) {
            return { score: 0, message: "Enter a password", color: "bg-gray-200" }
        }

        // Check length
        if (password.length < 8) {
            score += 1
            message = "Weak - Too short"
            color = "bg-red-500"
        } else {
            score += 2
        }

        // Check for numbers
        if (/\d/.test(password)) {
            score += 1
        }

        // Check for lowercase letters
        if (/[a-z]/.test(password)) {
            score += 1
        }

        // Check for uppercase letters
        if (/[A-Z]/.test(password)) {
            score += 1
        }

        // Check for special characters
        if (/[^A-Za-z0-9]/.test(password)) {
            score += 1
        }

        // Determine strength message and color based on score
        if (score < 3) {
            message = "Weak"
            color = "bg-red-500"
        } else if (score < 5) {
            message = "Medium"
            color = "bg-yellow-500"
        } else {
            message = "Strong"
            color = "bg-green-500"
        }

        // Normalize score to percentage for progress bar (max score is 6)
        const normalizedScore = Math.min(Math.floor((score / 6) * 100), 100)

        return { score: normalizedScore, message, color }
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPassword = e.target.value
        setPassword(newPassword)
        setPasswordStrength(checkPasswordStrength(newPassword))
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword)
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Sign Up</CardTitle>
                    <CardDescription>Create an account to get started</CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input id="name" type="text" placeholder="John Doe" required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" placeholder="m@example.com" required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={handlePasswordChange}
                                        required
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                        onClick={togglePasswordVisibility}
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-4 w-4 text-gray-500" />
                                        ) : (
                                            <Eye className="h-4 w-4 text-gray-500" />
                                        )}
                                        <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                                    </Button>
                                </div>
                                <div className="mt-2">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-sm">Password strength:</span>
                                        <span
                                            className={`text-sm font-medium ${passwordStrength.message === "Weak"
                                                ? "text-red-500"
                                                : passwordStrength.message === "Medium"
                                                    ? "text-yellow-500"
                                                    : passwordStrength.message === "Strong"
                                                        ? "text-green-500"
                                                        : "text-gray-500"
                                                }`}
                                        >
                                            {passwordStrength.message}
                                        </span>
                                    </div>
                                    <Progress
                                        value={passwordStrength.score}
                                        className="h-2"
                                        indicatorClassName={passwordStrength.color}
                                    />
                                    <p className="mt-1 text-xs text-gray-500">
                                        Use 8+ characters with a mix of letters, numbers & symbols
                                    </p>
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="confirmPassword">Confirm Password</Label>
                                <div className="relative">
                                    <Input id="confirmPassword" type={showConfirmPassword ? "text" : "password"} required />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                        onClick={toggleConfirmPasswordVisibility}
                                        aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                                    >
                                        {showConfirmPassword ? (
                                            <EyeOff className="h-4 w-4 text-gray-500" />
                                        ) : (
                                            <Eye className="h-4 w-4 text-gray-500" />
                                        )}
                                        <span className="sr-only">
                                            {showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                                        </span>
                                    </Button>
                                </div>
                            </div>
                            <Button type="submit" className="w-full">
                                Sign Up
                            </Button>
                            <Button variant="outline" className="w-full">
                                <FcGoogle className="inline-block " />Sign Up with Google
                            </Button>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Already have an account?{" "}
                            <Link href="/ui-blocks/login-1" className="underline underline-offset-4">
                                Login
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
