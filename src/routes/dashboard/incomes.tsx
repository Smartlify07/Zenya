import { IncomeCard } from '@/components/cards/income-card';
import { useFinance } from '@/hooks/useFinance';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard/incomes')({
  component: ExpensesPage,
});

function ExpensesPage() {
  const { incomes } = useFinance();
  return (
    <main className="font-inter flex flex-col gap-4 py-4 px-8">
      <header className="flex flex-col gap-1">
        <h1 className="text-neutral-800 text-xl font-semibold">Incomes</h1>
        <p className="text-sm text-neutral-500">Track your incomes here.</p>
      </header>
      <div className="flex flex-col gap-4">
        {incomes?.map((income) => (
          <IncomeCard key={income.id} income={income} />
        ))}
      </div>
    </main>
  );
}
