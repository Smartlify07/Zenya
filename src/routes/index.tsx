import { StatCard } from '@/components/dashboard/stats-card';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: App,
});

function App() {
  return (
    <main className="grid gap-4 px-4 py-4">
      <div className="grid gap-4 grid-cols-3">
        <StatCard
          type="balance"
          title="Total Balance"
          amount={60000}
          percentage={30}
        />
        <StatCard
          type="income"
          title="Total Income"
          amount={70000}
          percentage={25}
        />
        <StatCard
          type="expense"
          title="Total Expense"
          amount={10000}
          percentage={30}
        />
      </div>
    </main>
  );
}
