"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface RevenueData {
  month: string
  revenue: number
}

const data: RevenueData[] = [
  { month: "Jan", revenue: 200 },
  { month: "Feb", revenue: 500 },
  { month: "Mar", revenue: 1200 },
  { month: "Apr", revenue: 800 },
  { month: "May", revenue: 1000 },
  { month: "Jun", revenue: 2500 },
  { month: "Jul", revenue: 1500 },
  { month: "Aug", revenue: 1000 },
  { month: "Sep", revenue: 2000 },
  { month: "Oct", revenue: 1800 },
  { month: "Nov", revenue: 1000 },
  { month: "Dec", revenue: 3000 },
]

export function RevenueChart() {
  return (
    <Card className="col-span-4 p-4">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-2xl font-semibold text-[#141D2A]">Total Revenue</CardTitle>
        <Select defaultValue="yearly">
          <SelectTrigger className="w-[120px] h-8">
            <SelectValue placeholder="Select view" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Daily</SelectItem>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="yearly">Yearly</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="pl-2">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="month"
                className="text-sm text-muted-foreground"
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                className="text-sm text-muted-foreground"
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg   bg-background p-2 shadow-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Revenue
                            </span>
                            <span className="font-bold text-muted-foreground">
                              ${payload[0].value}
                            </span>
                          </div>
                        </div>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#2EB0E4"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}