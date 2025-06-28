"use client"

import { cn } from "@/lib/utils"
import { AlertTriangle, CheckCircle, ChevronDown, ChevronUp, Info, XCircle } from "lucide-react"
import { useState } from "react"

interface Service {
    id: string
    name: string
    status: "operational" | "incident" | "outage" | "unknown"
    description: string
    details: string
    hasDetails?: boolean
}

interface StatusSectionProps {
    title?: string
    services?: Service[]
    showIncidentHistory?: boolean
    onIncidentClick?: () => void
    className?: string
}

const StatusSection = ({
    title = "Status",
    services = [],
    showIncidentHistory = true,
    onIncidentClick = () => { },
    className = "",
}: StatusSectionProps) => {
    const [expandedServices, setExpandedServices] = useState<Set<string>>(new Set())

    const toggleService = (serviceId: string) => {
        const newExpanded = new Set(expandedServices)
        if (newExpanded.has(serviceId)) {
            newExpanded.delete(serviceId)
        } else {
            newExpanded.add(serviceId)
        }
        setExpandedServices(newExpanded)
    }

    const getStatusIcon = (status: Service["status"]) => {
        switch (status) {
            case "operational":
                return <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
            case "incident":
                return <AlertTriangle className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
            case "outage":
                return <XCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
            default:
                return <Info className="w-4 h-4 text-muted-foreground" />
        }
    }

    const getStatusColor = (status: Service["status"]) => {
        switch (status) {
            case "operational":
                return "bg-green-500 dark:bg-green-400"
            case "incident":
                return "bg-yellow-500 dark:bg-yellow-400"
            case "outage":
                return "bg-red-500 dark:bg-red-400"
            default:
                return "bg-muted-foreground"
        }
    }

    const getStatusText = (status: Service["status"]) => {
        switch (status) {
            case "operational":
                return "No issues"
            case "incident":
                return "Incident"
            case "outage":
                return "Outage"
            default:
                return "Unknown"
        }
    }

    const defaultServices: Service[] = [
        {
            id: "login-sso",
            name: "Login / SSO",
            status: "operational",
            description: "Single Sign-On authentication services",
            details: "All authentication endpoints are responding normally",
        },
        {
            id: "connectivity",
            name: "Connectivity",
            status: "incident",
            description: "Network connectivity and routing",
            details: "Something is not quite right. View details",
            hasDetails: true,
        },
        {
            id: "listener",
            name: "Listener",
            status: "operational",
            description: "Event listening and processing services",
            details: "All listeners are processing events successfully",
        },
        {
            id: "parser",
            name: "Parser",
            status: "operational",
            description: "Data parsing and transformation services",
            details: "All parsers are functioning optimally",
        },
        {
            id: "alerts",
            name: "Alerts",
            status: "operational",
            description: "Notification and alerting system",
            details: "Alert delivery systems are fully operational",
        },
        {
            id: "web-application",
            name: "Web Application",
            status: "operational",
            description: "Main web application platform",
            details: "Web application is running smoothly",
        },
    ]

    const activeServices = services.length > 0 ? services : defaultServices

    return (
        <div className={cn("bg-card rounded-lg shadow-sm border border-border transition-colors duration-200", className)}>
            <div className="px-6 py-4 border-b border-border">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                            <div className="w-4 h-4 bg-primary rounded-sm" />
                        </div>
                        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
                    </div>
                    {showIncidentHistory && (
                        <button
                            onClick={onIncidentClick}
                            className="text-sm text-primary hover:text-primary/80 font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded-sm px-1"
                        >
                            Incident history →
                        </button>
                    )}
                </div>
            </div>

            {/* Incident Banner */}
            <div className="px-6 py-4 bg-yellow-50 dark:bg-yellow-950/20 border-b border-yellow-200 dark:border-yellow-800/30">
                <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
                    <div>
                        <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                            Users may be experiencing issues connecting to Alpha
                        </p>
                        <p className="text-xs text-yellow-700 dark:text-yellow-300 mt-1">
                            Today · 9:21 AM EDT ·
                            <button className="ml-1 underline hover:no-underline focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-1 rounded-sm transition-colors duration-200">
                                See incident details
                            </button>
                        </p>
                    </div>
                </div>
            </div>

            {/* Status Legend */}
            <div className="px-6 py-3 bg-accent/30 border-b border-border">
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">Current Status by service</span>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-green-500 dark:bg-green-400 rounded-full"></div>
                            <span className="text-xs text-muted-foreground">No issues</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-yellow-500 dark:bg-yellow-400 rounded-full"></div>
                            <span className="text-xs text-muted-foreground">Incident</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-red-500 dark:bg-red-400 rounded-full"></div>
                            <span className="text-xs text-muted-foreground">Outage</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Services List */}
            <div className="divide-y divide-border">
                {activeServices.map((service) => (
                    <div key={service.id} className="px-6 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3 flex-1">
                                <div className={`w-2 h-2 rounded-full ${getStatusColor(service.status)}`}></div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-sm font-medium text-foreground">{service.name}</h3>
                                        {service.hasDetails && (
                                            <button
                                                onClick={() => toggleService(service.id)}
                                                className="text-muted-foreground hover:text-foreground transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded-sm p-0.5"
                                                aria-expanded={expandedServices.has(service.id)}
                                                aria-controls={`service-details-${service.id}`}
                                                aria-label={`${expandedServices.has(service.id) ? "Collapse" : "Expand"} ${service.name} details`}
                                            >
                                                {expandedServices.has(service.id) ? (
                                                    <ChevronUp className="w-4 h-4" />
                                                ) : (
                                                    <ChevronDown className="w-4 h-4" />
                                                )}
                                            </button>
                                        )}
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-0.5">{getStatusText(service.status)}</p>
                                </div>
                            </div>
                            {getStatusIcon(service.status)}
                        </div>
                        {expandedServices.has(service.id) && service.hasDetails && (
                            <div className="mt-3 pl-5 border-l-2 border-border" id={`service-details-${service.id}`}>
                                <div className="bg-accent/50 rounded-lg p-3 border border-border/50">
                                    <p className="text-sm text-foreground">{service.details}</p>
                                    {service.status === "incident" && (
                                        <div className="mt-2 pt-2 border-t border-border/50">
                                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                <span>Last updated: 2 minutes ago</span>
                                                <span>•</span>
                                                <button className="text-primary hover:text-primary/80 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 rounded-sm">
                                                    Subscribe to updates
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Footer */}
            <div className="px-6 py-3 bg-accent/20 border-t border-border rounded-b-lg">
                <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">Last updated: {new Date().toLocaleString()}</p>
                    <div className="flex items-center gap-2">
                        <button className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 rounded-sm px-1">
                            Subscribe to updates
                        </button>
                        <span className="text-xs text-muted-foreground/50">•</span>
                        <button className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 rounded-sm px-1">
                            Status API
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StatusSection
