import { Badge } from "@/components/ui/badge"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingDownIcon, TrendingUpIcon } from "lucide-react"
import { formatPrice } from "../lib/utils"

export function OrdersCards() {
    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-gradient-to-t from-primary/5 to-card dark:from-primary/10 shadow-sm ">
                <CardHeader className="relative">
                    <CardDescription>Total Orders</CardDescription>
                    <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">2,543</CardTitle>
                    <div className="absolute right-4 top-4">
                        <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
                            <TrendingUpIcon className="size-3" />
                            +15.3%
                        </Badge>
                    </div>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1 text-sm">
                    <div className="line-clamp-1 flex gap-2 font-medium">
                        Increased from last month <TrendingUpIcon className="size-4" />
                    </div>
                    <div className="text-muted-foreground">245 more orders than previous period</div>
                </CardFooter>
            </Card>
            <Card className="bg-gradient-to-t from-primary/5 to-card dark:from-primary/10 shadow-sm ">
                <CardHeader className="relative">
                    <CardDescription>Average Order Value</CardDescription>
                    <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                        {formatPrice(89.5)}
                    </CardTitle>
                    <div className="absolute right-4 top-4">
                        <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
                            <TrendingUpIcon className="size-3" />
                            +5.2%
                        </Badge>
                    </div>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1 text-sm">
                    <div className="line-clamp-1 flex gap-2 font-medium">
                        Slight increase <TrendingUpIcon className="size-4" />
                    </div>
                    <div className="text-muted-foreground">{formatPrice(4.5)} higher than last month</div>
                </CardFooter>
            </Card>
            <Card className="bg-gradient-to-t from-primary/5 to-card dark:from-primary/10 shadow-sm">
                <CardHeader className="relative">
                    <CardDescription>Pending Orders</CardDescription>
                    <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">78</CardTitle>
                    <div className="absolute right-4 top-4">
                        <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
                            <TrendingDownIcon className="size-3" />
                            -8.3%
                        </Badge>
                    </div>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1 text-sm">
                    <div className="line-clamp-1 flex gap-2 font-medium">
                        Improved processing time <TrendingDownIcon className="size-4" />
                    </div>
                    <div className="text-muted-foreground">Faster fulfillment than previous month</div>
                </CardFooter>
            </Card>
            <Card className="bg-gradient-to-t from-primary/5 to-card dark:from-primary/10 shadow-sm">
                <CardHeader className="relative">
                    <CardDescription>Conversion Rate</CardDescription>
                    <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">3.8%</CardTitle>
                    <div className="absolute right-4 top-4">
                        <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
                            <TrendingUpIcon className="size-3" />
                            +0.5%
                        </Badge>
                    </div>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1 text-sm">
                    <div className="line-clamp-1 flex gap-2 font-medium">
                        Steady improvement <TrendingUpIcon className="size-4" />
                    </div>
                    <div className="text-muted-foreground">Cart abandonment rate decreased</div>
                </CardFooter>
            </Card>
        </div>
    )
}
