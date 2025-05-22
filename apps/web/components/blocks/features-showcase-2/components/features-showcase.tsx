import { Ban, CreditCard, Shield, Smartphone } from "lucide-react"

export default function FinancialFeatures() {
    return (
        <section className="py-16 px-4">
            <div className="container mx-auto max-w-6xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-3">Custom-built for financial exchanges</h2>
                    <p className="text-gray-600 max-w-3xl mx-auto">
                        Our platform offers secure and efficient transaction capabilities, tailored to meet diverse payment needs
                        with robust features.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-amber-50 p-6 rounded-lg">
                        <div className="mb-4">
                            <CreditCard className="h-8 w-8 text-amber-500" />
                        </div>
                        <h3 className="font-bold text-lg mb-2">Modern Cards</h3>
                        <p className="text-gray-600 text-sm">Up-to-date payment methods for convenience and efficiency.</p>
                    </div>
                    <div className="bg-cyan-50 p-6 rounded-lg">
                        <div className="mb-4">
                            <Ban className="h-8 w-8 text-cyan-500" />
                        </div>
                        <h3 className="font-bold text-lg mb-2">No Extra Fees</h3>
                        <p className="text-gray-600 text-sm">Transparent pricing with no hidden charges.</p>
                    </div>
                    <div className="bg-amber-50 p-6 rounded-lg">
                        <div className="mb-4">
                            <Shield className="h-8 w-8 text-amber-500" />
                        </div>
                        <h3 className="font-bold text-lg mb-2">Super Secure</h3>
                        <p className="text-gray-600 text-sm">Advanced security measures to protect your transactions.</p>
                    </div>
                    <div className="bg-emerald-50 p-6 rounded-lg">
                        <div className="mb-4">
                            <Smartphone className="h-8 w-8 text-emerald-500" />
                        </div>
                        <h3 className="font-bold text-lg mb-2">Contactless Payments</h3>
                        <p className="text-gray-600 text-sm">Convenient and hygienic transactions with tap-and-go technology.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
