import { createFileRoute } from '@tanstack/react-router';
import { OverviewCharts } from '@/components/charts/overview-charts';
import { ExpenseOverview } from '@/components/dashboard/expense-overview';
import { IncomesOverview } from '@/components/dashboard/incomes-overview';
import { StatCard } from '@/components/dashboard/stats-card';
import { useFinance } from '@/hooks/useFinance';
import { CircleDollarSign, CreditCard, Wallet } from 'lucide-react';

export const Route = createFileRoute('/_auth/dashboard')({
  component: Dashboard,
});

function Dashboard() {
  const { totalExpenses, totalIncome, totalBalance } = useFinance();
  return (
    <main className="flex flex-col gap-8 px-4 py-4 md:px-4">
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard
          Icon={Wallet}
          type="balance"
          title="Total Balance"
          amount={totalBalance}
          percentage={30}
        />
        <StatCard
          Icon={CircleDollarSign}
          type="income"
          title="Total Income"
          amount={totalIncome}
          percentage={25}
        />
        <StatCard
          Icon={CreditCard}
          type="expense"
          title="Total Expense"
          amount={totalExpenses}
          percentage={30}
        />
      </div>
      <section className="flex flex-col md:flex-row gap-4">
        <OverviewCharts />
        <ExpenseOverview />
      </section>
      <IncomesOverview />
    </main>
  );
}
