"use client"

import { Mail } from "lucide-react"
import type React from "react"
import { useState } from "react"

export default function SubscriptionEmail() {
    const [email, setEmail] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        await new Promise((resolve) => setTimeout(resolve, 1000))

        setIsSubmitting(false)
        setIsSubmitted(true)
        setEmail("")
    }

    return (
        <div className="min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100 flex items-center justify-center p-4 sm:p-6">
            <div className="space-y-6 flex items-center justify-center flex-col w-full max-w-md">
                <div className="space-y-2 text-center">
                    <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
                        Exclusive offers.
                        <br />
                        Limited time.
                    </h1>
                    <p className="text-gray-500 mt-4 text-base dark:text-gray-400">Get early access to our Black Friday deals.</p>
                </div>
                {isSubmitted ? (
                    <div className="bg-white rounded-full shadow-md p-4 text-center dark:bg-gray-700 dark:shadow-lg">
                        <p className="text-gray-800 dark:text-gray-200">Thanks for subscribing!</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="relative w-full">
                        <div className="bg-white rounded-xl shadow-md flex items-center p-2 pr-2 border border-gray-300 dark:bg-gray-800 dark:border-gray-600 dark:shadow-lg">
                            <div className="pl-3 pr-2">
                                <Mail className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                            </div>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email address"
                                required
                                className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-400 text-sm md:text-base py-2 px-1
                                           dark:text-gray-100 dark:placeholder-gray-500"
                            />
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-gray-100 hover:bg-gray-200 transition-colors rounded-xl py-2 px-6 text-gray-800 font-medium text-sm md:text-base
                                           dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? "Subscribing..." : "Subscribe"}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    )
}
