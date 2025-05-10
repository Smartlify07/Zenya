'use client';

import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { chartConfig } from '@/lib/chartConfig';
import { useFinance } from '@/hooks/useFinance';
import { format } from 'date-fns';

export function OverviewCharts() {
  const { incomes, expenses } = useFinance();
  const merged: {
    [key: number]: { month: string; income: number; expense: number };
  } = {};

  incomes?.forEach((income) => {
    const key = new Date(income.date).getMonth();
    const month = format(new Date(income.date), 'MMM');
    if (!merged[key]) {
      merged[key] = { month, income: 0, expense: 0 };
    }
    merged[key].income += income.amount;
  });

  expenses?.forEach((expense) => {
    const key = new Date(expense.date).getMonth();
    const month = format(new Date(expense.date), 'MMM');
    if (!merged[key]) {
      merged[key] = { month, income: 0, expense: 0 };
    }
    merged[key].expense += expense.amount;
  });

  return (
    <Card className="shadow-none md:w-6/12">
      <CardHeader>
        <CardTitle>Expense - Income chart</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          className="aspect-auto w-full h-[300px]"
          config={chartConfig}
        >
          <BarChart accessibilityLayer data={Object.values(merged)}>
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
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar dataKey="income" fill={chartConfig.income.color} radius={4} />
            <Bar
              dataKey="expense"
              fill={chartConfig.expense.color}
              radius={4}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
