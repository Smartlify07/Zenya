import { createFileRoute } from '@tanstack/react-router';
import { useFinance } from '@/hooks/useFinance';
import { ExpenseCard } from '@/components/cards/expense-card';
import CardSkeleton from '@/components/skeletons/card-skeleton';
import { EmptyStateCard } from '@/components/empty-states/empty-finance-state';

export const Route = createFileRoute('/_auth/expenses')({
  component: ExpensesPage,
});

function ExpensesPage() {
  const { expenses, loading } = useFinance();
  return (
    <main className="font-inter flex flex-col gap-4 px-8">
      <header className="flex flex-col gap-1">
        <h1 className="text-neutral-800 text-xl font-semibold">Expenses</h1>
        <p className="text-sm text-neutral-500">Track your expenses here.</p>
      </header>
      <div className="flex flex-col gap-4">
        {!loading
          ? expenses?.map((expense) => (
              <ExpenseCard key={expense.id} expense={expense} />
            ))
          : Array.from({ length: 3 }).map((_, i) => <CardSkeleton key={i} />)}
      </div>

      {expenses?.length === 0 && (
        <EmptyStateCard
          className="w-full self-center"
          action="expense"
          buttonText="Add expense"
          title="No Expenses Found"
          description="You haven't recorded any expenses yet. Start by adding your first expense."
        />
      )}
    </main>
  );
}
