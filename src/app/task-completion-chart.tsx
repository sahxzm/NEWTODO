'use client';

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

const chartData = [
  { month: 'January', tasks: 12 },
  { month: 'February', tasks: 18 },
  { month: 'March', tasks: 24 },
  { month: 'April', tasks: 20 },
  { month: 'May', tasks: 28 },
  { month: 'June', tasks: 32 },
];

const chartConfig = {
  tasks: {
    label: 'Tasks Completed',
    color: 'hsl(var(--chart-1))',
  },
};

export function TaskCompletionChart() {
  return (
    <ChartContainer config={chartConfig} className="h-[300px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dot" />}
        />
        <Bar dataKey="tasks" fill="var(--color-tasks)" radius={8} />
      </BarChart>
    </ChartContainer>
  );
}
