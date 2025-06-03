import SubscriptionEmail from "./components/subscription-email"

export default function page() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4 relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-800 dark:to-gray-900">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50/80 via-white/60 to-gray-100/80 backdrop-blur-3xl dark:from-gray-950/80 dark:via-gray-800/60 dark:to-gray-900/80 dark:backdrop-blur-3xl" />
            <div className="relative z-10 max-w-lg w-full text-center">
                <SubscriptionEmail />
            </div>
        </main>
    )
}
