import { StatCard } from '@/components/dashboard/stats-card';
import { useFinance } from '@/hooks/useFinance';
import { createFileRoute } from '@tanstack/react-router';
import { CircleDollarSign, CreditCard, Wallet } from 'lucide-react';

export const Route = createFileRoute('/')({
  component: Dashboard,
});

function Dashboard() {
  const { totalExpenses, totalIncome, totalBalance } = useFinance();
  return (
    <main className="grid gap-4 px-4 py-4">
      <div className="grid gap-4 grid-cols-3">
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
    </main>
  );
}
