import { useState } from "react"
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export default function MonthlyStatsSection() {
    const [selectedYear, setSelectedYear] = useState("2023")

    const buyingData = {
        "2023": [
            { month: "Jan", visitors: 1200, transactions: 45 },
            { month: "Feb", visitors: 1350, transactions: 52 },
            { month: "Mar", visitors: 1450, transactions: 63 },
            { month: "Apr", visitors: 1600, transactions: 70 },
            { month: "May", visitors: 1750, transactions: 82 },
            { month: "Jun", visitors: 1900, transactions: 95 },
            { month: "Jul", visitors: 2000, transactions: 105 },
            { month: "Aug", visitors: 1950, transactions: 98 },
            { month: "Sep", visitors: 1850, transactions: 88 },
            { month: "Oct", visitors: 1700, transactions: 75 },
            { month: "Nov", visitors: 1550, transactions: 65 },
            { month: "Dec", visitors: 1400, transactions: 58 },
        ],
        "2024": [
            { month: "Jan", visitors: 1500, transactions: 60 },
            { month: "Feb", visitors: 1650, transactions: 68 },
            { month: "Mar", visitors: 1800, transactions: 78 },
            { month: "Apr", visitors: 1950, transactions: 85 },
            { month: "May", visitors: 2100, transactions: 92 },
            { month: "Jun", visitors: 2250, transactions: 110 },
        ],
    }

    const rentingData = {
        "2023": [
            { month: "Jan", visitors: 2200, transactions: 120 },
            { month: "Feb", visitors: 2350, transactions: 135 },
            { month: "Mar", visitors: 2500, transactions: 145 },
            { month: "Apr", visitors: 2650, transactions: 160 },
            { month: "May", visitors: 2800, transactions: 175 },
            { month: "Jun", visitors: 3000, transactions: 190 },
            { month: "Jul", visitors: 3200, transactions: 205 },
            { month: "Aug", visitors: 3100, transactions: 195 },
            { month: "Sep", visitors: 2950, transactions: 180 },
            { month: "Oct", visitors: 2800, transactions: 170 },
            { month: "Nov", visitors: 2650, transactions: 155 },
            { month: "Dec", visitors: 2500, transactions: 140 },
        ],
        "2024": [
            { month: "Jan", visitors: 2700, transactions: 150 },
            { month: "Feb", visitors: 2850, transactions: 165 },
            { month: "Mar", visitors: 3000, transactions: 180 },
            { month: "Apr", visitors: 3150, transactions: 195 },
            { month: "May", visitors: 3300, transactions: 210 },
            { month: "Jun", visitors: 3450, transactions: 225 },
        ],
    }

    return (
        <section className="w-full py-12">
            <div className="container mx-auto px-4">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold tracking-tight">Monthly Property Statistics</h2>
                    <p className="text-muted-foreground mt-2">
                        Track visitor engagement and transaction rates for buying and renting properties
                    </p>
                </div>

                <div className="grid gap-6">
                    <div className="flex justify-end">
                        <Tabs defaultValue="2023" onValueChange={setSelectedYear}>
                            <TabsList>
                                <TabsTrigger value="2023">2023</TabsTrigger>
                                <TabsTrigger value="2024">2024</TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Property Buying Statistics</CardTitle>
                                <CardDescription>Monthly visitor and transaction data for property purchases</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ChartContainer
                                    config={{
                                        visitors: {
                                            label: "Visitors",
                                            color: "hsl(var(--chart-1))",
                                        },
                                        transactions: {
                                            label: "Transactions",
                                            color: "hsl(var(--chart-2))",
                                        },
                                    }}
                                    className="aspect-[4/3] min-h-[300px]"
                                >
                                    <LineChart data={buyingData[selectedYear]} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                        <XAxis dataKey="month" />
                                        <YAxis yAxisId="left" orientation="left" />
                                        <YAxis yAxisId="right" orientation="right" />
                                        <ChartTooltip content={<ChartTooltipContent />} />
                                        <Line
                                            yAxisId="left"
                                            type="monotone"
                                            dataKey="visitors"
                                            stroke="var(--color-visitors)"
                                            strokeWidth={2}
                                            activeDot={{ r: 6 }}
                                        />
                                        <Line
                                            yAxisId="right"
                                            type="monotone"
                                            dataKey="transactions"
                                            stroke="var(--color-transactions)"
                                            strokeWidth={2}
                                            activeDot={{ r: 6 }}
                                        />
                                    </LineChart>
                                </ChartContainer>
                                <div className="mt-4 grid grid-cols-2 gap-4">
                                    <div className="rounded-lg bg-muted p-3">
                                        <div className="text-sm font-medium">Total Visitors</div>
                                        <div className="text-2xl font-bold">
                                            {buyingData[selectedYear].reduce((sum, item) => sum + item.visitors, 0).toLocaleString()}
                                        </div>
                                    </div>
                                    <div className="rounded-lg bg-muted p-3">
                                        <div className="text-sm font-medium">Total Transactions</div>
                                        <div className="text-2xl font-bold">
                                            {buyingData[selectedYear].reduce((sum, item) => sum + item.transactions, 0).toLocaleString()}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Property Renting Statistics</CardTitle>
                                <CardDescription>Monthly visitor and transaction data for property rentals</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ChartContainer
                                    config={{
                                        visitors: {
                                            label: "Visitors",
                                            color: "hsl(var(--chart-3))",
                                        },
                                        transactions: {
                                            label: "Transactions",
                                            color: "hsl(var(--chart-4))",
                                        },
                                    }}
                                    className="aspect-[4/3] min-h-[300px]"
                                >
                                    <LineChart data={rentingData[selectedYear]} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                        <XAxis dataKey="month" />
                                        <YAxis yAxisId="left" orientation="left" />
                                        <YAxis yAxisId="right" orientation="right" />
                                        <ChartTooltip content={<ChartTooltipContent />} />
                                        <Line
                                            yAxisId="left"
                                            type="monotone"
                                            dataKey="visitors"
                                            stroke="var(--color-visitors)"
                                            strokeWidth={2}
                                            activeDot={{ r: 6 }}
                                        />
                                        <Line
                                            yAxisId="right"
                                            type="monotone"
                                            dataKey="transactions"
                                            stroke="var(--color-transactions)"
                                            strokeWidth={2}
                                            activeDot={{ r: 6 }}
                                        />
                                    </LineChart>
                                </ChartContainer>
                                <div className="mt-4 grid grid-cols-2 gap-4">
                                    <div className="rounded-lg bg-muted p-3">
                                        <div className="text-sm font-medium">Total Visitors</div>
                                        <div className="text-2xl font-bold">
                                            {rentingData[selectedYear].reduce((sum, item) => sum + item.visitors, 0).toLocaleString()}
                                        </div>
                                    </div>
                                    <div className="rounded-lg bg-muted p-3">
                                        <div className="text-sm font-medium">Total Transactions</div>
                                        <div className="text-2xl font-bold">
                                            {rentingData[selectedYear].reduce((sum, item) => sum + item.transactions, 0).toLocaleString()}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    )
}
