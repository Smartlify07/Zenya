import { ExpenseCard } from '@/components/cards/expense-card';
import { useFinance } from '@/hooks/useFinance';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard/expenses')({
  component: ExpensesPage,
});

function ExpensesPage() {
  const { expenses } = useFinance();
  return (
    <main className="font-inter flex flex-col gap-4 py-4 px-8">
      <header className="flex flex-col gap-1">
        <h1 className="text-neutral-800 text-xl font-semibold">Expenses</h1>
        <p className="text-sm text-neutral-500">Track your expenses here.</p>
      </header>
      <div className="flex flex-col gap-4">
        {expenses?.map((expense) => (
          <ExpenseCard key={expense.id} expense={expense} />
        ))}
      </div>
    </main>
  );
}
