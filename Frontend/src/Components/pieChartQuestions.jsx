"use client"

import { Label, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
} from "@/Components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/Components/ui/chart"
import UserContext  from '../utils/userContext';
import { useContext } from 'react';



const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
} 

export function PieChartQuestions() {
  const { totalStats, loading, error } = useContext(UserContext);
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const chartData = [
    { platform: "leetcode", visitors: totalStats.lcProblems, fill: "green" },
    { platform: "Codeforces", visitors: totalStats.cfProblems, fill: "blue" },
    { platform: "codechef", visitors: totalStats.ccProblems, fill: "#FF6700" },
  ]

  return (
    <Card className="flex flex-col w-full h-full">
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[200px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="platform"
              innerRadius={45}
              strokeWidth={10}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalStats.totalProblems.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          solved
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
