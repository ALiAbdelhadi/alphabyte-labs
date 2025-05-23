import SubscriptionEmail from "./components/subscription-email"

export default function page() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 p-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50/80 via-white/60 to-gray-100/80 backdrop-blur-3xl" />
            <div className="relative z-10 max-w-lg w-full text-center">
                <SubscriptionEmail />
            </div>
        </main>
    )
}
