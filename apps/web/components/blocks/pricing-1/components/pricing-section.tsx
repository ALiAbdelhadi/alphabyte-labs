import { Check, HelpCircle, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"


export default function PricingSection() {
    return (
        <div className="w-full bg-background">
            <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl">
                        Choose the right plan for you
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
                        Select a plan that fits your needs. All plans include a 14-day free trial.
                    </p>
                </div>
                <div className="mt-16 grid grid-cols-1 gap-y-8 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 xl:gap-x-8">
                    <div className="relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-200 hover:shadow-md">
                        <div className="p-6 sm:p-8">
                            <h3 className="text-2xl font-semibold text-card-foreground">Free</h3>
                            <p className="mt-2 text-sm text-muted-foreground">
                                For personal use only with limited features and support
                            </p>
                            <div className="mt-6 flex items-baseline">
                                <span className="text-5xl font-bold tracking-tight text-card-foreground">$0</span>
                            </div>
                            <p className="mt-1 text-sm text-muted-foreground">Includes 1 user.</p>
                        </div>
                        <div className="flex flex-1 flex-col justify-between p-6 sm:p-8">
                            <Button variant="outline" className="w-full rounded-full">
                                Get Started
                            </Button>
                        </div>
                    </div>
                    <div className="relative flex flex-col overflow-hidden rounded-2xl border border-border bg-accent transition-all duration-200 hover:shadow-md">
                        <div className="absolute right-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                            Popular
                        </div>
                        <div className="p-6 sm:p-8">
                            <h3 className="text-2xl font-semibold text-accent-foreground">Pro</h3>
                            <p className="mt-2 text-sm text-muted-foreground">
                                For small businesses with all the features and support
                            </p>
                            <div className="mt-6 flex items-baseline">
                                <span className="text-5xl font-bold tracking-tight text-accent-foreground">$29</span>
                                <span className="ml-1 text-sm text-muted-foreground">per user, per month</span>
                            </div>
                        </div>
                        <div className="flex flex-1 flex-col justify-between p-6 sm:p-8">
                            <Button className="w-full rounded-full">Purchase</Button>
                        </div>
                    </div>
                    <div className="relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-200 hover:shadow-md">
                        <div className="p-6 sm:p-8">
                            <h3 className="text-2xl font-semibold text-card-foreground">Premium</h3>
                            <p className="mt-2 text-sm text-muted-foreground">
                                For teams and organizations with advanced features and support
                            </p>
                            <div className="mt-6 flex items-baseline">
                                <span className="text-5xl font-bold tracking-tight text-card-foreground">$59</span>
                                <span className="ml-1 text-sm text-muted-foreground">per user, per month</span>
                            </div>
                        </div>
                        <div className="flex flex-1 flex-col justify-between p-6 sm:p-8">
                            <Button variant="outline" className="w-full rounded-full">
                                Purchase
                            </Button>
                        </div>
                    </div>
                    <div className="relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-200 hover:shadow-md">
                        <div className="p-6 sm:p-8">
                            <h3 className="text-2xl font-semibold text-card-foreground">Enterprise</h3>
                            <p className="mt-2 text-sm text-muted-foreground">
                                For large companies with custom features and support and a dedicated account manager
                            </p>
                            <div className="mt-6 flex items-baseline">
                                <span className="text-2xl font-bold tracking-tight text-card-foreground">Custom pricing</span>
                            </div>
                        </div>
                        <div className="flex flex-1 flex-col justify-between p-6 sm:p-8">
                            <Button variant="outline" className="w-full rounded-full">
                                Contact sales
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="mt-16 overflow-hidden rounded-2xl border border-border">
                    <div className="grid grid-cols-1 divide-y divide-border lg:grid-cols-4 lg:divide-x lg:divide-y-0">
                        <div className="p-6 sm:p-8 bg-card">
                            <h3 className="text-lg font-semibold text-card-foreground">Features</h3>
                            <ul className="mt-6 space-y-4">
                                <FeatureItem feature="Live Collaboration" />
                                <FeatureItem feature="1 GB Storage" />
                                <FeatureItem feature="2 Projects" />
                                <FeatureItem feature="Basic Support" />
                                <FeatureItem feature="Limited Customization" tooltip="Basic theme options only" />
                                <FeatureItem feature="Limited Integration" tooltip="Connect with up to 2 services" />
                                <FeatureItem feature="Limited API Access" tooltip="100 requests per day" />
                            </ul>
                        </div>
                        <div className="bg-accent p-6 sm:p-8">
                            <h3 className="text-lg font-semibold text-accent-foreground">Everything in Free, and:</h3>
                            <ul className="mt-6 space-y-4">
                                <FeatureItem feature="2 Team Members" />
                                <FeatureItem feature="10 GB Storage" />
                                <FeatureItem feature="10 Projects" />
                                <FeatureItem feature="Priority Support" tooltip="Response within 24 hours" />
                                <FeatureItem feature="Full Customization" tooltip="Complete theme control" />
                                <FeatureItem feature="Full Integration" tooltip="Connect with up to 10 services" />
                                <FeatureItem feature="Full API Access" tooltip="10,000 requests per day" />
                            </ul>
                        </div>
                        <div className="p-6 sm:p-8 bg-card">
                            <h3 className="text-lg font-semibold text-card-foreground">Everything in Pro, and:</h3>
                            <ul className="mt-6 space-y-4">
                                <FeatureItem feature="5 Team Members" />
                                <FeatureItem feature="50 GB Storage" />
                                <FeatureItem feature="50 Projects" />
                                <FeatureItem feature="Dedicated Support" tooltip="Response within 8 hours" />
                                <FeatureItem feature="Advanced Customization" tooltip="White-labeling options" />
                                <FeatureItem feature="Analytics" tooltip="Advanced usage metrics and insights" />
                                <FeatureItem feature="Reports" tooltip="Custom reporting tools" />
                            </ul>
                        </div>
                        <div className="p-6 sm:p-8 bg-card">
                            <h3 className="text-lg font-semibold text-card-foreground">Everything in Premium, and:</h3>
                            <ul className="mt-6 space-y-4">
                                <FeatureItem feature="10+ Team Members" />
                                <FeatureItem feature="100+ GB Storage" />
                                <FeatureItem feature="100+ Projects" />
                                <FeatureItem feature="Dedicated Account Manager" />
                                <FeatureItem feature="Custom Features" tooltip="Bespoke development for your needs" />
                                <FeatureItem feature="Custom Support" tooltip="24/7 priority support" />
                                <FeatureItem feature="Custom Integration" tooltip="Enterprise API and custom integrations" />
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="mt-16">
                    <h3 className="text-2xl font-semibold text-foreground">Frequently asked questions</h3>
                    <div className="mt-6">
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="item-1">
                                <AccordionTrigger className="text-left">How does the 14-day trial work?</AccordionTrigger>
                                <AccordionContent>
                                    You can try any plan for 14 days with full access to all features. No credit card required. At the
                                    end of your trial, you can choose to subscribe or downgrade to the free plan.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2">
                                <AccordionTrigger className="text-left">Can I change plans later?</AccordionTrigger>
                                <AccordionContent>
                                    Yes, you can upgrade, downgrade, or cancel your plan at any time. Changes to your subscription will
                                    take effect immediately.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-3">
                                <AccordionTrigger className="text-left">What payment methods do you accept?</AccordionTrigger>
                                <AccordionContent>
                                    We accept all major credit cards, PayPal, and Apple Pay. For Enterprise plans, we also offer
                                    invoicing.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-4">
                                <AccordionTrigger className="text-left">Is there a discount for annual billing?</AccordionTrigger>
                                <AccordionContent>
                                    Yes, you can save 20% by choosing annual billing on any paid plan. The discount will be applied
                                    automatically at checkout.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>
                <div className="mt-16 rounded-2xl bg-accent p-8 text-center">
                    <h3 className="text-2xl font-semibold text-accent-foreground">Still have questions?</h3>
                    <p className="mt-2 text-muted-foreground">
                        Our team is here to help you find the perfect plan for your needs.
                    </p>
                    <div className="mt-6">
                        <Button className="rounded-full">
                            Contact us
                            <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

function FeatureItem({ feature, tooltip }: { feature: string; tooltip?: string }) {
    return (
        <li className="flex items-center">
            <Check className="h-5 w-5 text-primary" />
            <span className="ml-2 text-sm text-foreground">{feature}</span>
            {tooltip && (
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <button className="ml-1">
                                <HelpCircle className="h-4 w-4 text-muted-foreground" />
                            </button>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                            <p>{tooltip}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            )}
        </li>
    )
}
