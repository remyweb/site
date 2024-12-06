"use client";

import { Pie, PieChart, Cell, Label } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

interface DonutProps {
  data: { name: string; value: number; fill: string }[];
  title: string;
  description: string;
}

export function Donut({ data, title, description }: DonutProps) { 
  const totalValue = data.reduce((sum, item) => sum + item.value, 0);

  const chartConfig = data.reduce((config, item) => {
    config[item.name] = {
      label: item.name,
      color: item.fill,
    };
    return config;
  }, {} as ChartConfig);

  return (
    <Card className="flex flex-col rounded-lg">
      <CardHeader className="items-center pb-0">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
          
        >
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              labelLine={false}
              label={({ cx, cy, midAngle, innerRadius, outerRadius, value, name }) => {
                const percent = ((value / totalValue) * 100).toFixed(1); 
                const radius = innerRadius + (outerRadius - innerRadius) / 2;
                const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
                const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
                
                return (
                  <text
                    x={x}
                    y={y}
 
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#fff"
                    fontSize={12}
                  >
                    {`${percent}%`}
                  </text>
                );
              }}
            > 
            </Pie>
            <ChartLegend
              content={<ChartLegendContent nameKey="name" />}
              className="-translate-y-2 flex-wrap gap-2  "
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
