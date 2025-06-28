import SubscriptionEmail from "./components/subscription-email"

export default function Page() {
    return (
        <main className="min-h-screen w-full flex flex-col items-center justify-center p-4 md:p-8 bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.03),transparent_50%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.05),transparent_50%)]" />
            <div className="relative z-10">
                <SubscriptionEmail />
            </div>
        </main>
    )
}