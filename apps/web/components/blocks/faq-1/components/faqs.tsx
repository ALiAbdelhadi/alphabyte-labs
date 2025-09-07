"use client"

import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { cn } from "@/lib/utils"
import {
    BarChart3,
    BookOpen,
    ChevronDown,
    Code,
    CreditCard,
    DollarSign,
    HelpCircle,
    Mail,
    MessageCircle,
} from "lucide-react"
import { Link } from "@/i18n/navigation"
import type React from "react"
import { useState } from "react"

interface FAQ {
    id: string
    question: string
    answer: string
    icon: React.ReactNode
    category: string
}

interface FAQBlockProps {
    title?: string
    subtitle?: string
    linkText?: string
    linkHref?: string
    categories?: string[]
    faqs?: FAQ[]
    className?: string
}

const defaultFAQs: FAQ[] = [
    {
        id: "1",
        question: "Is there a free trial available?",
        answer:
            "Yes, you can try us for free for 30 days. If you want, we'll provide you with a free 30-minute onboarding call to get you up and running. Book a call here.",
        icon: <HelpCircle className="w-5 h-5" />,
        category: "General",
    },
    {
        id: "2",
        question: "Can I change my plan later?",
        answer:
            "Of course! Our pricing scales with your company. Chat to our friendly team to find a solution that works for you.",
        icon: <CreditCard className="w-5 h-5" />,
        category: "Pricing",
    },
    {
        id: "3",
        question: "What is your cancellation policy?",
        answer:
            "We understand that things change. You can cancel your plan at any time and we'll refund you the difference already paid.",
        icon: <BarChart3 className="w-5 h-5" />,
        category: "General",
    },
    {
        id: "4",
        question: "Can other info be added to an invoice?",
        answer:
            "Yes, you can easily add additional information to your invoices such as your VAT number, company address, and purchase order numbers.",
        icon: <Code className="w-5 h-5" />,
        category: "API",
    },
    {
        id: "5",
        question: "How does billing work?",
        answer:
            "Plans are per workspace, not per account. You can upgrade one workspace, and still have any number of free workspaces.",
        icon: <DollarSign className="w-5 h-5" />,
        category: "Pricing",
    },
    {
        id: "6",
        question: "How do I change my account email?",
        answer:
            "You can change the email address associated with your account by going to your account settings and updating your profile information.",
        icon: <Mail className="w-5 h-5" />,
        category: "General",
    },
    {
        id: "7",
        question: "How does support work?",
        answer:
            "We provide email and chat support to all users. Premium users also get access to phone support and priority assistance.",
        icon: <MessageCircle className="w-5 h-5" />,
        category: "General",
    },
    {
        id: "8",
        question: "Do you provide tutorials?",
        answer:
            "Yes! We have a comprehensive knowledge base with step-by-step tutorials, video guides, and best practices to help you get the most out of our platform.",
        icon: <BookOpen className="w-5 h-5" />,
        category: "General",
    },
]

export default function FAQ({
    title = "Frequently asked questions",
    subtitle = "These are the most commonly asked questions about Untitled UI. Can't find what you're looking for?",
    linkText = "Chat to our friendly team!",
    linkHref = "#",
    categories = ["General", "Pricing", "Dashboard", "API"],
    faqs = defaultFAQs,
    className,
}: FAQBlockProps) {
    const [activeCategory, setActiveCategory] = useState(categories[0])
    const [openItems, setOpenItems] = useState<string[]>(["1"]) // First item open by default

    const filteredFAQs = faqs.filter((faq) => faq.category === activeCategory)

    const toggleItem = (id: string) => {
        setOpenItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
    }

    return (
        <div className={cn("w-full max-w-4xl mx-auto px-4 py-16", className)}>
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 transition-colors duration-200">{title}</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto transition-colors duration-200">
                    {subtitle}{" "}
                    <Link
                        href={linkHref}
                        className="text-primary hover:text-primary/80 font-medium underline decoration-primary/30 hover:decoration-primary/60 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded-sm"
                    >
                        {linkText}
                    </Link>
                </p>
            </div>
            <div className="flex flex-wrap justify-center gap-2 mb-12">
                {categories.map((category) => (
                    <Button
                        key={category}
                        variant={activeCategory === category ? "default" : "outline"}
                        onClick={() => setActiveCategory(category)}
                        className={cn(
                            "rounded-full px-6 py-2 text-sm font-medium transition-all duration-200",
                            activeCategory === category
                                ? "bg-foreground text-background hover:bg-foreground/90 shadow-md"
                                : "bg-background text-foreground border-border hover:bg-accent hover:text-accent-foreground shadow-sm hover:shadow-md",
                        )}
                        aria-pressed={activeCategory === category}
                        role="tab"
                        aria-selected={activeCategory === category}
                    >
                        {category}
                    </Button>
                ))}
            </div>
            <div className="space-y-4" role="tabpanel" aria-labelledby={`category-${activeCategory}`}>
                {filteredFAQs.map((faq, index) => (
                    <Collapsible key={faq.id} open={openItems.includes(faq.id)} onOpenChange={() => toggleItem(faq.id)}>
                        <div className="border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 bg-card">
                            <CollapsibleTrigger
                                className="w-full p-6 text-left hover:bg-accent/50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background group"
                                aria-expanded={openItems.includes(faq.id)}
                                aria-controls={`faq-content-${faq.id}`}
                                id={`faq-trigger-${faq.id}`}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="text-muted-foreground flex-shrink-0 transition-colors duration-200 group-hover:text-foreground">
                                            {faq.icon}
                                        </div>
                                        <h3 className="text-lg font-semibold text-foreground transition-colors duration-200 text-left">
                                            {faq.question}
                                        </h3>
                                    </div>
                                    <ChevronDown
                                        className={cn(
                                            "w-5 h-5 text-muted-foreground transition-all duration-200 transform group-hover:text-foreground",
                                            {
                                                "rotate-180": openItems.includes(faq.id),
                                            },
                                        )}
                                        aria-hidden="true"
                                    />
                                </div>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <div
                                    className="px-6 pb-6 pt-0 border-t border-border/50 bg-accent/20"
                                    id={`faq-content-${faq.id}`}
                                    aria-labelledby={`faq-trigger-${faq.id}`}
                                >
                                    <div className="ml-9 pt-4 text-muted-foreground leading-relaxed transition-colors duration-200">
                                        {faq.answer}
                                    </div>
                                </div>
                            </CollapsibleContent>
                        </div>
                    </Collapsible>
                ))}
            </div>
            {filteredFAQs.length === 0 && (
                <div className="text-center py-12">
                    <div className="text-muted-foreground mb-4">
                        <HelpCircle className="w-12 h-12 mx-auto" />
                    </div>
                    <h3 className="text-lg font-medium text-foreground mb-2">No FAQs found</h3>
                    <p className="text-muted-foreground">
                        There are no frequently asked questions in the {activeCategory} category yet.
                    </p>
                </div>
            )}
        </div>
    )
}
